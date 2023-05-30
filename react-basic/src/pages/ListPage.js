import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ListPage = () => {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data)
        })
    }

    const deleteBlog = (e, id) => {
        e.stopPropagation()
        // axios에 delete 요청으로 서버에서 삭제시킨다
        // db에서는 삭제되어도 아직 posts 객체에는 데이터가 담겨져 있기 때문에 setState를 사용해서 변경사항을 저장해줘야 한다.
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            // setPosts 메소드로 posts 데이터를 업데이트 한다.
            // post 객체에서 전달받은 id와 동일하지 않은 객체들만 반환하여 삭제된 데이터는 posts 객체에 포함되지 않도록 한다.
            // 함수의 반환값에 return 명령어 대신 중괄호를 제외하면 바로 반환시켜준다.
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        })
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            {posts.map((post) => {
                return (
                    <Card key={post.id} title={post.title} onClick={() => navigate("/blogs/edit")}>
                        <div>
                            <button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
                                Delete
                            </button>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListPage
