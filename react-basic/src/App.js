import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// BlogFrom 컴포넌트는 CreatePage에서 보여주기 때문에 삭제
import NavBar from "./components/NavBar"
// 페이지 컴포넌트 import
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import ListPage from "./pages/ListPage"

function App() {
    return (
        <Router>
            <NavBar />
            <div class="container">
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/blogs" element={<ListPage />}></Route>
                    {/* 페이지 추가 */}
                    <Route path="/blogs/create" element={<CreatePage />}></Route>
                    <Route path="/blogs/edit" element={<EditPage />}></Route>
                </Routes>
            </div>
        </Router>
    )
}
export default App
