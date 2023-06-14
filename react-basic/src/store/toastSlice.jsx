import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toasts: [],
}

const toastSlice = createSlice({
    // state 이름
    name: 'toast',
    // state 초기 값
    initialState,
    // state를 업데이트하는 함수가 들어간다. 여기서만 정의할 수 있다.
    reducers: {
        // state = initialState
        addToast: (state, action) => {
            // action.payload(사용자가 정의한 action을 실행시킨 결과 값)
            state.toasts.push(action.payload)
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((toast) => {
                return toast.id !== action.payload
            })
        },
    },
})

export const { addToast, removeToast } = toastSlice.actions
export default toastSlice.reducer
