import PropTypes from "prop-types"

const Card = ({ title, children }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    )
}

// props로 받아오는 데이터들의 타입을 지정한다
Card.propTypes = {
    // title은 string 타입의 데이터를 받아야한다.
    // 부모(ListPage.js)컴포넌트에서 다른 데이터 타입을 전송시켜서 테스트해보면
    // 페이지에서는 제대로 보일지로도 콘솔창에서는 에러가 출력된다.
    // 항상 데이터가 필수로 들어와야 하는 경우 default를 삭제하고 isRequired를 추가하면 된다.
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
}

//props의 default를 원하는 경우
// 부모 컴포넌트에서 데이터를 전달하지 않더라도 default 값이 들어간다.
Card.defaultProps = {
    // title: "default",
    children: null,
}

export default Card
