import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BlogForm = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // useNavigate로 페이지 이동
    const navigate = useNavigate()

    // create에 성공하면 List페이지로 이동되도록 설정. then 사용
    const onSubmit = () => {
        axios
            .post("http://localhost:3001/posts", {
                title: title,
                body,
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
