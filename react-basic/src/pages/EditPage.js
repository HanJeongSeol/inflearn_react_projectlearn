import BlogForm from "../components/BlogForm"
// 수정 페이지 -> CreatePage에서 사용한 BlogForm 컴포넌트 그대로 사용
const EditPage = () => {
    return (
        <div>
            {/* BlogForm 컴포넌트에 edting 데이터 전달 */}
            <BlogForm edting={true} />
        </div>
    )
}

export default EditPage
