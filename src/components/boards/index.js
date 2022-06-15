import React, { useEffect, useState } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardData, getBoardName, getBoardId, isCreate, UpdateRedux } from "../actions/Actions";
import { fetchBoardData, createBoard } from "../urls/FetchApi";
import axios from "axios";
import { Button, div, Input, Modal } from "antd";



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
                dispatch({ type: UpdateRedux })
                dispatch({ type: getBoardName, payload: '' })

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

    console.log('boarddta', updateRedux, boardData);
    return (

        <div className="board">
            {/* <Modal title={'Add name of Board'} onCancel={()=>setShow('flex')} visible={show=='none'? true : false }>
            <Input type={'text'}></Input>
            <Input type={'text'}></Input>
            </Modal> */}
            {boardData.map((currBoard) => {

                return (
                    <Link className="links" key={currBoard.id} to={'/board'} onClick={() => {
                        dispatch({ type: getBoardId, payload: currBoard.id })
                        localStorage.setItem('boardId',currBoard.id)

                    }}>< div key={currBoard.id} className="BoardContainer">
                        <h4>{currBoard.name}</h4>
                        </div>
                    </Link>
                )
            })
            }

            <div className="newBoard">

                <input type={'text'} className='inputName' placeholder='Name of board' onChange={(e) => dispatch({ type: getBoardName, payload: e.target.value })}></input>
                <button onClick={() => boardData.length <= 10 && boardName !== '' ? boardCreate() : alert('You have excceded limit of boards')}>create new board</button>
                <p>remaining boards {10 - boardData.length}</p>

            </div>


        </div>
    )
}