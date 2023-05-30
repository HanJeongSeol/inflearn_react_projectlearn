import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"

// route 배열을 컴포넌트로 만들어서 사용
import routes from "./routes"

function App() {
    return (
        <Router>
            <NavBar />
            <div className="container mt-3">
                <Routes>
                    {routes.map((route) => {
                        return <Route key={route.path} path={route.path} element={route.component}></Route>
                    })}
                </Routes>
            </div>
        </Router>
    )
}
export default App
