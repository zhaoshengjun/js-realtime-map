const copyProperties = (fromObj: Object, toObj:Object) => {
  for (let key in fromObj) {
    toObj[key] = fromObj[key]
  }

  return toObj;
}

interface PluginObject {
  apply: Function;
  call?: Function;
}

interface PluginGroup {
  [key: string]:[PluginObject]
}
class Tapable {

  _plugins:PluginGroup = {};

  plugin(pluginGroupKey: string | Array<string>, plugin:PluginObject) {
    if (pluginGroupKey instanceof Array) {    
      pluginGroupKey.forEach( (pluginStr) => {
        this.plugin(pluginStr, plugin);
      });
      return;
    }
    if (!this._plugins[pluginGroupKey]) {
      this._plugins[pluginGroupKey] = [plugin];
    } else {
      this._plugins[pluginGroupKey].push(plugin)
    };
  }
//monkey patching standard apply function
  apply(...args) {
    args.forEach(arg => 
      arg.apply(this)
    );
  }

  applyPlugins(pluginGroupKey:string, ...args) {
    if (!this._plugins[pluginGroupKey]) return;    
    let plugins = this._plugins[pluginGroupKey];
    for (let plugin of plugins) {
      plugin.apply(this, args);
    }
  } 

  applyPluginsWaterfall(pluginGroupKey:string, init:any, ...args):any {
    if (!this._plugins[pluginGroupKey]) return init;    
    var plugins = this._plugins[pluginGroupKey];
    var current = init;
    for (var i = 0; i < plugins.length; i++)
      current = plugins[i].apply(this, [current].concat(args));
    return current;
  }

  applyPluginsParallelBailResult(pluginGroupKey:string,...args) {    
    let callbackFn = args[args.length - 1];
    if (!this._plugins[pluginGroupKey] || this._plugins[pluginGroupKey].length === 0) return callbackFn();
    let plugins = this._plugins[pluginGroupKey];
    let currentPos = plugins.length;
    let currentResult;
    let done = [];
    for (let i = 0; i < plugins.length; i++) {
      let argFn = (i) => {
        let fn = (...arg) => {
          if (i >= currentPos) return; // ignore
          done.push(i);
          if (arg.length > 0) {
            currentPos = i + 1;
            done = done.filter((item) => item <= i ); 
            currentResult = arg;
          }
          if (done.length === currentPos) {                        
            callbackFn.apply(null, currentResult);
            currentPos = 0;
          }
        }
        return copyProperties(callbackFn, fn);
      };
      args[args.length - 1] = argFn(i) ;
      plugins[i].apply(this, args);
    }
  }
}

export = Tapable;
