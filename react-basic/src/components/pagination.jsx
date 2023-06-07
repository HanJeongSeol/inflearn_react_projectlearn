import propTypes from "prop-types"

// BlogList 컴포넌트에서 사용될 때 currentPage를 넘기지 않아도 default로 1을 설정했기 때문에 적용되는거 확인
// 삼항연산자 사용해서 currentPage 값에 따라서 active 들어가는 위치 변경
// limit : 현재 페이지 기준으로 보여줄 페이지 갯수, 1페이지 클릭 -> 1~5페이지만 보인다
const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
    // 현재 set -> 1~5 : 1set, 6~10 : 2set
    // limit=5 즉 한번에 5개의 페이지 목록만 보여지도록 한다.
    // 현재 페이지 / limit의 값을 구한 후 올림을 하여 현재 몇 set인지 구한다.
    const currentSet = Math.ceil(currentPage / limit)

    // 마지막 set 값,
    const lastSet = Math.ceil(numberOfPages / limit)

    // limit* currentSet = 5, 10, 15...
    // 첫 페이지는 1, 6, 11, 16 ... 따라서 +1
    // 1set는 1~5페이지, 따라서 currnetSet - 1
    const startPage = limit * (currentSet - 1) + 1
    // numberOfPagesForSet -> 현재 페이지에서 보여질 post 수
    // 기본 limit-> 5개로 설정하고 마지막 set에서만 총 페이지 수를 limit으로 나눈 나머지 값으로 설정한다.
    // 즉 마지막 페이지 set에서 남은 post를 모드 보여주게 된다.
    const numberOfPagesForSet = currentSet === lastSet ? numberOfPages % limit : limit

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {/* currentSet이 1인경우 prev가 보여질 필요 없다. */}
                <li className="page-item">
                    {currentSet !== 1 && (
                        // startPage-limit = 이전 pageSet 값
                        <div className="page-link cursor-pointer" onClick={() => onClick(startPage - limit)}>
                            Previous
                        </div>
                    )}
                </li>
                {/* 보여질 페이지 갯수를 전달받은 후 Array 객체의 fill 함수로 numberOfPages 크기의 배열을 생성
                    fill 함수로 배열을 1로 채운 후, map 함수로 1+index 값을 넣어준다. index는 0부터 시작하기 때문에 배열에 1~5가 저장된다
                    다시 map 함수를 사용해서 중첩되었던 코드를 간략화 시킨다. */}

                {Array(numberOfPagesForSet)
                    .fill(startPage)
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
                {/* currentSet과 lastSet이 같으면 마지막 페이지임 */}
                {currentSet !== lastSet && (
                    <li className="page-item">
                        {/* onClick 메소드의 인자 값으로 햔재 페이지 + limit 값을 전달해서 다음 set으로 이동시킬 수 있다.
                        startPage는 사용자가 클릭한 페이지가 아닌 set의 시작 page, 1, 6, 11*/}
                        <div className="page-link cursor-pointer" onClick={() => onClick(startPage + limit)}>
                            Next
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    currentPage: propTypes.number,
    // 몇개의 페이지를 보여줄지 정해주는 prop
    numberOfPages: propTypes.number,
    onClick: propTypes.func.isRequired,
    limit: propTypes.number,
}

Pagination.defaultProps = {
    currentPage: 1,
    limit: 5,
}
export default Pagination
