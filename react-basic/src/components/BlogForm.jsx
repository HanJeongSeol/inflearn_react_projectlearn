import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogForm = ({ editing }) => {
    const [title, setTitle] = useState('')
    const [originalTitle, setOriginalTitle] = useState('')
    const [body, setBody] = useState('')
    const [originalBody, setOriginalBody] = useState('')
    const [publish, setPublish] = useState(false)
    const [originalPublish, setOriginalPublish] = useState('')
    // true일 경우 -> form에 데이터를 입력하지 않은 경우 에러 메시지와 빨간색 테두리로 변경
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
                setTitle(res.data.title)
                setOriginalTitle(res.data.title)
                setBody(res.data.body)
                setOriginalBody(res.data.body)
                setPublish(res.data.publish)
                setOriginalPublish(res.data.publish)
            })
        }
    }, [id, editing])

    const isEdited = () => {
        return (
            title !== originalTitle ||
            body !== originalBody ||
            publish !== originalPublish
        )
    }

    const goBack = () => {
        if (editing) {
            navigate(`/blogs/${id}`)
        } else {
            navigate(`/blogs`)
        }
    }
    // title, body form 체크해서 비어있는 경우 titleError, bodyError을 true로 변경
    // 반환되는 validated 값이 하나라도 false라면 다시 유효성 검사 진행되도록 한다.
    const validateForm = () => {
        let validated = true
        if (title === '') {
            setTitleError(true)
            validated = false
        }
        if (body === '') {
            setBodyError(true)
            validated = false
        }

        return validated
    }

    const onSubmit = () => {
        // 다시 false로 초기화를 진행해서 다음 
        setTitleError(false)
        setBodyError(false)
        // 유효성 검사가 진행 되었을 때 post 작성이 완료되도록 한다.
        if (validateForm()) {
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
                    .post('http://localhost:3001/posts', {
                        title: title,
                        body,
                        createdAt: Date.now(),
                        publish,
                    })
                    .then(() => {
                        navigate('/admin')
                    })
            }
        }
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked)
    }

    return (
        <div>
            <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className={`form-control ${
                        titleError ? 'border-danger' : ''
                    }`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                {titleError && (
                    <div className="text-danger">Title is required.</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className={`form-control ${
                        bodyError ? 'border-danger' : ''
                    }`}
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value)
                    }}
                />
                {bodyError && (
                    <div className="text-danger">Body is required.</div>
                )}
            </div>

            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    onChange={onChangePublish}
                ></input>
                <label className="form-check-label"> publish </label>
            </div>

            <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={editing && !isEdited()}
            >
                {editing ? 'Edit' : 'Post'}
            </button>
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
