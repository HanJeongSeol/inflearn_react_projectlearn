import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"

// route 배열을 컴포넌트로 만들어서 사용
import routes from "./routes"

function App() {
    return (
        <Router>
            <NavBar />
            <div className="container">
                <Routes>
                    {/* React에서 map을 사용할 시 고유 key를 지정해줘야 한다. path는 해당 path의 유일한 고유값이기 때문아 key로 지정해준다. */}
                    {routes.map((route) => {
                        return <Route key={route.path} path={route.path} element={route.component}></Route>
                    })}
                </Routes>
            </div>
        </Router>
    )
}
export default App
