import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Toast from './Toast'
import useToast from '../hooks/toast'

const BlogForm = ({ editing }) => {
    // 생성한 커스텀훅은 기존 훅 사용하듯이 사용
    // 이름은 사용자 맘대로 정해도 되지만 순서는 지켜야한다.
    // useRef, useState로 관리한 toasts, setToastsRerender은 삭제한다.
    // 기존 addToasts, deleteToasts도 삭제하고 useToasts것을 사용한다.
    const [toasts, addToast, deleteToast] = useToast()
    const [title, setTitle] = useState('')
    const [originalTitle, setOriginalTitle] = useState('')
    const [body, setBody] = useState('')
    const [originalBody, setOriginalBody] = useState('')
    const [publish, setPublish] = useState(false)
    const [originalPublish, setOriginalPublish] = useState('')
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
        setTitleError(false)
        setBodyError(false)
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
                        addToast({
                            type: 'success',
                            text: 'successfully toast',
                        })
                        // navigate('/admin')
                    })
            }
        }
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked)
    }

    return (
        <div>
            {/* 생성된 커스텀 훅 toasts.jsx에서 toasts.current를 그대로 받고있기 때문에
            toasts로 데이터를 가져온다. */}
            <Toast toasts={toasts} deleteToast={(id) => deleteToast(id)} />
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
