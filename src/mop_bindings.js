/* eslint-disable */
import * as wasm from './mop_bindings_bg'

let cachegetUint32Memory = null
function getUint32Memory () {
  if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
    cachegetUint32Memory = new Uint32Array(wasm.memory.buffer)
  }
  return cachegetUint32Memory
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }]

let slab_next = slab.length

function addHeapObject (obj) {
  if (slab_next === slab.length) slab.push(slab.length + 1)
  const idx = slab_next
  const next = slab[idx]

  slab_next = next

  slab[idx] = { obj, cnt: 1 }
  return idx << 1
}

function passArrayJsValueToWasm (array) {
  const ptr = wasm.__wbindgen_malloc(array.length * 4)
  const mem = getUint32Memory()
  for (let i = 0; i < array.length; i++) {
    mem[ptr / 4 + i] = addHeapObject(array[i])
  }
  return [ptr, array.length]
}
/**
*/
export const ObjDirectionJs = Object.freeze({ Max: 0, Min: 1 })

let cachegetFloat64Memory = null
function getFloat64Memory () {
  if (cachegetFloat64Memory === null || cachegetFloat64Memory.buffer !== wasm.memory.buffer) {
    cachegetFloat64Memory = new Float64Array(wasm.memory.buffer)
  }
  return cachegetFloat64Memory
}

function passArrayF64ToWasm (arg) {
  const ptr = wasm.__wbindgen_malloc(arg.length * 8)
  getFloat64Memory().set(arg, ptr / 8)
  return [ptr, arg.length]
}

function getArrayU32FromWasm (ptr, len) {
  return getUint32Memory().subarray(ptr / 4, ptr / 4 + len)
}

let cachedGlobalArgumentPtr = null
function globalArgumentPtr () {
  if (cachedGlobalArgumentPtr === null) {
    cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr()
  }
  return cachedGlobalArgumentPtr
}

function getArrayF64FromWasm (ptr, len) {
  return getFloat64Memory().subarray(ptr / 8, ptr / 8 + len)
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder

const cachedTextDecoder = new lTextDecoder('utf-8')

let cachegetUint8Memory = null
function getUint8Memory () {
  if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory = new Uint8Array(wasm.memory.buffer)
  }
  return cachegetUint8Memory
}

function getStringFromWasm (ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len))
}

export function __wbg_new_7186a5e444148014 (arg0, arg1) {
  const varg0 = getStringFromWasm(arg0, arg1)
  return addHeapObject(new Function(varg0))
}

const stack = []

function getObject (idx) {
  if ((idx & 1) === 1) {
    return stack[idx >> 1]
  } else {
    const val = slab[idx >> 1]

    return val.obj
  }
}

export function __wbg_call_8e081ad59d82a596 (arg0, arg1) {
  return addHeapObject(getObject(arg0).call(getObject(arg1)))
}

export function __wbg_self_0131cdbae6b5bd9f (arg0) {
  return addHeapObject(getObject(arg0).self)
}

export function __wbg_crypto_cc35b393672098c8 (arg0) {
  return addHeapObject(getObject(arg0).crypto)
}

export function __wbg_getRandomValues_535140a38ab83daf (arg0) {
  return addHeapObject(getObject(arg0).getRandomValues)
}

function getArrayU8FromWasm (ptr, len) {
  return getUint8Memory().subarray(ptr / 1, ptr / 1 + len)
}

export function __wbg_getRandomValues_2ad4d991ea29bdf7 (arg0, arg1, arg2) {
  const varg1 = getArrayU8FromWasm(arg1, arg2)
  getObject(arg0).getRandomValues(varg1)
}

export function __wbg_require_217dc25ba03e9505 (arg0, arg1) {
  const varg0 = getStringFromWasm(arg0, arg1)
  return addHeapObject(require(varg0))
}

export function __wbg_randomFillSync_0e5b46c8727fb4ad (arg0, arg1, arg2) {
  const varg1 = getArrayU8FromWasm(arg1, arg2)
  getObject(arg0).randomFillSync(varg1)
}

export function __wbg_new_55d176391eb5bbb4 () {
  return addHeapObject(new Array())
}

export function __wbg_push_a3d2caf057c8ab57 (arg0, arg1) {
  return getObject(arg0).push(getObject(arg1))
}

export function __wbg_call_6810db23cc77bd1a (arg0, arg1, arg2, exnptr) {
  try {
    return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)))
  } catch (e) {
    const view = getUint32Memory()
    view[exnptr / 4] = 1
    view[exnptr / 4 + 1] = addHeapObject(e)
  }
}

