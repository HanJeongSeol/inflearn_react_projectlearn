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

    // prop를 받아와서 보여줄 page를 지정, default 1페이지로 설정
    const getPosts = (page = 1) => {
        // json-server로 페이징 처리를 하려면 쿼리스트링으로 _page=? & _limit=? 값을 제공함으로서 구현한다
        // _sort=? : 정렬기준점, _order=? : 오름차순,내림차순(DESC) 설정
        // pagination3 -> 쿼리스트링 부분을 params 객체로 전달 할 수 있다.
        axios
            .get(`http://localhost:3001/posts`, {
                params: {
                    _page: page,
                    _limit: 5,
                    _sort: "id",
                    _order: "desc",
                },
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
    const renderBlogList = () => {
        return posts
            .filter((post) => {
                return isAdmin || post.publish
            })
            .map((post) => {
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
            <Pagination />
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
