'use client';

import React, { useRef } from "react";
import './Chessboard.css';
import Tile from '../Tile/Tile'

interface Piece{
    image: string;
    x: number;
    y: number;
}

let activePiece: HTMLElement | null = null;


const pieces: Piece[] = [];

for(let p = 0; p<2; p++){
    const type = (p === 0) ? "Black" : "White";
    const y = (p === 0) ? 7 : 0;

    pieces.push({image: `icons/${type}Rook.png`, x:0, y})
    pieces.push({image: `icons/${type}Rook.png`, x:7, y})
    pieces.push({image: `icons/${type}Knight.png`, x:1, y})
    pieces.push({image: `icons/${type}Knight.png`, x:6, y})
    pieces.push({image: `icons/${type}Bishop.png`, x:2, y})
    pieces.push({image: `icons/${type}Bishop.png`, x:5, y})
    pieces.push({image: `icons/${type}King.png`, x:4, y})
    pieces.push({image: `icons/${type}Queen.png`, x:3, y})
}

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

for(let i = 0; i < 8; i++){
    pieces.push({image: 'icons/BlackPawn.png', x:i, y:6});
}
for(let i = 0; i < 8; i++){
    pieces.push({image: 'icons/WhitePawn.png', x:i, y:1});
}

export default function ChessBoard(){

    const chessBoardRef = useRef<HTMLDivElement>(null);

    let board = [];

    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
    
        if(element.classList.contains("chess-piece")){
    
            const x = e.clientX -35;
            const y = e.clientY -35;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
    
            activePiece = element;
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
        if(activePiece){
            activePiece = null;
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