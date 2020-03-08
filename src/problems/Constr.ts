const { ObjDirectionJs } = window.mop;

export default {
  domain: ["0.1=1.0", "0.0=5.0"],
  hardCstrs: [
    "return solution[1] + 9.0 * solution[0] < 6.0 | 0;",
    "return -solution[1] + 9.0 * solution[0] < 1.0 | 0;"
  ],
  name: "Constr",
  objs: [
    { direction: ObjDirectionJs.Min, fn: "return solution[0];" },
    {
      direction: ObjDirectionJs.Min,
      fn: "return (1.0 + solution[1]) / solution[0];"
    }
  ],
  source:
    "Deb, Kalyanmoy (2002) Multiobjective optimization using evolutionary algorithms"
};
