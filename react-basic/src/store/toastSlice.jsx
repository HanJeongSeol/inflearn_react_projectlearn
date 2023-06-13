import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toasts: [],
}

const toastSlice = createSlice({
    // state 이름
    name: 'toast',
    // state 초기 값
    initialState,
    // state를 업데이트하는 함수가 들어간다
    reducers: {},
})

export default toastSlice.reducer
