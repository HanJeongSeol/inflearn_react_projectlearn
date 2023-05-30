import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import { Link } from "react-router-dom"
// react-router-dom@6 부터 useHistory -> useNavigate로 변경
import { useNavigate } from "react-router-dom"

const ListPage = () => {
    const navigate = useNavigate()

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
                        {/* 삭제 버튼 추가 */}
                        <div>
                            {/* 
                                onClick 이벤트로 console창에 메시지만 띄어주고 싶은데 EditPage로 불필요한 이동까지 해버림  
                                이벤트버블링 발생 -> 하위 컴포넌트에서 실행되면 상위 컴포넌트를 타고가면서 해당 컴포넌트의 onClick 이벤트를 발생시키는 현상.
                                <body><parent><chind></chind></parent></body> -> child, parent, body 순으로 실행(parent ,body는 실행시키지 않고싶음) 
                                따라서 Delete 버튼 클릭 시 상위 컴포넌트 <Card>의 onClick 이벤트도 실행된다.
                                event.stopPropagation() 메서드를 사용해서 상위 컴포넌트로 전달되지 않도록 한다.
                            */}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("delete")
                                }}
                            >
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
