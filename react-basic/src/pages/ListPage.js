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
                // Card 컴포넌트를 사용하는 곳들이 모두 같은 데이터 형식을 갖지 않는다.
                // 이를 해결하기 위해 props의 children을 사용한다.
                // 컴포넌트 태그 사이에 데이터를 넣어준다.
                return (
                    <Card key={post.id} title={post.title}>
                        <button>button</button>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListPage
