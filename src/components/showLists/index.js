import React, { useEffect, useState } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardListData, getListName, UpdateRedux } from "../actions/Actions";
import { createBoard, fetchListData, createList } from "../urls/FetchApi";
import { Card, Input, Modal } from "antd";
import "antd/dist/antd.css";



export default function ShowList() {

    const dispatch = useDispatch()
    const boardId = localStorage.getItem('boardId')
    const listName = useSelector((state) => state.list.listName)
    const updateRedux = useSelector((state) => state.board.updateRedux)

    const boardListData = useSelector((state) => state.board.boardListData)
    const [popup, SetPopup] = useState(false)


    function createNewList() {

        console.log('listname',listName);

        createList(boardId, listName)
            .then((res) =>res)
            .then(()=>dispatch({ type: UpdateRedux}))
            .catch(err=>console.log('err:',err))

        SetPopup(false)
    }

    function cancel() {
        return SetPopup(false)
    }

    function open() {

        return SetPopup(true)
    }

    useEffect(() => {

        fetchListData(boardId)
            .then(res => res.data)
            .then((fetchedData) => {

                dispatch({ type: getBoardListData, payload: fetchedData })
                console.log('getBoardListData', fetchListData);
                console.log('id', boardId);

            })
            .catch((e) => console.log('err', e))
    }, [updateRedux])

    console.log('boardlisttdta', boardListData);
    return (
        <div className="board">
            {boardListData.map((currBoard) => {

                return (
                    <Link key={currBoard.id} to={'/card'} onClick={() => {

                    }}>< div key={currBoard.id} className="ListContainer" >
                            <p>{currBoard.name}</p>
                        </div>
                    </Link>
                )
            })


            }

            <Modal title={'Add name of list'} visible={popup} onOk={() => createNewList()} onCancel={() => cancel()}>
                Name Of List
                <Input placeholder="Name Of List" onChange={(e) =>
                    dispatch({ type: getListName, payload: e.target.value })}>
                </Input>
            </Modal>
            <div className="addList" onClick={() => open()}>
                ➕<p>Add New List</p>
            </div>
        </div>
    )
}