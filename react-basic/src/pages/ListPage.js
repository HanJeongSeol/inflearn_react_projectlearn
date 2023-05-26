import axios from "axios"
import { useState, useEffect } from "react"

// 23_db에 저장된 데이터를 가져오기 위해서 axios.get 사용
// 요청 보낸 후 바로 사용하고 싶으면 .then 사용
const ListPage = () => {
    // getPosts 함수가 실행되면 axios로 서버에서 데이터를 가져온다
    // 이후 setPosts가 실행되면서 posts가 업데이트 된다.
    // posts가 업데이트 되면서 페이지는 다시 리렌더링 된다.
    // 리렌더링 하면 getPosts를 다시 호출하고 다시 리렌더링되기 때문에 무한반복이 발생된다
    // 이를 해결하기 위해서 useEffect를 사용한다.
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data)
        })
    }

    // 두 번째 배열이 빈 배열이면 컴포넌트가 맨 처음 화면에 렌더링 될 때 실행
    // 값이 존재할 시 배열 안의 값이 바뀔 때만 실행
    useEffect(() => {
        getPosts()
    }, [])
    return <div>ListPage</div>
}

export default ListPage
