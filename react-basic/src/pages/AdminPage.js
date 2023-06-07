import { Link } from "react-router-dom"
import BlogList from "../components/BlogList.jsx"

const AdminPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Admin</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            {/* isAdmin porps값을 true로 넘겨준다 */}
            <BlogList isAdmin={true} />
        </div>
    )
}

export default AdminPage
