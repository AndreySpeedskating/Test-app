import React from "react";
import Img from "../Img/img";
import {INPUT} from "./input/input";
import {Comments} from './Comments/comments'
import {_MODAL_DIV, _SUBMIT_COMMENT, _BUTTON_ID, _CLOSE_ID, _MODAL_IMG} from '../Const/Const'


const ModalRender = (item, Submit, Close) => {

    return (
        <div id={_MODAL_DIV}>
            <button id={_CLOSE_ID} onClick={Close}>{'Назад'}</button>
            <Img
                key = {item.id}
                id = {item.id}
                src = {item.item}
                className = {_MODAL_IMG}
            />
            {Comments(item)}
            {INPUT(item.input)}
            <button id={_BUTTON_ID} disabled={item.Disabler} onClick={Submit}>{_SUBMIT_COMMENT}</button>
        </div>
    )
}

export  {ModalRender};