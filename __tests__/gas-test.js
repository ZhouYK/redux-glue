import { createStore, combineReducers } from 'redux';
import { gas, gluer, destruct } from '../src';
import { asyncActionTypeSuffix, distinguishPrefix } from '../src/contants';

const name = gas(async newName => newName, gluer('小明'));
const age = gas(async a => a);
const user = {
  name,
  age,
};

const store = createStore(() => {});
const {
  reducers,
  hasModel,
  referToState,
} = destruct(store)(user);
store.replaceReducer(combineReducers(reducers));

test('gas test', () => {
  expect(hasModel(user.name)).toBe(true);
  expect(hasModel(user.age)).toBe(false);
  expect(referToState(user)).toEqual({
    name: '小明',
  });
  expect(referToState(user.name)).toBe('小明');
  expect(user.name.actionType).toBe(`${distinguishPrefix}name${asyncActionTypeSuffix}`);
  return user.name('小刚').then((data) => {
    expect(data).toBe('小刚');
    expect(referToState(user.name)).toBe('小刚');
  });
});