function freeOptFacadeBuilderJs (ptr) {
  wasm.__wbg_optfacadebuilderjs_free(ptr)
}
/**
*/
export class OptFacadeBuilderJs {
  static __wrap (ptr) {
    const obj = Object.create(OptFacadeBuilderJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptFacadeBuilderJs(ptr)
  }

  /**
    * @returns {}
    */
  constructor () {
    this.ptr = wasm.optfacadebuilderjs_new()
  }

  /**
    * @returns {OptFacadeJs}
    */
  build () {
    const ptr = this.ptr
    this.ptr = 0
    return OptFacadeJs.__wrap(wasm.optfacadebuilderjs_build(ptr))
  }

  /**
    * @param {number} arg0
    * @returns {OptFacadeBuilderJs}
    */
  max_iterations (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    return OptFacadeBuilderJs.__wrap(wasm.optfacadebuilderjs_max_iterations(ptr, arg0))
  }

  /**
    * @param {Float64Array} arg0
    * @returns {OptFacadeBuilderJs}
    */
  objs_goals (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const [ptr0, len0] = passArrayF64ToWasm(arg0)
    return OptFacadeBuilderJs.__wrap(wasm.optfacadebuilderjs_objs_goals(ptr, ptr0, len0))
  }

  /**
    * @param {OptProblemJs} arg0
    * @returns {OptFacadeBuilderJs}
    */
  opt_problem (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptFacadeBuilderJs.__wrap(wasm.optfacadebuilderjs_opt_problem(ptr, ptr0))
  }

  /**
    * @param {PctJs} arg0
    * @returns {OptFacadeBuilderJs}
    */
  stagnation_percentage (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptFacadeBuilderJs.__wrap(wasm.optfacadebuilderjs_stagnation_percentage(ptr, ptr0))
  }

  /**
    * @param {number} arg0
    * @returns {OptFacadeBuilderJs}
    */
  stagnation_threshold (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    return OptFacadeBuilderJs.__wrap(wasm.optfacadebuilderjs_stagnation_threshold(ptr, arg0))
  }
}

function freeHardCstrJs (ptr) {
  wasm.__wbg_hardcstrjs_free(ptr)
}
/**
*/
export class HardCstrJs {
  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeHardCstrJs(ptr)
  }

  /**
    * @param {any} arg0
    * @returns {}
    */
  constructor (arg0) {
    this.ptr = wasm.hardcstrjs_new(addHeapObject(arg0))
  }
}

function freeOptProblemJs (ptr) {
  wasm.__wbg_optproblemjs_free(ptr)
}
/**
*/
export class OptProblemJs {
  static __wrap (ptr) {
    const obj = Object.create(OptProblemJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptProblemJs(ptr)
  }

  /**
    * @param {OptProblemDefinitionsJs} arg0
    * @returns {OptProblemJs}
    */
  static with_capacity (arg0) {
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptProblemJs.__wrap(wasm.optproblemjs_with_capacity(ptr0))
  }

  /**
    * @returns {OptProblemDefinitionsJs}
    */
  definitions () {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemDefinitionsJs.__wrap(wasm.optproblemjs_definitions(ptr))
  }

  /**
    * @returns {OptProblemResultsJs}
    */
  results () {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemResultsJs.__wrap(wasm.optproblemjs_results(ptr))
  }
}

function freeDomainJs (ptr) {
  wasm.__wbg_domainjs_free(ptr)
}
/**
*/
export class DomainJs {
  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeDomainJs(ptr)
  }

  /**
    * @param {any[]} arg0
    * @returns {}
    */
  constructor (arg0) {
    const [ptr0, len0] = passArrayJsValueToWasm(arg0)
    this.ptr = wasm.domainjs_new(ptr0, len0)
  }
}

function freeOptProblemDefinitionsJs (ptr) {
  wasm.__wbg_optproblemdefinitionsjs_free(ptr)
}
/**
*/
export class OptProblemDefinitionsJs {
  static __wrap (ptr) {
    const obj = Object.create(OptProblemDefinitionsJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptProblemDefinitionsJs(ptr)
  }
}

function freeSolutionJs (ptr) {
  wasm.__wbg_solutionjs_free(ptr)
}
/**
*/
export class SolutionJs {
  static __wrap (ptr) {
    const obj = Object.create(SolutionJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeSolutionJs(ptr)
  }

  /**
    * @returns {Float64Array}
    */
  array () {
    const retptr = globalArgumentPtr()
    wasm.solutionjs_array(retptr, this.ptr)
    const mem = getUint32Memory()
    const rustptr = mem[retptr / 4]
    const rustlen = mem[retptr / 4 + 1]

    const realRet = getArrayF64FromWasm(rustptr, rustlen).slice()
    wasm.__wbindgen_free(rustptr, rustlen * 8)
    return realRet
  }
}

function freeObjJs (ptr) {
  wasm.__wbg_objjs_free(ptr)
}
/**
*/
export class ObjJs {
  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeObjJs(ptr)
  }

