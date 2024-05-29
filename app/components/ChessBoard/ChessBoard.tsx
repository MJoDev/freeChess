import React from "react";
import './Chessboard.css';
import Tile from '../Tile/Tile'

interface Piece{
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

for(let i = 0; i < 8; i++){
    pieces.push({image: 'icons/BlackPawn.png', x:i, y:6});
}
for(let i = 0; i < 8; i++){
    pieces.push({image: 'icons/WhitePawn.png', x:i, y:1});
}

pieces.push({image: 'icons/BlackRook.png', x:0, y:7})
pieces.push({image: 'icons/BlackRook.png', x:7, y:7})
pieces.push({image: 'icons/WhiteRook.png', x:0, y:0})
pieces.push({image: 'icons/WhiteRook.png', x:7, y:0})

pieces.push({image: 'icons/BlackKnight.png', x:1, y:7})
pieces.push({image: 'icons/BlackKnight.png', x:6, y:7})
pieces.push({image: 'icons/WhiteKnight.png', x:1, y:0})
pieces.push({image: 'icons/WhiteKnight.png', x:6, y:0})

pieces.push({image: 'icons/BlackBishop.png', x:2, y:7})
pieces.push({image: 'icons/BlackBishop.png', x:5, y:7})
pieces.push({image: 'icons/WhiteBishop.png', x:2, y:0})
pieces.push({image: 'icons/WhiteBishop.png', x:5, y:0})

pieces.push({image: 'icons/BlackKing.png', x:4, y:7})
pieces.push({image: 'icons/WhiteKing.png', x:3, y:0})

pieces.push({image: 'icons/BlackQueen.png', x:3, y:7})
pieces.push({image: 'icons/WhiteQueen.png', x:4, y:0})



export default function ChessBoard(){

    let board = [];

    for(let i = verticalAxis.length - 1; i >= 0; i--){

        for(let j = 0; j<horizontalAxis.length; j++){
            let image = undefined;
            const number = j + i;

            pieces.forEach(p => {
                if(p.x === j && p.y === i){
                    image = p.image;
                }
            });

            board.push(<Tile number={number} image={image}/>)
           
        }
    }

    return (<div id="chessboard">{board}</div>)
}