import propTypes from "prop-types"

// BlogList 컴포넌트에서 사용될 때 currentPage를 넘기지 않아도 default로 1을 설정했기 때문에 적용되는거 확인
// 삼항연산자 사용해서 currentPage 값에 따라서 active 들어가는 위치 변경
const Pagination = ({ currentPage, numberOfPages, onClick }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                </li>
                {/* 보여질 페이지 갯수를 전달받은 후 Array 객체의 fill 함수로 numberOfPages 크기의 배열을 생성
                    fill 함수로 배열을 1로 채운 후, map 함수로 1+index 값을 넣어준다. index는 0부터 시작하기 때문에 배열에 1~5가 저장된다
                    다시 map 함수를 사용해서 중첩되었던 코드를 간략화 시킨다. */}
                {Array(numberOfPages)
                    .fill(1)
                    .map((value, index) => value + index)
                    .map((pageNumber) => {
                        return (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                                <div
                                    className="page-link cursor-pointer"
                                    // BlogList의 getPosts 함수의 매개변수로 page값을 갖는다.
                                    // onClick 실행 시 클릭한 페이지 값을 넘겨주도록 한다.
                                    onClick={() => {
                                        onClick(pageNumber)
                                    }}
                                >
                                    {pageNumber}
                                </div>
                            </li>
                        )
                    })}
                <li className="page-item">
                    <a className="page-link" href="#">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    currentPage: propTypes.number,
    // 몇개의 페이지를 보여줄지 정해주는 prop
    numberOfPages: propTypes.number,
    onClick: propTypes.func.isRequired,
}

Pagination.defaultProps = {
    currentPage: 1,
}
export default Pagination
