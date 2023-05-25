import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogForm from "./components/BlogForm"
import NavBar from "./components/NavBar"

function App() {
    return (
        <Router>
            <NavBar />
            <div class="container">
                <Routes>
                    <Route path="/" element={<div>Home Page</div>}></Route>
                    <Route path="/blogs" element={<BlogForm />}></Route>
                </Routes>
            </div>
        </Router>
    )
}
export default App
