import React from "react";
import {_COMMENT_OUTPUT} from "../../Const/Const";

let timestampToDate = (date) => {
    let d = new Date();
    d.setTime(date);
    return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}

export const Comments = (props) => {
    return (
        <div id={_COMMENT_OUTPUT}>{props.comments !== undefined ? props.comments.map((i) => {
            let CommentDate = i.date
            let Comment = i.text + ' ' + timestampToDate(CommentDate)
            return Comment + '\n'
        }): null}</div>
    )
}

