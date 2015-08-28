import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes';

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

export default function todos(state = initialState, action) {
  switch (action.type) {
  case ADD_TODO:
    /*
    console.log(state.reduce.toString());
    不懂為什麼這裡可以用 state.reduce
    但是如果沒有用 combineReducers 就會 GG，為什麼？
    */
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text
    }, ...state];

  case DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { text: action.text }) :
        todo
    );

  case COMPLETE_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { completed: !todo.completed }) :
        todo
    );

  case COMPLETE_ALL:
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }));

  case CLEAR_COMPLETED:
    return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}
