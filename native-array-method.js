const dc = [
  { name: "Batman", power: 100 },
  { name: "Superman", power: 90 },
  { name: "GreenArrow", power: 70 },
  { name: "GreenLantern", power: 70 }
];

it("should cause a side effect for every item", () => {
  const callback = jest.fn();
  dc.forEach(callback);
  expect(callback).toHaveBeenCalledTimes(dc.length);
});

it("shoule return a list of hero names", () => {
  const expected = ["Batman", "Superman", "GreenArrow", "GreenLantern"];
  const heroNames = dc.map(x => x.name);
  expect(heroNames).toEqual(expected);
});
it("shoule return all heros with power 70", () => {
  const expected = dc.slice(2);
  const heroesWithPower70 = dc.filter(x => x.power === 70);
  expect(heroesWithPower70).toEqual(expected);
});
it("shoule return the name of the single hero with power 90", () => {
  const singleHeroWithPower90 = dc.find(x => x.power === 90);
  expect(singleHeroWithPower90.name).toEqual("Superman");
});
it("[1,2,3,4,5] should contain 3, but not 7", () => {
  const array = [1, 2, 3, 4, 5];
  const contains3 = array.includes(3);
  const contains7 = array.includes(7);
  expect(contains3).toBe(true);
  expect(contains7).toBe(false);
});
it("shoule return the most powerful hero", () => {
  const mostPowerful = dc.reduce((a, b) => (a.power > b.power ? a : b));

  expect(mostPowerful.name).toBe("Batman");
});
it("shoule contain GreenArrow in the list of DC heroes", () => {
  const includesGreenArrow = dc.map(x => x.name).includes("GreenArrow");
  expect(includesGreenArrow).toBe(true);
});
