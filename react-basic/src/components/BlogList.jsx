import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

// List페이지에서는 삭제버튼이 안보이게 하기 위해서 props를 하나 받는다.
const BlogList = ({ isAdmin }) => {
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
            // 넘어오는 isAdmin props가 true인 경우 비공개 포스트까지 보여지게 한다.
            return isAdmin || post.publish
        })
        .map((post) => {
            return (
                <Card key={post.id} title={post.title} onClick={() => navigate(`/blogs/${post.id}`)}>
                    {/* isAdmin이 true인 경우만 delete 버튼을 보여준다 */}
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

// Listpage, Adminpage에서 넘어오는 isAmdin porps 타입
BlogList.propTypes = {
    isAdmin: PropTypes.bool,
}

// Admin에서만 true로 넘어오면 되기 때문에 false를 default로 설정
BlogList.defaultProps = {
    isAdmin: false,
}
export default BlogList
