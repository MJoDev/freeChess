import { PieceType, TeamType } from "../components/ChessBoard/ChessBoard"

export default class Referee{
    isValidMove(px: number, py: number, x:number, y:number, type: PieceType, team: TeamType){
        console.log("Referee is cheking the move...")
        console.log(`Previus location: ${px}, ${py}`)
        console.log(`Next location: ${x}, ${y}`)
        console.log(`PieceType: ${type}`)
        console.log(`Team: ${team}`)


        if(type === PieceType.PAWN){
            if(team === TeamType.WHITE){
                if(py === 1){
                    if(px === x && (y - py === 1 || y -py === 2) ){
                        console.log("LEGAL MOVE")
                        return true;
                    }
                }else{
                    if(px === x && (y - py === 1)){
                        return true;
                    }
                }
            }else{
                if(py === 6){
                    if(px === x && (y - py === -1 || y -py === -2) ){
                        console.log("LEGAL MOVE")
                        return true;
                    }
                }else{
                    if(px === x && (y - py === -1) ){
                        console.log("LEGAL MOVE")
                        return true;
                    }
                }
            }
        }
        return false
    }
}