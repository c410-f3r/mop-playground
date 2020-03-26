/* eslint-disable */
import * as wasm from './mop_bindings_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8);
    getFloat64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    return getFloat64Memory0().subarray(ptr / 8, ptr / 8 + len);
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export const ObjDirection = Object.freeze({ Max:0,Min:1, });
/**
*/
export class HardCstr {

    static __wrap(ptr) {
        const obj = Object.create(HardCstr.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_hardcstr_free(ptr);
    }
    /**
    * @param {Function} f
    */
    constructor(f) {
        var ret = wasm.hardcstr_new(addHeapObject(f));
        return HardCstr.__wrap(ret);
    }
}
/**
*/
export class Obj {

    static __wrap(ptr) {
        const obj = Object.create(Obj.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_obj_free(ptr);
    }
    /**
    * @param {number} od
    * @param {Function} f
    */
    constructor(od, f) {
        var ret = wasm.obj_new(od, addHeapObject(f));
        return Obj.__wrap(ret);
    }
}
/**
*/
export class OptFacade {

    static __wrap(ptr) {
        const obj = Object.create(OptFacade.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optfacade_free(ptr);
    }
    /**
    * @param {OptProblem} problem
    * @returns {OptFacade}
    */
    solve(problem) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(problem, OptProblem);
        var ret = wasm.optfacade_solve(ptr, problem.ptr);
        return OptFacade.__wrap(ret);
    }
}
/**
*/
export class OptFacadeBuilder {

    static __wrap(ptr) {
        const obj = Object.create(OptFacadeBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optfacadebuilder_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.optfacadebuilder_new();
        return OptFacadeBuilder.__wrap(ret);
    }
    /**
    * @param {OptProblem} problem
    * @returns {OptFacade}
    */
    build(problem) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(problem, OptProblem);
        var ret = wasm.optfacadebuilder_build(ptr, problem.ptr);
        return OptFacade.__wrap(ret);
    }
    /**
    * @param {number} max_iterations
    * @returns {OptFacadeBuilder}
    */
    max_iterations(max_iterations) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.optfacadebuilder_max_iterations(ptr, max_iterations);
        return OptFacadeBuilder.__wrap(ret);
    }
    /**
    * @param {Float64Array} objs_goals
    * @returns {OptFacadeBuilder}
    */
    objs_goals(objs_goals) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ptr0 = passArrayF64ToWasm0(objs_goals, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.optfacadebuilder_objs_goals(ptr, ptr0, len0);
        return OptFacadeBuilder.__wrap(ret);
    }
    /**
    * @param {Pct} stagnation_percentage
    * @returns {OptFacadeBuilder}
    */
    stagnation_percentage(stagnation_percentage) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(stagnation_percentage, Pct);
        var ptr0 = stagnation_percentage.ptr;
        stagnation_percentage.ptr = 0;
        var ret = wasm.optfacadebuilder_stagnation_percentage(ptr, ptr0);
        return OptFacadeBuilder.__wrap(ret);
    }
    /**
    * @param {number} stagnation_threshold
    * @returns {OptFacadeBuilder}
    */
    stagnation_threshold(stagnation_threshold) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.optfacadebuilder_stagnation_threshold(ptr, stagnation_threshold);
        return OptFacadeBuilder.__wrap(ret);
    }
}
/**
*/
export class OptProblem {

    static __wrap(ptr) {
        const obj = Object.create(OptProblem.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optproblem_free(ptr);
    }
    /**
    * @param {OptProblemDefinitions} definitions
    * @param {number} results_num
    * @returns {OptProblem}
    */
    static with_capacity(definitions, results_num) {
        _assertClass(definitions, OptProblemDefinitions);
        var ptr0 = definitions.ptr;
        definitions.ptr = 0;
        var ret = wasm.optproblem_with_capacity(ptr0, results_num);
        return OptProblem.__wrap(ret);
    }
    /**
    * @returns {OptProblemDefinitions}
    */
    definitions() {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.optproblem_definitions(ptr);
        return OptProblemDefinitions.__wrap(ret);
    }
    /**
    * @returns {OptProblemResults}
    */
    results() {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.optproblem_results(ptr);
        return OptProblemResults.__wrap(ret);
    }
}
/**
*/
export class OptProblemDefinitions {

    static __wrap(ptr) {
        const obj = Object.create(OptProblemDefinitions.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optproblemdefinitions_free(ptr);
    }
}
/**
*/
export class OptProblemDefinitionsBuilder {

