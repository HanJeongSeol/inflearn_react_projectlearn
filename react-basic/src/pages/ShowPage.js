import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const ShowPage = () => {
    const { id } = useParams()
    // axios로 받아온 데이터 가져오기
    const [post, setPost] = useState(null)
    // 데이터 가져올 때 까지 loading 페이지 보여주기
    const [loading, setLoading] = useState(true)
    // db에 id 값으로 데이터 탐색해서 가져오기
    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data)
            setLoading(false)
        })
    }

    // component가 mount 될 때 한 번 실행된다.
    // 파라미터로 전달된 id 값을 getPost의 인자값으로 전달하여 db에 id 값이 일치하는 데이터를 post에 저장한다.
    useEffect(() => {
        getPost(id)
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export default ShowPage
