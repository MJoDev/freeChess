
import '../app.css'
import ChessBoard from '../components/ChessBoard/ChessBoard'


export default function HomePage(){
    return (<div className="app">
        <h1>FreeChess.com</h1>
        <ChessBoard></ChessBoard>
    </div>)
}