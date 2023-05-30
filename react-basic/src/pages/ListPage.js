import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import { Link } from "react-router-dom"

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
            {/* css flex 사용 */}
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
                {/* /blog/create 페이지로 이동하는 버튼 */}
                <div>
                    <Link Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            {posts.map((post) => {
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
