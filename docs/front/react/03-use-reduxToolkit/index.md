---
id: use-reduxToolkit
title: 使用 ReduxToolkit
---

Redux Toolkit 是 Redux 官方推荐的工具箱，它包含了一些用于简化 Redux 开发流程的实用工具和常用函数。使用 Redux Toolkit 可以让我们编写更少且更简洁、易读的代码来创建 Redux store 和处理 Redux action。

Redux Toolkit 最核心的功能是提供了一种新的 reducer 书写方式，即 createSlice 函数，该函数允许我们将 reducer 相关的逻辑（action 类型，action creator 和 Reducer）全部封装在一个文件中，会自动为每个 reducer 中定义的 action 创建一个 action type 和 action creator，从而大幅简化 Redux 的状态管理开发。

## 核心 API

Redux Toolkit 的4个核心 API，包括：

1. createSlice: 接受 reducer 函数的对象，切片名称和初始状态值，并自动生成切片 reducer，并带有相应的actions。
   
2. configureStore: 包装 createStore 以提供简化的配置项和良好的默认值，它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，默认包含 redux-thunk，并默认启用 redux-devtools。
   
3. createAsyncThunk: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个 pending/fulfilled/rejected 基于该承诺分派动作类型的 thunk。
   
4. createEntityAdapter: 用于管理具有共享状态或列表行为的数据的实用工具库。

## 开始使用

1. 安装 ReduxToolkit

```shell
# 依赖于 react-redux
npm i @reduxjs/toolkit react-redux
```




