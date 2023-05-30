import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const ShowPage = () => {
    const { id } = useParams()

    const [post, setPost] = useState(null)

    const [loading, setLoading] = useState(true)

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        console.log("hello")
        getPost(id)
    }, [id])
    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString()
    }

    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <div className="d-flex">
                {/* title 최우측에 edit 버튼을 생성해서 클릭 시 수정 페이지로 이동하도록 한다. */}
                <h1 className="flex-grow-1">{post.title}</h1>
                {/* Link를 사용해서 버튼 클릭 시 설정한 url로 이동되도록 한다. */}
                <div>
                    <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
                        Edit
                    </Link>
                </div>
            </div>
            <small className="text-muted">Create At: {printDate(post.createdAt)}</small>
            <hr />
            <p>{post.body}</p>
        </div>
    )
}

export default ShowPage
