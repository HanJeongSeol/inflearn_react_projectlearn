import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

import routes from './routes'
// 페이지가 이동되더라도 Toast가 보이기 위해서 최상위 컴포는터인 App.js에서 사용한다
import Toast from './components/Toast'
import useToast from './hooks/toast'
import { useSelector } from 'react-redux'

function App() {
    const toasts = useSelector((state) => state.toast.toasts)
    const { deleteToast } = useToast()
    return (
        <Router>
            <NavBar />
            <Toast toasts={toasts} deleteToast={deleteToast} />
            <div className="container mt-3">
                <Routes>
                    {routes.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            ></Route>
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}
export default App
