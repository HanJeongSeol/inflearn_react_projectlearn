import propTypes from 'prop-types'

const Toast = ({ toasts, deleteToast }) => {
    return (
        <div className="position-fixed bottom-0 end-0 p-2">
            {toasts.map((toast) => {
                return (
                    <div
                        // map 함수 사용 시 객체별 고유 key값이 필요
                        // uuid로 생성된 고유 id값 사용
                        key={toast.id}
                        onClick={() => {
                            deleteToast(toast.id)
                        }}
                        className={`cursor-pointer alert alert-${
                            toast.type || 'success'
                        } m-0 py-2 mt-2`}
                    >
                        {toast.text}
                    </div>
                )
            })}
        </div>
    )
}

Toast.propTypes = {
    toasts: propTypes.arrayOf(
        propTypes.shape({
            text: propTypes.string,
            type: propTypes.string,
        })
    ).isRequired,
    deleteToast: propTypes.func.isRequired,
}

Toast.defaultProps = {
    toasts: [],
}

export default Toast
