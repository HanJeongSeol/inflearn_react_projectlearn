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
                    // 카드 클릭 시 수정 페이지로 이동.
                    // 여기에 onClick 이벤트를 설정할 수 없으니 component 생성 파일에서 onClick 이벤트를 추가해야한다. -> Card.jsx
                    // 테스트로 console창에 'test'를 출력하는 함수를 전달해보자.
                    // useNavigate를 사용해서 card 클릭 시 수정페이지로 이동시킬 수 있다.
                    <Card key={post.id} title={post.title} onClick={() => navigate("/blogs/edit")}>
                        <button>button</button>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListPage
