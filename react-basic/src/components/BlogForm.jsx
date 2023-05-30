import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"

// BlogForm 컴포넌트가 create, edit 두 페이지에서 사용되고 있다.
// bool 타입 데이터를 받는 edting을 매개변수로 설정해서 분기를 설정한다.
const BlogForm = ({ edting }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // url에서 id 파라미터를 가져온다
    const { id } = useParams()

    const navigate = useNavigate()

    // Edit으로 들어오는 경우 label, input에 db에 저장되어 있는 데이터가 작성되어 있어야 한다.
    // useEffect를 사용해서 데이터를 불러온다.
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            // title, body값 가져온다
            setTitle(res.data.title)
            setBody(res.data.body)
        })
    }, [id])
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
            {/* 삼항연산자로 edting 값에 따라서 다르게 출력되도록 한다. */}
            <h1>{edting ? "Edit" : "Create"} a blog post</h1>
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
                {/* 버튼 이름 변경 */}
                {edting ? "Edit" : "Post"}
            </button>
        </div>
    )
}

BlogForm.propTypes = {
    edting: PropTypes.bool,
}

BlogForm.defaultProps = {
    edting: false,
}
export default BlogForm
