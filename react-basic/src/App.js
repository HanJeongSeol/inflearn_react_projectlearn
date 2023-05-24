import { useState } from "react"

function App() {
    // [state, 함수]= useState(state 초기값))
    const [number, setNumber] = useState(1)

    const double = () => {
        const doubleNumber = number * 2
        setNumber((prevState) => prevState * 2)
        setNumber((prevState) => prevState * 2)
    }
    return (
        <>
            <div>{number}</div>
            <button className="btn btn-primary" onClick={double}>
                submit
            </button>
        </>
    )
}
export default App
