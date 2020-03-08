const { ObjDirectionJs } = window.mop;

export default {
  domain: ["-5=10"],
  hardCstrs: [],
  name: "Schaffer - Function #2",
  objs: [
    {
      direction: ObjDirectionJs.Min,
      fn: `let x = solution[0];
if (x <= 1) {
  return -x;
}
else if (x > 1 && x <= 3) {
  return x - 2;
}
else if (x > 3 && x <= 4) {
  return 4 - x;
}
else {
  return x - 4;
}`
    },
    {
      direction: ObjDirectionJs.Min,
      fn: "return Math.pow(solution[0], 2) - 10 * solution[0] + 25;"
    }
  ],
  source:
    "Schaffer, J. David (1984). Some experiments in machine learning using vector evaluated genetic algorithms (artificial intelligence, optimization, adaptation, pattern recognition)"
};
