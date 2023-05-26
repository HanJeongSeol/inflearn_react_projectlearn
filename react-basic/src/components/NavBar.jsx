import { Link, NavLink } from "react-router-dom"
const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* NavBar에 연결된 페이지가 아닐 시 활성화 되지 않도록(회색으로 보이도록) 하기 위해서 NavLink 사용
                        이후 activeclassname 속성을 추가하여 active값 지정. 기존 className의 active는 삭제  */}
                        <NavLink activeclassname="active" className="nav-link" aria-current="page" to="/blogs">
                            Blogs
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
