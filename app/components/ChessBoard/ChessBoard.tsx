'use client';

import React, { useEffect, useRef, useState } from "react";
import './Chessboard.css';
import Tile from '../Tile/Tile'
import Referee from "@/app/referee/Referee";'../../referee/Referee';

interface Piece{
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
}

let activePiece: HTMLElement | null = null;

export enum TeamType{
    BLACK,
    WHITE
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    KING,
    QUEEN,
    ROOK,
}

const pieces: Piece[] = [];

const initialBoardState: Piece[] = []

for(let i = 0; i < 8; i++){
    initialBoardState.push({image: 'icons/BlackPawn.png', x:i, y:6, type: PieceType.PAWN, team: TeamType.BLACK});
}
for(let i = 0; i < 8; i++){
    initialBoardState.push({image: 'icons/WhitePawn.png', x:i, y:1, type: PieceType.PAWN, team: TeamType.WHITE});
}
for(let p = 0; p<2; p++){
    const teamType = (p === 0) ? TeamType.BLACK : TeamType.WHITE;
    const type = (teamType === TeamType.BLACK) ? "Black" : "White";
    const y = (teamType === TeamType.BLACK) ? 7 : 0;

    initialBoardState.push({image: `icons/${type}Rook.png`, x:0, y, type: PieceType.ROOK, team: teamType})
    initialBoardState.push({image: `icons/${type}Rook.png`, x:7, y, type: PieceType.ROOK, team: teamType})
    initialBoardState.push({image: `icons/${type}Knight.png`, x:1, y, type: PieceType.KNIGHT, team: teamType})
    initialBoardState.push({image: `icons/${type}Knight.png`, x:6, y, type: PieceType.KNIGHT, team: teamType})
    initialBoardState.push({image: `icons/${type}Bishop.png`, x:2, y, type: PieceType.BISHOP, team: teamType})
    initialBoardState.push({image: `icons/${type}Bishop.png`, x:5, y, type: PieceType.BISHOP, team: teamType})
    initialBoardState.push({image: `icons/${type}King.png`, x:4, y, type: PieceType.KING, team: teamType})
    initialBoardState.push({image: `icons/${type}Queen.png`, x:3, y, type: PieceType.QUEEN, team: teamType})
}

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export default function ChessBoard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const chessBoardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const referee = new Referee();

    useEffect(() => {
       
    })

    let board = [];

    function grabPiece(e: React.MouseEvent){
        const chessboard = chessBoardRef.current;
        const element = e.target as HTMLElement;
    
        if(element.classList.contains("chess-piece") && chessboard){
            
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 75));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -600) / 75)))
            const x = e.clientX -35;
            const y = e.clientY -35;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
    
            setActivePiece(element)
        }
    
    }
    function movePiece(e: React.MouseEvent) {
        
        const chessboard = chessBoardRef.current;

        if(activePiece && chessboard){

            const minX = chessboard.offsetLeft -20;
            const minY = chessboard.offsetTop -12;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -50;
            const maxY = chessboard.offsetTop + chessboard.clientHeight -55;
            const x = e.clientX -35;
            const y = e.clientY -35;
            activePiece.style.position = 'absolute';
            
            if(x < minX){
                activePiece.style.left = `${minX}px`;
            }else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }else{
                activePiece.style.left = `${x}px`;
            }

            if(y < minY){
                activePiece.style.top = `${minY}px`;
            }else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            }else{
                activePiece.style.top = `${y}px`;
            }

        }
    }
    function dropPiece(e: React.MouseEvent){

        const chessboard = chessBoardRef.current;

        if(activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -600) / 75))
            
            
            setPieces(value => {
                
                const pieces = value.map(p=>{
                    if(p.x === gridX && p.y=== gridY){
                        const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team)

                        if(validMove){
                            p.x = x;
                            p.y = y;
                        }else{
                            activePiece.style.position = "relative";
                            activePiece.style.removeProperty("left")
                            activePiece.style.removeProperty("top")

                        }
                        

                    }
                    return p;
                })
                return pieces;
            })
            setActivePiece(null)
        }
    }

    for(let i = verticalAxis.length - 1; i >= 0; i--){

        for(let j = 0; j<horizontalAxis.length; j++){
            let image = undefined;
            const number = j + i;

            pieces.forEach(p => {
                if(p.x === j && p.y === i){
                    image = p.image;
                }
            });

            board.push(<Tile key={verticalAxis[i] + horizontalAxis[j]}  number={number} image={image}/>)
           
        }
    }

    return (<>
    <div 
    onMouseMove={(e) => movePiece(e)}
    onMouseDown={(e) => grabPiece(e)} 
    onMouseUp={(e) => dropPiece(e)}
    ref={chessBoardRef}
    id="chessboard">{board}</div></>)
}