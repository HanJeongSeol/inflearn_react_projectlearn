import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
// toastSlice의 reducers에 정의한 함수
import { addToast as add, removeToast } from '../store/toastSlice'
// action을 실행시키기 위한 함수
import { useDispatch } from 'react-redux'

const useToast = () => {
    const dispatch = useDispatch()

    const addToast = (toast) => {
        const id = uuidv4()
        const toastWithId = {
            ...toast,
            id: id,
        }
        // reducer의 add함수를 useDispatch를 이용해서 실행시킨다
        dispatch(add(toastWithId))
        setTimeout(() => {
            deleteToast(id)
        }, 5000)
    }
    const deleteToast = (id) => {
        dispatch(removeToast(id))
    }
    return { addToast, deleteToast }
}

export default useToast
