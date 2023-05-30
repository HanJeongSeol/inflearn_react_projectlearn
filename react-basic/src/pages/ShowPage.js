import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const ShowPage = () => {
    const { id } = useParams()

    const [post, setPost] = useState(null)

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data)
            setLoading(false)
        })
    }

    // useEffect 메소드의 두 번째 매개변수로 들어오는 배열을 의존성 배열이라고 한다.
    // useEffect 메소드가 배열에 의존해서 작업을 수행한다.
    // [] : 컴포넌트가 렌더링 될 때 딱 한 번 실행이 된다. 다음 state가 변경되면서 리렌더링 될 때는 실행되지 않는다.
    // [id] : 컴포넌트가 렌더링 될 때 실행이 되고 id가 변경 될 때마다 useEffect 메솓가 실행된다.
    // 즉 메소드는 배열에 의존해서 한 번 실행되던지, 재실행되던지 결정된다.
    // 클릭시 /blogs/3 으로 이동되는 버튼을 생성하고 어떻게 동작하는지 확인해보자. -> url은 변경되었지만 페이지 내용은 변경되지 않는다.
    // 현재 빈 배열이기 때문에 id 값이 변경되어도 useEffect는 재실행 되지 않아서 url만 변경된다.
    // [id]로 id값이 변경될 때 useEffect가 실행되도록 해보면 url, 데이터 모두 변경되는 것을 확인할 수 있다.
    useEffect(() => {
        console.log("hello")
        getPost(id)
    }, [id])

    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button
                onClick={() => {
                    navigate("/blogs/3")
                }}
            >
                Click
            </button>
        </div>
    )
}

export default ShowPage
