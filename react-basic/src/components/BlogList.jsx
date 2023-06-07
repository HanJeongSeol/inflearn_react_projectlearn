import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Pagination from "./pagination"
import { useLocation } from "react-router-dom"

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate()
    // useLocation을 사용해서 url의 쿼리스트링 부분을 가져올 수 있다 -> ?page=7
    const location = useLocation()
    // URLSearchParams를 사용해서 URL 파라미터 값을 key-value로 전달한다.
    const params = new URLSearchParams(location.search)
    // params.get('key') -> key에 해당되는 value를 가져온다
    const pageParam = params.get("page")
    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    // 처음 currentPage를 1로 설정, pagination 컴포넌트에서
    const [currentPage, setCurrentPage] = useState(1)
    // 총 Posts 수 -> res.header의 x-total-count 값으로 확인
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    // 총 페이지 수
    const [numberOfPages, setNumberOfPages] = useState(0)
    // 한 페이지에서 보여줄 post 수
    const limit = 1

    // 전체 posts 수가 변경 될 때 마다 실행(numberOfPosts) -> 총 페이지 수 계산
    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit))
    }, [numberOfPosts])

    // navigate를 사용해서 클릭해서 이동한 페이지가 기록되도록 한다.
    // 뒤로가기 버튼 클릭 시 기록된 이전 페이지로 이동이 가능하다. (url 변경디는거 확인)
    // 이동 후 다시 getPosts 실행하여 값을 업데이트 해야한다.
    // location.pathname => blog에서 페이지 클릭시 똑같이 blog 페이지에서 이동되도록 pathoname를 가져왔다.
    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        getPosts(page)
    }

    // prop를 받아와서 보여줄 page를 지정, default 1페이지로 설정
    // page의 인자 값으로 pagination 컴포넌트에서 pageNumber을 전달받는다.
    // setCurrentPage를 실행시켜서 currentPage 값을 변경시킨다 -> 페이지 클릭 시 파란색 강조 부분도 변경되려면 리렌더링이 되어야 한다.
    const getPosts = (page = 1) => {
        // json-server로 페이징 처리를 하려면 쿼리스트링으로 _page=? & _limit=? 값을 제공함으로서 구현한다
        // _sort=? : 정렬기준점, _order=? : 오름차순(ASC),내림차순(DESC) 설정
        // pagination3 -> 쿼리스트링 부분을 params 객체로 전달 할 수 있다.
        // pagination4 -> publish가 true인 게시글만 가져온다.
        // admin에서는 true,false 상관없이 전부 보여줘야하니 params를 외부 변수로 빼낸 후 publish에 대해서만 조건문 사용

        let params = {
            _page: page,
            _limit: limit,
            _sort: "id",
            _order: "desc",
        }
        // isAdmin이 아닌 경우 기존 params 객체에 publish:true 값을 추가
        if (!isAdmin) {
            params = { ...params, publish: true }
        }

        axios
            .get(`http://localhost:3001/posts`, {
                params: params,
            })
            // res 객체의 heder를 살펴보면 x-total-count 값을 확인할 수 있다.
            // 해당 값은 요청 후 전달받은 데이터의 총 갯수이다.
            // 페이지별로 5개씩 보여주기로 했으니 x-total-count / 5 의 결과를 올림 처리 하면 필요한 페이지 갯수를 정할 수 있다.
            .then((res) => {
                setNumberOfPosts(res.headers["x-total-count"])
                setPosts(res.data)
                setLoading(false)
            })
    }

    const deleteBlog = (e, id) => {
        e.stopPropagation()
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        })
    }

    // 기존 useEffect는 삭제, pageParam 변경이 일어날 시 리렌더링 되도록 하나.
    // 이 때 getPosts의 인자 값은 number 타입이 필요. pageParam은 string이기 때문에 parseInt사용
    useEffect(() => {
        // getPosts 내부의 setCurrentPage도 옮겨준다.
        // 파라미터가 존재하지 않으면(/admin으로 접속할 시 뒤에 쿼리스트링이 존재하지 않는다.) 1페이지가 보여지도록 한다.
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
    }, [pageParam])

    if (loading) {
        return <LoadingSpinner />
    }

    if (posts.length === 0) {
        return <div>No post found blog</div>
    }
    // 기존 렌더링 부분을 함수로 변경
    // filter을 통해서 publish가 true인 게시글만 보여지게 되는데
    // pagination 처리를 할 때 처음 5개에서 true가 없다면 하나의 게시글도 보여지지 않게 된다.
    // filter를 삭제하고 서버에서 true인 게시글만 조회한 후 프론트로 전달하도록 하자.
    const renderBlogList = () => {
        return posts.map((post) => {
            return (
                <Card key={post.id} title={post.title} onClick={() => navigate(`/blogs/${post.id}`)}>
                    {isAdmin ? (
                        <div>
                            <button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
                                Delete
                            </button>
                        </div>
                    ) : null}
                </Card>
            )
        })
    }
    // 리스트 렌더링, 페이징 부분
    return (
        <div>
            {renderBlogList()}
            {/* currentPage 값을 넘겨서 현재 페이지를 알려준다. 
                numberOfPages가 1보다 작은 경우는 한 페이지에 모든 요소들이 보여지는 경우다.
                따라서 numberOfPages가 1보다 클 때 Pagination이 보여지도록 한다.
            */}

            {/* 
                navigate가 적용된 onClickPageButton 함수 사용
            */}
            {numberOfPages > 1 && (
                <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton} />
            )}
        </div>
    )
}

BlogList.propTypes = {
    isAdmin: PropTypes.bool,
}

BlogList.defaultProps = {
    isAdmin: false,
}
export default BlogList
