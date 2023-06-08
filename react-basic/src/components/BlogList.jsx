import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Pagination from './pagination'
import { useLocation } from 'react-router-dom'

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [searchText, setSearchText] = useState('')
    const limit = 5

    // 7. 검색 결과와 일치하는 post를 보여주기 위해 페이징 처리를 다시 하고 리렌더링 실행.
    // 최종적으로 리렌더링은 여기서 발생하는듯
    useEffect(() => {
        console.log('리렌더링 발생저짐')
        setNumberOfPages(Math.ceil(numberOfPosts / limit))
    }, [numberOfPosts])

    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        setCurrentPage(page)
        getPosts(page)
    }
    // useCallback() -> 배열에 지정한 값이 변경되었을 때 실행시키는 것이 아니라 함수를 재정의하는 거다.
    // 아무리 searchText 값을 변경된다 해도 실행시키지는 않는다.
    // 2. 첫 실행 생성 시 1페이지에 해당하는 post 렌더링. isAdmain, searchText 변경이 발생할 때 실행된다.

    //6. 마지막으로 재정의된 getPosts 함수 실행.
    const getPosts = useCallback(
        (page = 1) => {
            let params = {
                _page: page,
                _limit: limit,
                _sort: 'id',
                _order: 'desc',
                title_like: searchText,
            }
            console.log('1')
            if (!isAdmin) {
                params = { ...params, publish: true }
            }
            axios
                .get(`http://localhost:3001/posts`, {
                    params: params,
                })
                .then((res) => {
                    setNumberOfPosts(res.headers['x-total-count'])
                    setPosts(res.data)
                    setLoading(false)
                })
        },
        [isAdmin, searchText]
    )

    const deleteBlog = (e, id) => {
        e.stopPropagation()
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        })
    }
    // 1. 첫 마운트 때 실행. currentPage와 getPosts 값 설정.
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }
    const renderBlogList = () => {
        return posts.map((post) => {
            return (
                <Card
                    key={post.id}
                    title={post.title}
                    onClick={() => navigate(`/blogs/${post.id}`)}
                >
                    {isAdmin ? (
                        <div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => deleteBlog(e, post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ) : null}
                </Card>
            )
        })
    }
    // 5. Enter키 입력 시 실행.
    // 마지막으로 재정의한 getPosts 함수를 실행한다.
    const onSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`${location.pathname}?page=1`)
            setCurrentPage(1)
            getPosts(1)
        }
    }
    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Search.."
                value={searchText}
                // 3. 검색창에 버튼 입력 시 setSearchText로 searchText의 업데이트 발생
                // getPosts의 useCallback()의 searchText 변경된 값으로 재정의
                onChange={(e) => setSearchText(e.target.value)}
                // 4. 키 입력때마다 onSearch 함수 실행
                onKeyUp={onSearch}
            />
            <hr />
            {posts.length === 0 ? (
                <div>No blog posts found</div>
            ) : (
                <>
                    {renderBlogList()}
                    {numberOfPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={onClickPageButton}
                        />
                    )}
                </>
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
