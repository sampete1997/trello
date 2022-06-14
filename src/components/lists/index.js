import React, { useEffect } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import boardAction from "../actions/boardAction";
import axios from "axios";
import { getBoardUrl } from "../urls/FetchApi";
const { getBoardData } = boardAction
export default function Board() {

    const dispatch = useDispatch()
    const boardData = useSelector((state) => state.board.boardData)


    useEffect(() => {

        axios.get(getBoardUrl)
            .then(res => res.data)
            .then((fetchedData) => {
               
               dispatch({ type: getBoardData, payload: fetchedData })
    
            })
            .catch((e) => console.log('err', e))
    },[])

    console.log('boarddta', boardData);
    return (
        <div className="board">
            {boardData.map((currBoard) => {
                return (
                    < div key={currBoard.id} className="appContainer">

                        <p>{currBoard.name}</p>

                    </div>
                )
            })
            }
        </div>
    )
}