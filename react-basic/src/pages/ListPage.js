import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ListPage = () => {
    const navigate = useNavigate()
    // poste 배열의 초기 값을 빈 배열로 했기 떄문에 페이지를 새로고침 할 시 posts 객체에 데이터가 존재하고 있어도
    // "No blog post found"가 잠시 보여진 뒤 데이터를 보여지는 것을 확인할 수 있다.
    // axios에서 요청을 보내고 받을 때 까지 시간이 걸리기 때문에 발생하는 현상이다.
    // request 이후 response가 도착할 때 까지 loding spinner를 보여주도록 만들어 보자.
    const [posts, setPosts] = useState([])

    // loding 상태를 나타내줄 setState, 서버에서 데이터를 전달받으면 false로 변경되도록 한다.
    const [loading, setLoading] = useState(true)

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data)
            // 로딩이 완료된 경우 false로 변경
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

    const renderBlogList = () => {
        // loading 페이지 렌더링(컴포넌트화)
        if (loading) {
            return <LoadingSpinner />
        }
        // post 없을 시
        if (posts.length === 0) {
            return <div>No post found blog</div>
        }
        return posts.map((post) => {
            return (
                <Card key={post.id} title={post.title} onClick={() => navigate("/blogs/edit")}>
                    <div>
                        <button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
                            Delete
                        </button>
                    </div>
                </Card>
            )
        })
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            {renderBlogList()}
        </div>
    )
}

export default ListPage
