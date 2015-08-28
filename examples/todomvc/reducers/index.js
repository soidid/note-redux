import { combineReducers } from 'redux';
import todos from './todos';

// 原始
const rootReducer = combineReducers({
  todos
});
export default rootReducer;

// const rootReducer = combineReducers({
//   a: todos
// });
// export default rootReducer;

/*
為什麼換成這樣就會出錯勒？

export default function rootReducer(state, action) {
  return {
    todos: todos(state, action)
  };
}

All combineReducers() does is generate a function that calls your reducers with the slices of state selected 
according to their keys, 
現在修改的是 state.visibilityFilter，就呼叫 visibilityFilter

如果沒有 key: function
會把 function 當作 key 來對應

*/

