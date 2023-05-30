import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BlogForm = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const navigate = useNavigate()
    // post 생성 시간 추가. js의 Data 함수 사용. timestamp 형태로 저장된다.
    const onSubmit = () => {
        axios
            .post("http://localhost:3001/posts", {
                title: title,
                body,
                createdAt: Date.now(),
            })
            .then(() => {
                navigate("/blogs")
            })
    }
    return (
        <div>
            <h1>Create a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className="form-control"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className="form-control"
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value)
                    }}
                />
            </div>

            <button className="btn btn-primary" onClick={onSubmit}>
                Post
            </button>
        </div>
    )
}

export default BlogForm
