import { useParams } from "react-router-dom"

const ShowPage = () => {
    // parameter 값을 가져와서 id에 저장
    const { id } = useParams()
    console.log(id)
    return <div>ShowPage</div>
}

export default ShowPage
