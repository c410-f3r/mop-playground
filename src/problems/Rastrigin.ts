const { ObjDirection } = window.mop;

export default {
  domain: ["-5.12=5.12", "-5.12=5.12"],
  hardCstrs: [],
  name: "Rastrigin",
  objs: [
    {
      direction: ObjDirection.Min,
      fn: `let sum = [...Array(2).keys()].reduce((acc, idx) => {
  let cos_of = 2.0 * Math.PI * solution[idx];
  let rslt = Math.pow(solution[idx], 2) - 10.0 * Math.cos(cos_of);
  return acc + rslt;
}, 0);
return 10.0 * 2.0 + sum;`
    }
  ],
  source: "Rastrigin, L. A.; Systems of extremal control."
};
