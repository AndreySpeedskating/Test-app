import React from "react";
import Img from "../Img/img";
import {INPUT} from "./input/input";
import {Comments} from './Comments/comments'
import {_MODAL_DIV, _SUBMIT_COMMENT, _BUTTON_ID, _CLOSE_ID, _MODAL_IMG} from '../Const/Const'
import {Loader} from "../Loader";


const ModalRender = (item, Submit, Close) => {
     setTimeout(function() {
         document.getElementsByClassName(_MODAL_IMG)[0].style.display = 'block'
         document.getElementById('FullLoader').style.display = 'none'
     }, 500)
    document.getElementById('HeadText').style.display = 'none'
    return (
        <div id={_MODAL_DIV}>
            <button id={_CLOSE_ID} onClick={Close}>{'Назад'}</button>
            {Loader('FullLoader')}
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