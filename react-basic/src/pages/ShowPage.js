import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
    // timestamp 값을 우리에게 익숙한 텍스트로 보여지도록 하는 함수
    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString()
    }

    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <h1>{post.title}</h1>
            {/* 생성 시간 출력하기 */}
            <small className="text-muted">Create At: {printDate(post.createdAt)}</small>
            <hr />
            <p>{post.body}</p>
        </div>
    )
}

export default ShowPage
