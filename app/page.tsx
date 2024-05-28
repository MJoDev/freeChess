import ChessBoard from "./components/ChessBoard/ChessBoard"
import './app.css'

export default function HomePage(){
    return (<div className="app">
        <h1>FreeChess.com</h1>
        <ChessBoard></ChessBoard>
    </div>)
}