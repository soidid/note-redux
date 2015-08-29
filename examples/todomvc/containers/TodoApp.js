import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

// 這是一個 smart component，只有他知道 reducer/redux 的存在
// 底下的 compoennt 都是拿 props 辦事

class TodoApp extends Component {
  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);
    // todos & dispatch 是因為上層用了 connect 神器，所以得到的 props
    // actions 是一堆 actionCreator: which is 產生 action 的 function
    // 把 action creators 拿進來後，在 app/component 裡面調用

    /*
    在傳統的 flux 架構下，view 和 store 是用 emit/listener 的方式溝通，
    中間有個人負責分送他叫 dispatcher。在 redux，刪除了中間人，
    view 如果需要更新 state，是直接調用 dispatch(actionCreactor)。
    store 裡面的 subscribe 是內部自己用的，
    例如當 state 更新的時候 log 出來看看花生什麼素。
    */

    /*
    如果這裡不用 bindActionCreators
    就是要用 dispatch（ actionCreator ）這樣的形式
    例如 dispatch(addTodo(text))
    bind 起來之後，就可以直接調用 actionCreator，redux 架構會處理
    「要找 dispatch 來接球」的這部分
    */

    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    todos: state.todos
    //為什麼這裡是 state.todos 呢
    /*
      因為在 reducers/index
      裡面，利用 combineReducer 把 todos 放進來了
      沒有設定 key
      所以 key 就是 function 名稱，就是 todos 囉
      所以這裡傳回去的是一個 reducer
      這個 reducer 在你沒有丟 action 給他的狀況下，會回傳現在的 state
      如果有丟 action 給他，他就會算下一個 state 給你
      （棒不棒）
    */
  };
}

export default connect(select)(TodoApp);
/*
connect: 把 store 跟 view/component 接起來的 redux 工具
connect 之後會得到以下 as props
1. state (經過 select function 選擇最適合水水的 state/reducer)
2. dispatch function
*/