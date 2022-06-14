import React, { useEffect } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardListData, getBoardId } from "../actions/boardAction";
import { fetchListData } from "../urls/FetchApi";
import { Card} from "antd";



export default function ShowList() {

    const dispatch = useDispatch()
    const boardId = useSelector((state) => state.board.boardId)
    const boardListData = useSelector((state) => state.board.boardListData)


    useEffect(() => {

        fetchListData(boardId)
            .then(res => res.data)
            .then((fetchedData) => {

                dispatch({ type: getBoardListData, payload: fetchedData })
                console.log('getBoardListData',fetchListData);
                console.log('id',boardId);

            })
            .catch((e) => console.log('err', e))
    }, [])

    console.log('boardlisttdta', boardListData);
    return (
        <div className="board">
            {boardListData.map((currBoard) => {

                return (
                    <Link key={currBoard.id} to={'/card'} onClick={() => {
                        // dispatch({ type: getBoardId, payload: currBoard.id })

                    }}>< Card title={currBoard.name}  key={currBoard.id} className="ListContainer" >

                        </Card>
                    </Link>
                )
            })
            }
        </div>
    )
}