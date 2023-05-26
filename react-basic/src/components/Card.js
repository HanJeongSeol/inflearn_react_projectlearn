// 매개변수 props 객체는 부모 컴포넌트에서 전달받은 데이터들을 갖고있다.\
// (props) => ({title}) && {props.title} => {title}
// props는 객체 , {title:'title'} 중괄호를 사용해서 title을 바로 사용할 수 있다.
const Card = ({ title }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">{title}</div>
        </div>
    )
}

export default Card
