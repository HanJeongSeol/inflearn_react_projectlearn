import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Pagination from "./pagination"
const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    // 처음 currentPage를 1로 설정, pagination 컴포넌트에서
    const [currentPage, setCurrentPage] = useState(1)

    // prop를 받아와서 보여줄 page를 지정, default 1페이지로 설정
    // page의 인자 값으로 pagination 컴포넌트에서 pageNumber을 전달받는다.
    // setCurrentPage를 실행시켜서 currentPage 값을 변경시킨다 -> 페이지 클릭 시 파란색 강조 부분도 변경되려면 리렌더링이 되어야 한다.
    const getPosts = (page = 1) => {
        setCurrentPage(page)
        // json-server로 페이징 처리를 하려면 쿼리스트링으로 _page=? & _limit=? 값을 제공함으로서 구현한다
        // _sort=? : 정렬기준점, _order=? : 오름차순(ASC),내림차순(DESC) 설정
        // pagination3 -> 쿼리스트링 부분을 params 객체로 전달 할 수 있다.
        // pagination4 -> publish가 true인 게시글만 가져온다.
        // admin에서는 true,false 상관없이 전부 보여줘야하니 params를 외부 변수로 빼낸 후 publish에 대해서만 조건문 사용

        let params = {
            _page: page,
            _limit: 5,
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
            .then((res) => {
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

    useEffect(() => {
        getPosts()
    }, [])

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
            {/* currentPage 값을 넘겨서 현재 페이지를 알려준다. */}
            <Pagination currentPage={currentPage} numberOfPages={5} onClick={getPosts} />
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
