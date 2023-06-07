import PropTypes from "prop-types"

const Card = ({ title, onClick, children }) => {
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            {/* padding y 축 변경, 글자 가운데 정렬*/}
            <div className="card-body py-2 d-flex align-items-center">
                {/* css flex 수정, , delete 버튼 우측 고정  */}
                <div className="flex-grow-1">{title}</div>
                {children && <div>{children}</div>}
            </div>
        </div>
    )
}

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
