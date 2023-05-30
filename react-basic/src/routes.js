import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import ListPage from "./pages/ListPage"
import ShowPage from "./pages/ShowPage"

// App.js의 가독성을 위해 path와 component 값을 갖는 객체를 생성한 후 하나의 배열에 넣어서 사용한다.
const routes = [
    {
        path: "/",
        component: <HomePage />,
    },
    {
        path: "/blogs",
        component: <ListPage />,
    },

    {
        path: "/blogs/create",
        component: <CreatePage />,
    },

    {
        path: "/blogs/edit",
        component: <EditPage />,
    },
    {
        path: "/blogs/:id",
        component: <ShowPage />,
    },
]

export default routes
