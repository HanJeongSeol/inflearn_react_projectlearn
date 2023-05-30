import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"

// 페이지에 post를 렌더링 해주는 컴포넌트.
// ListPage, AdminPage 두 곳에서 동시에 사용되기 때문에 하나의 컴포넌트로 빼줬다. -> renderBlogList() 메소드 컴포넌트화
const BlogList = () => {
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

    if (loading) {
        return <LoadingSpinner />
    }

    if (posts.length === 0) {
        return <div>No post found blog</div>
    }

    return posts
        .filter((post) => {
            return post.publish
        })
        .map((post) => {
            return (
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

export default BlogList
