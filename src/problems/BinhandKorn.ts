const { ObjDirection } = window.mop;

export default {
  domain: ["0=5", "0=3"],
  hardCstrs: [
    `let x = solution[0];
let y = solution[1];
return (Math.pow(x, 2) - 10 * x + 25) + Math.pow(y, 2) > 25 | 0;`,
    `let x = solution[0];
let y = solution[1];
return (Math.pow(x, 2) - 16 * x + 64) + (Math.pow(y, 2) + 6 * y + 9) < 7.7 | 0;`
  ],
  name: "Binh and Korn",
  objs: [
    {
      direction: ObjDirection.Min,
      fn: "return 4 * Math.pow(solution[0], 2) + 4 * Math.pow(solution[1], 2);"
    },
    {
      direction: ObjDirection.Min,
      fn: `let x = solution[0];
let y = solution[1];
return (Math.pow(x, 2) - 10 * x + 25) + (Math.pow(y, 2) - 10 * y + 25);`
    }
  ],
  source:
    "Binh  and  U.  Korn; MOBES:  A  multiobjective  evolution  strategy for constrained optimization problems"
};
