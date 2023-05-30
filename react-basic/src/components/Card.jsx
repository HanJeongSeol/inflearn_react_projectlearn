import PropTypes from "prop-types"

const Card = ({ title, onClick, children }) => {
    return (
        // index.css(전역css)에서 생성한 cursor-pointer 클래스 사용
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    )
}

// onClick 이벤트 추가
Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick: PropTypes.func,
}

Card.defaultProps = {
    children: null,
    onClick: () => {},
}

export default Card
