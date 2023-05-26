// 부모에게서 전달받은 children 사용
const Card = ({ title, children }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {/* children이 존재할 경우면 보여지도록 한다 */}
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    )
}

export default Card
