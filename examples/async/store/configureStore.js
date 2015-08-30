import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware
)(createStore);

/*
在最簡單的範例裡，action creator 回傳的是 object
但是這代表 app 的一切都是 synchronize 的
在這個範例中
有的 action creator 會回傳一個 function
傳統上，回傳 function 的 function 稱為 "thunk"
意義是可以延遲 dispatch (叫 reducer 來處理 action) 的時間
或是進行一些預處理（例如 logger）

在 thunk 中，也可以 dispatch 多次
例如 要開始拿資料囉 => dispatch，這樣 UI 可以顯示「loading」
	拿到資料囉 => dispatch，這樣 UI 可以顯示資料

dispatch 就是叫 reducer 去更新狀態

所以這裡要 involve 'redux-thunk' 這樣創建出來的 store 會就是
「知道怎麼處理 thunk」的

*/
export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