    static __wrap(ptr) {
        const obj = Object.create(OptProblemDefinitionsBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optproblemdefinitionsbuilder_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.optproblemdefinitionsbuilder_new();
        return OptProblemDefinitionsBuilder.__wrap(ret);
    }
    /**
    * @returns {OptProblemDefinitions}
    */
    build() {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.optproblemdefinitionsbuilder_build(ptr);
        return OptProblemDefinitions.__wrap(ret);
    }
    /**
    * @param {SolutionDomain} solution_domain
    * @returns {OptProblemDefinitionsBuilder}
    */
    domain(solution_domain) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(solution_domain, SolutionDomain);
        var ptr0 = solution_domain.ptr;
        solution_domain.ptr = 0;
        var ret = wasm.optproblemdefinitionsbuilder_domain(ptr, ptr0);
        return OptProblemDefinitionsBuilder.__wrap(ret);
    }
    /**
    * @param {string} name
    * @returns {OptProblemDefinitionsBuilder}
    */
    name(name) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.optproblemdefinitionsbuilder_name(ptr, ptr0, len0);
        return OptProblemDefinitionsBuilder.__wrap(ret);
    }
    /**
    * @param {HardCstr} hard_cstr
    * @returns {OptProblemDefinitionsBuilder}
    */
    push_hard_cstr(hard_cstr) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(hard_cstr, HardCstr);
        var ptr0 = hard_cstr.ptr;
        hard_cstr.ptr = 0;
        var ret = wasm.optproblemdefinitionsbuilder_push_hard_cstr(ptr, ptr0);
        return OptProblemDefinitionsBuilder.__wrap(ret);
    }
    /**
    * @param {Obj} obj
    * @returns {OptProblemDefinitionsBuilder}
    */
    push_obj(obj) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(obj, Obj);
        var ptr0 = obj.ptr;
        obj.ptr = 0;
        var ret = wasm.optproblemdefinitionsbuilder_push_obj(ptr, ptr0);
        return OptProblemDefinitionsBuilder.__wrap(ret);
    }
}
/**
*/
export class OptProblemResult {

    static __wrap(ptr) {
        const obj = Object.create(OptProblemResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optproblemresult_free(ptr);
    }
    /**
    * @returns {Uint32Array}
    */
    hard_cstrs() {
        wasm.optproblemresult_hard_cstrs(8, this.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v0 = getArrayU32FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 4);
        return v0;
    }
    /**
    * @returns {Float64Array}
    */
    objs() {
        wasm.optproblemresult_objs(8, this.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v0 = getArrayF64FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 8);
        return v0;
    }
    /**
    * @returns {number}
    */
    objs_avg() {
        var ret = wasm.optproblemresult_objs_avg(this.ptr);
        return ret;
    }
    /**
    * @returns {Solution}
    */
    solution() {
        var ret = wasm.optproblemresult_solution(this.ptr);
        return Solution.__wrap(ret);
    }
}
/**
*/
export class OptProblemResults {

    static __wrap(ptr) {
        const obj = Object.create(OptProblemResults.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_optproblemresults_free(ptr);
    }
    /**
    * @returns {OptProblemResult | undefined}
    */
    best() {
        var ret = wasm.optproblemresults_best(this.ptr);
        return ret === 0 ? undefined : OptProblemResult.__wrap(ret);
    }
    /**
    * @param {number} idx
    * @returns {OptProblemResult}
    */
    get(idx) {
        var ret = wasm.optproblemresults_get(this.ptr, idx);
        return OptProblemResult.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    len() {
        var ret = wasm.optproblemresults_len(this.ptr);
        return ret >>> 0;
    }
}
/**
*/
export class Pct {

    static __wrap(ptr) {
        const obj = Object.create(Pct.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pct_free(ptr);
    }
    /**
    * @param {number} pct
    * @returns {Pct}
    */
    static from_decimal(pct) {
        var ret = wasm.pct_from_decimal(pct);
        return Pct.__wrap(ret);
    }
    /**
    * @param {number} pct
    * @returns {Pct}
    */
    static from_percent(pct) {
        var ret = wasm.pct_from_percent(pct);
        return Pct.__wrap(ret);
    }
}
/**
*/
export class Solution {

    static __wrap(ptr) {
        const obj = Object.create(Solution.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_solution_free(ptr);
    }
    /**
    * @returns {Float64Array}
    */
    array() {
        wasm.solution_array(8, this.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v0 = getArrayF64FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 8);
        return v0;
    }
}
/**
*/
export class SolutionDomain {

    static __wrap(ptr) {
        const obj = Object.create(SolutionDomain.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_solutiondomain_free(ptr);
    }
    /**
    * @param {any[]} ranges
    */
    constructor(ranges) {
        var ptr0 = passArrayJsValueToWasm0(ranges, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.solutiondomain_new(ptr0, len0);
        return SolutionDomain.__wrap(ret);
    }
}

export const __wbg_new_ec28d6ba821801cb = function() {
    var ret = new Array();
    return addHeapObject(ret);
};

export const __wbindgen_number_new = function(arg0) {
    var ret = arg0;
    return addHeapObject(ret);
};

export const __wbg_push_ffaa2df7422d3b4c = function(arg0, arg1) {
    var ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbg_call_1ad0eb4a7ab279eb = function(arg0, arg1, arg2) {
    try {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export const __wbg_self_1b7a39e3a92c949c = function() {
    try {
        var ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_require_604837428532a733 = function(arg0, arg1) {
    var ret = require(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_crypto_968f1772287e2df0 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_getRandomValues_a3d34b4fee3c2869 = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export const __wbg_randomFillSync_d5bd2d655fdf256a = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_getRandomValues_f5e14ab7ac8e995d = function(arg0, arg1, arg2) {
    getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

