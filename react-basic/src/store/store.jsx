// state들을 redux store의 state로 정의하여
// 어떤 컴포넌트에서도 state를 사용할 수 있도록 한다.
// slice 생성해서 사용할 state, 함수들을 정의한다

// reducer 사용
import { configureStore } from '@reduxjs/toolkit'
// toastSlice 등록, reducer를 export하고 있으니 이름도 toastReducer로
import toastReducer from './toastSlice'

export default configureStore({
    reducer: {
        // 우리가 사용할 reducer 등록
        toast: toastReducer,
    },
})
