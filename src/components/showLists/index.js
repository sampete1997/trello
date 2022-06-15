import React, { useEffect, useState } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardListData, getListName, UpdateRedux, getListId } from "../actions/Actions";
import { createBoard, fetchListData, createList, deleteList } from "../urls/FetchApi";
import { Card, Input, Modal } from "antd";
import "antd/dist/antd.css";



export default function ShowList() {

    const dispatch = useDispatch()
    const boardId = localStorage.getItem('boardId')
    const listName = useSelector((state) => state.list.listName)
    const listId = useSelector((state) => state.list.listId)

    const updateRedux = useSelector((state) => state.board.updateRedux)

    const boardListData = useSelector((state) => state.board.boardListData)
    const [popup, SetPopup] = useState(false)

console.log('redux state',updateRedux);
    function createNewList() {

        console.log('listname', listName);

        createList(boardId, listName)
            .then((res) => res)
            .then(() => dispatch({ type: UpdateRedux }))
            .catch(err => console.log('err:', err))

        SetPopup(false)
    }


    function deleteOldList() {

        console.log('listid', listId);

        deleteList(listId)
            .then((res) => res)
            .then(() => dispatch({ type: UpdateRedux }))
            .catch(err => console.log('err:', err))
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
                // console.log('getBoardListData', fetchListData);
                // console.log('id', boardId);

            })
            .catch((e) => console.log('err', e))
    }, [updateRedux])


    

    console.log('boardlisttdta', boardListData);
    return (
        <div className="board">
            {boardListData.map((currList) => {

                return (
                    < div key={currList.id} className="ListContainer" >
                        <div className="listnamediv"><p>{currList.name}</p>
                            <button onClick={() => {
                                dispatch({ type: getListId, payload: currList.id })
                                // while (true) {
                                    if (listId != '') {
                                        // alert('you will delete ' + currList.name)
                                        
                                        deleteOldList()
                                        // break
                                    }
                                // }
                            }}>❌</button>
                        </div>


                    </div>

                )
            })


            }

            <Modal title={'Add name of list'} visible={popup} onOk={() => createNewList()} onCancel={() => cancel()}>

                <Input placeholder="&nbsp;Name Of List" onChange={(e) =>
                    dispatch({ type: getListName, payload: e.target.value })}>
                </Input>
            </Modal>
            <div className="addList" onClick={() => open()}>
                ➕<p>Add New List</p>
            </div>
        </div>
    )
}