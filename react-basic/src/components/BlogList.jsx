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
    const limit = 1

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit))
    }, [numberOfPosts])

    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        getPosts(page)
    }

    const getPosts = useCallback(
        (page = 1) => {
            let params = {
                _page: page,
                _limit: limit,
                _sort: 'id',
                _order: 'desc',
                // 검색창에 입력한 값을 파라미터로 전달
                // 디펜던시에 추가
                // '_like' : 단어의 일부만 일치해도 검색해준다
                title_like: searchText,
            }

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

    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
    }, [pageParam])

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

    const onSearch = () => {
        getPosts(1)
    }
    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Search.."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                // 키가 눌렸다 올라올 때 작동
                // 버튼 클릭시 입력한 내용과 db의 내용을 비교해서 맞는 값을 보여주도록 하는 함수
                onKeyUp={onSearch}
            />
            <hr />
            {/* 기존에는 상단에서 post 갯수를 카운터하고 없을 때 메시지를 렌더링 했다.
                하지만 위에서 검색창이 렌더링 되어지지 않은 상태로 반환이 끝나기 때문에 검색창을 보여줄 수 없었다.
                이를 해결하기 위한 코드 */}
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
