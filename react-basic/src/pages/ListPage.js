import axios from "axios"
import { useState, useEffect } from "react"

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
            {/* db에서 가져온 post객체의 데이터를 map 함수를 사용해서 가져온다  */}
            {posts.map((post) => {
                return <div key={post.id}>{post.title}</div>
            })}
        </div>
    )
}

export default ListPage
