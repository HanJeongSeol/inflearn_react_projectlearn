import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"

const ListPage = () => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data)
        })
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div>
            <h1>Blogs</h1>
            {posts.map((post) => {
                // porps사용 -> 부모 component에서 자식 component에게 데이터를 전달할 수 있다
                // 전달할 데이터를 속성에 추가한다. title이라는 이름으로 post.title 데이터가 Card 컴포넌트에 전달된다.
                return <Card key={post.id} title={post.title} />
            })}
        </div>
    )
}

export default ListPage
