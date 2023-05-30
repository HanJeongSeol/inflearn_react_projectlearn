import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"

// BlogForm 컴포넌트가 create, edit 두 페이지에서 사용되고 있다.
// bool 타입 데이터를 받는 editing을 매개변수로 설정해서 분기를 설정한다.
const BlogForm = ({ editing }) => {
    const [title, setTitle] = useState("")
    // 기존 데이터와 변경 데이터를 비교하기 위해 origanalTitle 생성
    const [originalTitle, setOriginalTitle] = useState("")
    const [body, setBody] = useState("")
    const [originalBody, setOriginalBody] = useState("")
    // post 공개 여부
    const [publish, setPublish] = useState(false)
    const [originalPublish, setOriginalPublish] = useState("")

    // url에서 id 파라미터를 가져온다
    const { id } = useParams()

    const navigate = useNavigate()

    // Edit으로 들어오는 경우 label, input에 db에 저장되어 있는 데이터가 작성되어 있어야 한다.
    // useEffect를 사용해서 데이터를 불러온다.
    useEffect(() => {
        // editing인 경우만 실행되도록 한다.
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
                // title, body값 가져온다
                setTitle(res.data.title)
                setOriginalTitle(res.data.title)
                setBody(res.data.body)
                setOriginalBody(res.data.body)
                setPublish(res.data.publish)
                setOriginalPublish(res.data.publish)
            })
        }
    }, [id, editing])
    // 변경된 데이터가 없을 때 버튼을 비활성 시키기 위한 메소드 둘 중 하나라도 변경된 값이 없으면 비활성화 시킨다.
    // 일치하지 않을 때 false 반한 -> 데이터가 변경되었다.
    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish
    }

    // Edit 페이지에서 cancel 버튼 클릭 시 post의 상세페이지로 이동.
    // Create 페이지에서 클릭 시 list 페이지로 이동
    const goBack = () => {
        if (editing) {
            navigate(`/blogs/${id}`)
        } else {
            navigate(`/blogs`)
        }
    }

    // 버튼 클릭 시 edit인 경우 axios.patch로 데이터가 update 되도록 한다.
    const onSubmit = () => {
        if (editing) {
            axios
                .patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish,
                })
                .then(() => {
                    navigate(`/blogs/${id}`)
                })
        } else {
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
    }

    // checkbox 버튼 활성화 시 true 비활성화시 false를 반환하도록 하는 함수
    // console.log(e.target.value)를 통해 콘솔창에 반환되는 값 확인
    const onChangePublish = (e) => {
        console.log(e.target.checked)
        // publish값 변경
        setPublish(e.target.checked)
    }

    return (
        <div>
            {/* 삼항연산자로 editing 값에 따라서 다르게 출력되도록 한다. */}
            <h1>{editing ? "Edit" : "Create"} a blog post</h1>
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

            {/* post 공개 여부 checkbox 설정 */}
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    // 클릭할 때 마다 버튼 이벤트 실행
                    onChange={onChangePublish}
                ></input>
                <label className="form-check-label"> publish </label>
            </div>

            {/* disabled가 true일 시 버튼이 비활성화 된다. isEdited()가 true인 경우 변경된 데이터가 없는 것이기 때문에 앞에 '!'를 붙인다.*/}
            <button className="btn btn-primary" onClick={onSubmit} disabled={editing && !isEdited()}>
                {/* 버튼 이름 변경 */}
                {editing ? "Edit" : "Post"}
            </button>
            {/* cancel 버튼 클릭 시 뒤로가도록 설정 */}
            <button className="btn btn-danger ms-2" onClick={goBack}>
                Cancel
            </button>
        </div>
    )
}

BlogForm.propTypes = {
    editing: PropTypes.bool,
}

BlogForm.defaultProps = {
    editing: false,
}
export default BlogForm
