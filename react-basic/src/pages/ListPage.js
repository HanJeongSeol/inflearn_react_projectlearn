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
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
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
            {/* 
                map 함수를 통해 posts 객체의 데이터를 탐색하고 있다.
                posts 객체에 데이터가 없을 경우 사용자에게 데이터가 존재하지 않다는 문구를 보여주기 위하여
                posts 객체의 길이가 1 이상인 경우에만 Card가 보여지도록 한다.
             */}
            {posts.length > 0
                ? posts.map((post) => {
                      return (
                          <Card key={post.id} title={post.title} onClick={() => navigate("/blogs/edit")}>
                              <div>
                                  <button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
                                      Delete
                                  </button>
                              </div>
                          </Card>
                      )
                  })
                : "No blog post found"}
        </div>
    )
}

export default ListPage
