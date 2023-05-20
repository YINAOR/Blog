---
id: use-redux-in-react
title: 在 React 中使用 Redux
---

## 直接在 react 中使用

```jsx
import React, {PureComponent} from 'react'
import store from './store'
import {increment} from './store/actionCreators'

export class About extends PureComponent {
   // 同步 store 中的数据
   state = {
      counter = store.getState().counter
   }

   // 在 componentDidMount 之后监听 store 变化
   componentDidMount() {
      this.unsubscribe = store.subscribe(() => {
         const state = store.getState()
         this.setState({
            counter: state.counter
         })
      })
   }

   // 在组件销毁前注销监听器。
   componentWillUnmount() {
      this.unsubscribe();
   }

   add = (num) => {
      // 触发 action 更新 store
      store.dispatch(increment(num))
   }

   render() {
      const { counter } = this.state
      return (
         <div onClick={() => add(10)}>{counter}</div>
      )
   }
}
```

上述使用 redux 方式最为直接，但是繁琐且重复，每次在组件中使用 store 都需要做初始化数据、监听变化、销毁监听等操作，因此这些重复代码可以用高阶组件封装起来。

## 使用 react-redux

> react-redux 中最核心的4个概念：`Provider`、`connect`、`useSelector`、`useDispatch`

实际使用中 react-redux 即是那个高阶组件：

1. 安装 react-redux

```shell
npm i react-redux
```

2. 将 store 注入到 React 的组件中，使组件可以访问状态数据和操作方法。

```js
import { Provider } from 'react-redux';
import store from './store'
import Counter from './Counter';

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
```

3. 在组件中通过 connect 函数，传入 mapStateToProps 和 mapDispatchToProps，返回一个高阶组件，再调用高阶组件传入 Counter 组件，将 state 数据和 dispatch 方法以 props 的形式传入 Counter。

```js
import React from 'react';
import { connect } from 'react-redux';
import { incrementAction, decrementAction } from './store/actionCreators';

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment(10)}>Increment</button>
      <button onClick={decrement(10)}>Decrement</button>
    </div>
  );
}

// 定义 Counter 组件需要使用和监听哪些 state 里面的数据
const mapStateToProps = (state) => ({ 
   count: state.count
})

// 定义 Counter 组件触发 dispatch 的方法
const mapDispatchToProps = (dispatch) => ({
   increment(num) {
      dispatch(incrementAction(num))
   },
   decrement(num) {
      dispatch(decrementAction(num))
   }
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

## 使用 redux-thunk

redux 中默认 dispatch 的参数只支持普通的对象，并且派发始终是同步的。

因此为了在 dispatch 中执行异步操作，通过使用 redux-thunk 中间件，使得 redux 可以 dispatch 一个函数，并在函数中执行异步操作，最终 dispatch 一个 action。

具体来说，当我们 dispatch 一个函数时，这个函数会接收到 dispatch 和 getState 两个参数，因此我们可以编写异步代码，在等待 API 响应时 dispatch action。

1. 安装 redux-thunk

```shell
npm i redux-thunk
```

2. 应用中间件

```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// 创建 store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
```

3. 定义异步 action

```js
import axios from 'axios';

// 异步 action creator
function fetchData() {
  return function(dispatch, getState) {
    // 同步派发
    dispatch({ type: 'FETCH_START' });
    // 异步派发
    axios.get('/api/data')
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      });
  };
}
```

4. 在组件中使用异步 action

```js
store.dispatch(fetchData());
```

## 拆分 reducer

在一个大型的 Redux 应用中，为了方便管理，我们通常需要将不同部分的数据拆分到不同的 reducer 中进行处理，这时候就需要用到 combineReducers 来将它们组合起来。

combineReducers 接收一个对象作为参数，该对象的键值对是不同的 reducer 函数，每个 reducer 函数都处理 store 的一个片段。

```js
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
});

export default rootReducer;
```

使用 combineReducers 可以避免 state 命名冲突，同时使得 reducer 可以被按照模块划分，更加清晰明了。在实际使用过程中，我们可以根据需求在应用内部、在模块间任意嵌套，利用 combineReducers 创建复杂的 reducer 结构。

## combineReducers 原理

combineReducers 的原理是将由多个 reducer 组成的对象转化为一个单一的 reducer 函数，该函数接收整个应用的 state 和 action ，然后将它们传递给所有子 reducer 进行处理，每个子 reducer 都负责管理 state 的一个子集。

当组合后的 reducer 接收到一个 action 时，它会遍历每个子 reducer 并调用它们各自对应的 action 处理函数，并根据每个子 reducer 对应的 key，将它们的结果合并为一个新的 state 对象。

```js title=简化版的 combineReducers 实现
export default function combineReducers(reducers) {
  return function(state = {}, action) {
    const newState = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      newState[key] = reducer(state[key], action);
    }
    return newState;
  };
}

```

## Chrome 调制工具

:::note redux-devtools

* 默认 redux-devtools 处于关闭状态，是看不到 redux 状态的，需要靠中间件打开

```js title=store/index.js
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer form './reducer'

// 安装了 redux-devtools 后会在 window 添加 __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 函数
// 生产环境去掉 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 默认关闭 redux-devtools 中的 Trace（调用栈），如果要打开
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose

// 通过中间件增强 redux
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
```

:::