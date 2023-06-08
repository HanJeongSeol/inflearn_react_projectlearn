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

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit))
    }, [numberOfPosts])

    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        setCurrentPage(1)
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
                // 입력한 값과 db에 저장된 title을 비교한다.
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
        // searchText의 값이 변경될 때 마다 실행
        // 1. 한글자씩 입력될 때 searchText 값이 변경되면서 getPosts 함수가 실행된다.
        // 2. getPosts함수가 실행되면서 useEffect() 실행
        [isAdmin, searchText]
    )

    const deleteBlog = (e, id) => {
        e.stopPropagation()
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        })
    }
    /**
    // 실행될때마다 리렌더링
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
        // 3. getPosts가 한글자씩 입력될 때마다 생성되면서 useEffect 실행되면서 리렌더링
        // 4. 모든 단어를 입력하고 엔터 누를시 검색하기 위해서는 getPosts를 useEffect에 넣어서 처음 마운트 될 때 생성되도록 한다.
    }, [pageParam, getPosts])
    */

    useEffect(() => {
        // useEffect 내부의 getPosts는 사실상 처음 마운트 될 때 생성되기만 하면된다.
        // 실제론는 외부의 getPosts를 사용해서 새로울 결과값을 보여주기 때문에 여기서는 이름 없이 익명함수를 생성해서 즉시실행함수로 사용한다.
        // 생각해보니 여기서 굳이 실행시킬 이유가 없음. 한 번 마운트 되면 되기 때문에 외부 함수를 그냥 사용한다.
        setCurrentPage(parseInt(pageParam) || 1)
        getPosts(parseInt(pageParam) || 1)
        // ;((page = 1) => {
        //     let params = {
        //         _page: page,
        //         _limit: limit,
        //         _sort: 'id',
        //         _order: 'desc',
        //     }

        //     if (!isAdmin) {
        //         params = { ...params, publish: true }
        //     }

        //     axios
        //         .get(`http://localhost:3001/posts`, {
        //             params: params,
        //         })

        //         .then((res) => {
        //             setNumberOfPosts(res.headers['x-total-count'])
        //             setPosts(res.data)
        //             setLoading(false)
        //         })
        // })(getPosts(parseInt(pageParam) || 1))
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

    const onSearch = (e) => {
        // search후 헨터 누르면 한상 첫 페이지를 가져오도록 한다.
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
                onChange={(e) => setSearchText(e.target.value)}
                // 키가 눌렸다 올라올 때 작동
                // 버튼 클릭시 입력한 내용과 db의 내용을 비교해서 맞는 값을 보여주도록 하는 함수
                // 모든 단어 입력 후 검색하는 방법 -> 누른키가 enter인지 판별해서 일치하는 경우 onSearch를 실행시킨다.
                onKeyUp={onSearch}
            />
            <hr />
            {/* 기존에는 상단에서 post 갯수를 카운터하고 없을 때 메시지를 렌더링 했다.
                하지만 위에서 검색창이 렌더링 되어지지 않은 상태로 반환이 끝나기 때문에 검색창을 보여줄 수 없었다.
                이를 해결하기 위한 코드 
                */}
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
