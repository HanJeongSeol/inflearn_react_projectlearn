import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ListPage = () => {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
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

    const renderBlogList = () => {
        if (loading) {
            return <LoadingSpinner />
        }

        if (posts.length === 0) {
            return <div>No post found blog</div>
        }
        return posts.map((post) => {
            return (
                // navigate에 사용자가 클릭한 card의 id를 파라미터로 전달하여 일치하는 페이지를 보여주도록 한다.
                <Card key={post.id} title={post.title} onClick={() => navigate(`/blogs/${post.id}`)}>
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