  /**
    * @param {number} arg0
    * @param {any} arg1
    * @returns {}
    */
  constructor (arg0, arg1) {
    this.ptr = wasm.objjs_new(arg0, addHeapObject(arg1))
  }
}

function freeOptProblemResultsJs (ptr) {
  wasm.__wbg_optproblemresultsjs_free(ptr)
}
/**
*/
export class OptProblemResultsJs {
  static __wrap (ptr) {
    const obj = Object.create(OptProblemResultsJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptProblemResultsJs(ptr)
  }

  /**
    * @returns {OptProblemResultJs}
    */
  best () {
    return OptProblemResultJs.__wrap(wasm.optproblemresultsjs_best(this.ptr))
  }

  /**
    * @param {number} arg0
    * @returns {OptProblemResultJs}
    */
  get (arg0) {
    return OptProblemResultJs.__wrap(wasm.optproblemresultsjs_get(this.ptr, arg0))
  }

  /**
    * @returns {number}
    */
  len () {
    return wasm.optproblemresultsjs_len(this.ptr)
  }
}

function freeOptProblemDefinitionsBuilderJs (ptr) {
  wasm.__wbg_optproblemdefinitionsbuilderjs_free(ptr)
}
/**
*/
export class OptProblemDefinitionsBuilderJs {
  static __wrap (ptr) {
    const obj = Object.create(OptProblemDefinitionsBuilderJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptProblemDefinitionsBuilderJs(ptr)
  }

  /**
    * @returns {}
    */
  constructor () {
    this.ptr = wasm.optproblemdefinitionsbuilderjs_new()
  }

  /**
    * @returns {OptProblemDefinitionsJs}
    */
  build () {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemDefinitionsJs.__wrap(wasm.optproblemdefinitionsbuilderjs_build(ptr))
  }

  /**
    * @param {DomainJs} arg0
    * @returns {OptProblemDefinitionsBuilderJs}
    */
  domain (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptProblemDefinitionsBuilderJs.__wrap(wasm.optproblemdefinitionsbuilderjs_domain(ptr, ptr0))
  }

  /**
    * @param {HardCstrJs} arg0
    * @returns {OptProblemDefinitionsBuilderJs}
    */
  push_hard_cstr (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptProblemDefinitionsBuilderJs.__wrap(wasm.optproblemdefinitionsbuilderjs_push_hard_cstr(ptr, ptr0))
  }

  /**
    * @param {ObjJs} arg0
    * @returns {OptProblemDefinitionsBuilderJs}
    */
  push_obj (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    const ptr0 = arg0.ptr
    arg0.ptr = 0
    return OptProblemDefinitionsBuilderJs.__wrap(wasm.optproblemdefinitionsbuilderjs_push_obj(ptr, ptr0))
  }

  /**
    * @param {number} arg0
    * @returns {OptProblemDefinitionsBuilderJs}
    */
  results_num (arg0) {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemDefinitionsBuilderJs.__wrap(wasm.optproblemdefinitionsbuilderjs_results_num(ptr, arg0))
  }

  /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {OptProblemDefinitionsBuilderJs}
    */
  vars_num (arg0, arg1) {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemDefinitionsBuilderJs.__wrap(wasm.optproblemdefinitionsbuilderjs_vars_num(ptr, arg0, arg1))
  }
}

function freeOptProblemResultJs (ptr) {
  wasm.__wbg_optproblemresultjs_free(ptr)
}
/**
*/
export class OptProblemResultJs {
  static __wrap (ptr) {
    const obj = Object.create(OptProblemResultJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptProblemResultJs(ptr)
  }

  /**
    * @returns {Uint32Array}
    */
  hard_cstrs_results () {
    const retptr = globalArgumentPtr()
    wasm.optproblemresultjs_hard_cstrs_results(retptr, this.ptr)
    const mem = getUint32Memory()
    const rustptr = mem[retptr / 4]
    const rustlen = mem[retptr / 4 + 1]

    const realRet = getArrayU32FromWasm(rustptr, rustlen).slice()
    wasm.__wbindgen_free(rustptr, rustlen * 4)
    return realRet
  }

  /**
    * @returns {Float64Array}
    */
  objs () {
    const retptr = globalArgumentPtr()
    wasm.optproblemresultjs_objs(retptr, this.ptr)
    const mem = getUint32Memory()
    const rustptr = mem[retptr / 4]
    const rustlen = mem[retptr / 4 + 1]

    const realRet = getArrayF64FromWasm(rustptr, rustlen).slice()
    wasm.__wbindgen_free(rustptr, rustlen * 8)
    return realRet
  }

  /**
    * @returns {number}
    */
  objs_avg () {
    return wasm.optproblemresultjs_objs_avg(this.ptr)
  }

  /**
    * @returns {SolutionJs}
    */
  solution () {
    return SolutionJs.__wrap(wasm.optproblemresultjs_solution(this.ptr))
  }
}

function freePctJs (ptr) {
  wasm.__wbg_pctjs_free(ptr)
}
/**
*/
export class PctJs {
  static __wrap (ptr) {
    const obj = Object.create(PctJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freePctJs(ptr)
  }

  /**
    * @param {number} arg0
    * @returns {PctJs}
    */
  static from_decimal (arg0) {
    return PctJs.__wrap(wasm.pctjs_from_decimal(arg0))
  }

  /**
    * @param {number} arg0
    * @returns {PctJs}
    */
  static from_percent (arg0) {
    return PctJs.__wrap(wasm.pctjs_from_percent(arg0))
  }
}

function freeOptFacadeJs (ptr) {
  wasm.__wbg_optfacadejs_free(ptr)
}
/**
*/
export class OptFacadeJs {
  static __wrap (ptr) {
    const obj = Object.create(OptFacadeJs.prototype)
    obj.ptr = ptr

    return obj
  }

