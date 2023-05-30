import { Link } from "react-router-dom"
import BlogList from "../components/BlogList.jsx"

// 공개, 비공개 모든 게시물을 확인할 수 있는 AdminPage
const AdminPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Admin</h1>
                {/* admin에서만 생성할 수 있게 List 페이지에서는 create 버튼 삭제 */}
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            <BlogList />
        </div>
    )
}

export default AdminPage
