/* eslint-disable */
export enum ObjDirection {
  Max,
  Min,
}
export class HardCstr {
  free(): void;
/**
* @param {Function} f 
*/
  constructor(f: Function);
}
export class Obj {
  free(): void;
/**
* @param {number} od 
* @param {Function} f 
*/
  constructor(od: number, f: Function);
}
export class OptFacade {
  free(): void;
/**
* @param {OptProblem} problem 
* @returns {OptFacade} 
*/
  solve(problem: OptProblem): OptFacade;
}
export class OptFacadeBuilder {
  free(): void;
/**
*/
  constructor();
/**
* @param {OptProblem} problem 
* @returns {OptFacade} 
*/
  build(problem: OptProblem): OptFacade;
/**
* @param {number} max_iterations 
* @returns {OptFacadeBuilder} 
*/
  max_iterations(max_iterations: number): OptFacadeBuilder;
/**
* @param {Float64Array} objs_goals 
* @returns {OptFacadeBuilder} 
*/
  objs_goals(objs_goals: Float64Array): OptFacadeBuilder;
/**
* @param {Pct} stagnation_percentage 
* @returns {OptFacadeBuilder} 
*/
  stagnation_percentage(stagnation_percentage: Pct): OptFacadeBuilder;
/**
* @param {number} stagnation_threshold 
* @returns {OptFacadeBuilder} 
*/
  stagnation_threshold(stagnation_threshold: number): OptFacadeBuilder;
}
export class OptProblem {
  free(): void;
/**
* @param {OptProblemDefinitions} definitions 
* @param {number} results_num 
* @returns {OptProblem} 
*/
  static with_capacity(definitions: OptProblemDefinitions, results_num: number): OptProblem;
/**
* @returns {OptProblemDefinitions} 
*/
  definitions(): OptProblemDefinitions;
/**
* @returns {OptProblemResults} 
*/
  results(): OptProblemResults;
}
export class OptProblemDefinitions {
  free(): void;
}
export class OptProblemDefinitionsBuilder {
  free(): void;
/**
*/
  constructor();
/**
* @returns {OptProblemDefinitions} 
*/
  build(): OptProblemDefinitions;
/**
* @param {SolutionDomain} solution_domain 
* @returns {OptProblemDefinitionsBuilder} 
*/
  domain(solution_domain: SolutionDomain): OptProblemDefinitionsBuilder;
/**
* @param {string} name 
* @returns {OptProblemDefinitionsBuilder} 
*/
  name(name: string): OptProblemDefinitionsBuilder;
/**
* @param {HardCstr} hard_cstr 
* @returns {OptProblemDefinitionsBuilder} 
*/
  push_hard_cstr(hard_cstr: HardCstr): OptProblemDefinitionsBuilder;
/**
* @param {Obj} obj 
* @returns {OptProblemDefinitionsBuilder} 
*/
  push_obj(obj: Obj): OptProblemDefinitionsBuilder;
}
export class OptProblemResult {
  free(): void;
/**
* @returns {Uint32Array} 
*/
  hard_cstrs(): Uint32Array;
/**
* @returns {Float64Array} 
*/
  objs(): Float64Array;
/**
* @returns {number} 
*/
  objs_avg(): number;
/**
* @returns {Solution} 
*/
  solution(): Solution;
}
export class OptProblemResults {
  free(): void;
/**
* @returns {OptProblemResult | undefined} 
*/
  best(): OptProblemResult | undefined;
/**
* @param {number} idx 
* @returns {OptProblemResult} 
*/
  get(idx: number): OptProblemResult;
/**
* @returns {number} 
*/
  len(): number;
}
export class Pct {
  free(): void;
/**
* @param {number} pct 
* @returns {Pct} 
*/
  static from_decimal(pct: number): Pct;
/**
* @param {number} pct 
* @returns {Pct} 
*/
  static from_percent(pct: number): Pct;
}
export class Solution {
  free(): void;
/**
* @returns {Float64Array} 
*/
  array(): Float64Array;
}
export class SolutionDomain {
  free(): void;
/**
* @param {any[]} ranges 
*/
  constructor(ranges: any[]);
}