  free () {
    const ptr = this.ptr
    this.ptr = 0
    freeOptFacadeJs(ptr)
  }

  /**
    * @returns {OptProblemJs}
    */
  opt_problem () {
    const ptr = this.ptr
    this.ptr = 0
    return OptProblemJs.__wrap(wasm.optfacadejs_opt_problem(ptr))
  }

  /**
    * @returns {OptFacadeJs}
    */
  solve () {
    const ptr = this.ptr
    this.ptr = 0
    return OptFacadeJs.__wrap(wasm.optfacadejs_solve(ptr))
  }
}

function dropRef (idx) {
  idx = idx >> 1
  if (idx < 4) return
  const obj = slab[idx]

  obj.cnt -= 1
  if (obj.cnt > 0) return

  // If we hit 0 then free up our space in the slab
  slab[idx] = slab_next
  slab_next = idx
}

export function __wbindgen_object_drop_ref (i) {
  dropRef(i)
}

export function __wbindgen_number_new (i) {
  return addHeapObject(i)
}

export function __wbindgen_number_get (n, invalid) {
  const obj = getObject(n)
  if (typeof (obj) === 'number') return obj
  getUint8Memory()[invalid] = 1
  return 0
}

export function __wbindgen_is_null (idx) {
  return getObject(idx) === null ? 1 : 0
}

export function __wbindgen_is_undefined (idx) {
  return getObject(idx) === undefined ? 1 : 0
}

export function __wbindgen_boolean_get (i) {
  const v = getObject(i)
  if (typeof (v) === 'boolean') {
    return v ? 1 : 0
  } else {
    return 2
  }
}

export function __wbindgen_is_symbol (i) {
  return typeof (getObject(i)) === 'symbol' ? 1 : 0
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder

const cachedTextEncoder = new lTextEncoder('utf-8')

function passStringToWasm (arg) {
  const buf = cachedTextEncoder.encode(arg)
  const ptr = wasm.__wbindgen_malloc(buf.length)
  getUint8Memory().set(buf, ptr)
  return [ptr, buf.length]
}

export function __wbindgen_string_get (i, len_ptr) {
  const obj = getObject(i)
  if (typeof (obj) !== 'string') return 0
  const [ptr, len] = passStringToWasm(obj)
  getUint32Memory()[len_ptr / 4] = len
  return ptr
}

export function __wbindgen_jsval_eq (a, b) {
  return getObject(a) === getObject(b) ? 1 : 0
}

export function __wbindgen_throw (ptr, len) {
  throw new Error(getStringFromWasm(ptr, len))
}
