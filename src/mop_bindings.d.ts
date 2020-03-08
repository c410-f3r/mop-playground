/* eslint-disable */
export enum ObjDirectionJs {Max,Min,}
export class OptFacadeBuilderJs {
free(): void;

 constructor();

 build(): OptFacadeJs;

 max_iterations(arg0: number): OptFacadeBuilderJs;

 objs_goals(arg0: Float64Array): OptFacadeBuilderJs;

 opt_problem(arg0: OptProblemJs): OptFacadeBuilderJs;

 stagnation_percentage(arg0: PctJs): OptFacadeBuilderJs;

 stagnation_threshold(arg0: number): OptFacadeBuilderJs;

}
export class HardCstrJs {
free(): void;

 constructor(arg0: any);

}
export class OptProblemJs {
free(): void;

static  with_capacity(arg0: OptProblemDefinitionsJs): OptProblemJs;

 definitions(): OptProblemDefinitionsJs;

 results(): OptProblemResultsJs;

}
export class DomainJs {
free(): void;

 constructor(arg0: any[]);

}
export class OptProblemDefinitionsJs {
free(): void;

}
export class SolutionJs {
free(): void;

 array(): Float64Array;

}
export class ObjJs {
free(): void;

 constructor(arg0: number, arg1: any);

}
export class OptProblemResultsJs {
free(): void;

 best(): OptProblemResultJs;

 get(arg0: number): OptProblemResultJs;

 len(): number;

}
export class OptProblemDefinitionsBuilderJs {
free(): void;

 constructor();

 build(): OptProblemDefinitionsJs;

 domain(arg0: DomainJs): OptProblemDefinitionsBuilderJs;

 push_hard_cstr(arg0: HardCstrJs): OptProblemDefinitionsBuilderJs;

 push_obj(arg0: ObjJs): OptProblemDefinitionsBuilderJs;

 results_num(arg0: number): OptProblemDefinitionsBuilderJs;

 vars_num(arg0: number, arg1: number): OptProblemDefinitionsBuilderJs;

}
export class OptProblemResultJs {
free(): void;

 hard_cstrs_results(): Uint32Array;

 objs(): Float64Array;

 objs_avg(): number;

 solution(): SolutionJs;

}
export class PctJs {
free(): void;

static  from_decimal(arg0: number): PctJs;

static  from_percent(arg0: number): PctJs;

}
export class OptFacadeJs {
free(): void;

 opt_problem(): OptProblemJs;

 solve(): OptFacadeJs;

}
