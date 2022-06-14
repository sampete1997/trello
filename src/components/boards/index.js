import React, { useEffect, useState } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardData, getBoardName, getBoardId, isCreate, UpdateRedux } from "../actions/boardAction";
import { fetchBoardData, createBoard } from "../urls/FetchApi";
import axios from "axios";
import { Button, Card, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";



export default function Board() {

    const dispatch = useDispatch()
    const boardData = useSelector((state) => state.board.boardData)
    const boardId = useSelector((state) => state.board.boardId)
    const boardName = useSelector((state) => state.board.boardName)
    const updateRedux = useSelector((state) => state.board.updateRedux)
    // const navigate = useNavigate();
    function boardCreate() {

        createBoard(boardName)
            .then(res => dispatch({ type: UpdateRedux })
            )
            .then(() => {

                alert('created new board ' + boardName)
                dispatch({ type: UpdateRedux})

            })
            .catch(er => console.log('err', er))


    }

    useEffect(() => {

        fetchBoardData()
            .then(res => res.data)
            .then((fetchedData) => {

                dispatch({ type: getBoardData, payload: fetchedData })

            })
            .catch((e) => console.log('err', e))

    }, [updateRedux])

    console.log('boarddta', updateRedux, boardData,);
    return (

        <div className="board">
            {/* <Modal title={'Add name of Board'} onCancel={()=>setShow('flex')} visible={show=='none'? true : false }>
            <Input type={'text'}></Input>
            <Input type={'text'}></Input>
            </Modal> */}
            {boardData.map((currBoard) => {

                return (
                    <Link key={currBoard.id} to={'/board'} onClick={() => {
                        dispatch({ type: getBoardId, payload: currBoard.id })

                    }}>< Card title={currBoard.name} key={currBoard.id} className="BoardContainer">

                        </Card>
                    </Link>


                )
            })
            }

            <Card className="newBoard">

                <input type={'text'} className='inputName' placeholder='Name of board' onChange={(e) => dispatch({ type: getBoardName, payload: e.target.value })}></input>
                <button onClick={() => boardCreate()}>create new board</button>
            </Card>

        </div>
    )
}