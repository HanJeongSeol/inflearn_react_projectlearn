// customhooks에서 useState, useRef 사용 가능
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

// toasts와 관련된 custom hooks를 모아둔다.
// hooks는 앞에 use를 붙여서 사용
const useToast = () => {
    const [, setToastsRerender] = useState(true)
    const toasts = useRef([])

    const addToast = (toast) => {
        const id = uuidv4()
        const toastWithId = {
            ...toast,
            id: id,
        }
        toasts.current = [...toasts.current, toastWithId]
        setToastsRerender((prev) => !prev)
        setTimeout(() => {
            deleteToast(id)
        }, 5000)
    }
    const deleteToast = (id) => {
        const filteredToasts = toasts.current.filter((toast) => {
            return toast.id !== id
        })
        toasts.current = filteredToasts
        setToastsRerender((prev) => !prev)
    }
    return [toasts.current, addToast, deleteToast]
}

export default useToast
