import {
  gasUniqueFlagKey,
  gasUniqueFlagValue,
  gluerUniqueFlagKey,
  gluerUniqueFlagValue,
} from './contants';

/**
 * 异步节点生成函数
 * @param asyncFnc 必需
 * @param gluerReturn 非必需
 * @returns {function(): {async: *, model: (*|undefined)}}
 */
const gas = function (asyncFnc, gluerReturn) {
  if (arguments.length === 0) {
    throw new Error('at least one param needed');
  } else {
    if (typeof asyncFnc !== 'function') {
      throw new Error('Warning: the first param should be a function');
    }
    if (gluerReturn && (typeof gluerReturn !== 'function' || gluerReturn[gluerUniqueFlagKey] !== gluerUniqueFlagValue)) {
      throw new Error('the second param should be the return of "gluer"');
    }
  }
  // 为了和最终的使用行为保持一致，所以返回一个函数
  const gf = () => ({
    asyncHandler: asyncFnc,
    modelSettings: (gluerReturn && gluerReturn()) || undefined,
  });
  Object.defineProperty(gf, gasUniqueFlagKey, {
    value: gasUniqueFlagValue,
    writable: false,
    configurable: false,
    enumerable: false,
  });
  return gf;
};

export default gas;