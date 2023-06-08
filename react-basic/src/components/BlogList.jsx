import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Pagination from "./pagination"
import { useLocation } from "react-router-dom"

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const pageParam = params.get("page")
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const limit = 1

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit))
    }, [numberOfPosts])

    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        getPosts(page)
    }
    // 함수는 렌더링 될 때마다 새로 생성된다.
    // useCallback 추가
    // 첫번째로 함수 인자, 두번째로 디펜던시를 받는다. 함수를 기억해서 컴포넌트가 리렌더링 되어도 새로운 함수를 생성하지 않고 기억된 함수를 그대로 사용한다.
    const getPosts = useCallback(
        (page = 1) => {
            let params = {
                _page: page,
                _limit: limit,
                _sort: "id",
                _order: "desc",
            }

            if (!isAdmin) {
                params = { ...params, publish: true }
            }

            axios
                .get(`http://localhost:3001/posts`, {
                    params: params,
                })

                .then((res) => {
                    setNumberOfPosts(res.headers["x-total-count"])
                    setPosts(res.data)
                    setLoading(false)
                })
        },
        // useCallback에서 사용하는 디펜던시
        [isAdmin]
    )

    const deleteBlog = (e, id) => {
        e.stopPropagation()
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        })
    }
    // getPosts를 dependenct에 추가해야한다.
    // 이 때 setCurrentPage 값이 변경되면서 리렌더링 되고 새로운 getPosts 함수가 생성된다
    // getPosts를 호출하면 또 다른 getPosts 함수가 생성된다.
    // 리렌더링 되면서 다시 useEffect()가 실행 -> 무한반복 -> getPosts 함수가 무한 생성 -> 메모리 터짐
    // 1. getPosts 함수를 useEffect() 내부에 넣기 -> 디펜던시 삭제 -> isAdmin 디펜던시 추가
    // 2. useCallback 훅 사용
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
    }, [pageParam])

    if (loading) {
        return <LoadingSpinner />
    }

    if (posts.length === 0) {
        return <div>No post found blog</div>
    }
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
    return (
        <div>
            {renderBlogList()}
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
