import React, {Component} from 'react';
import './App.css';
import {_FETCH_URL, _FETCH_BIGIMAGE, _DATABASE_PUT} from './fetch/fetch'
import Img from "./Img/img";
import {ModalRender} from "./Modal/Modal";
import {_COMMENT, _COMMENT_NAME, _ALBUM, _APP_HEADER, _HEADER_TEXT,
    _CONTAINER, _COMMENT_INPUT, _NAME_PLACEHOLDER, _COMMENT_PLACEHOLDER
} from './Const/Const'
import {Loader} from "./Loader"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoadedFull: false,
            items: [],
            item: [],
            comments: [],
            input: [
                { type: 'text',
                    id: _COMMENT_NAME,
                    placeholder: _NAME_PLACEHOLDER,
                    className: _COMMENT_INPUT,
                    errorMessage: "Введите имя",
                    onChange: this.Validation.bind(this, '[А-Яа-яЁё]{1,}', _COMMENT_NAME),
                    color: '#282c34'
                },
                { type: 'text',
                    id: _COMMENT,
                    placeholder: _COMMENT_PLACEHOLDER,
                    className: _COMMENT_INPUT,
                    errorMessage: "Введите корректный комментарий",
                    onChange: this.Validation.bind(this, '[А-Яа-яЁё\\s]{3}', _COMMENT),
                    color: '#282c34'
                }
            ],
            Disabler: 'disabled'
        }
    }
    componentWillMount() {
        fetch(_FETCH_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
        )
    }

    Validation  (Valid, id) {
        let Str = document.getElementById(id)
        let Match = Str.value.match(Valid)
        let label = Str.previousSibling
        let input1 = document.getElementById(_COMMENT_NAME).value
        let input2 = document.getElementById(_COMMENT).value
        if (Match === null) {
            this.setState({
                Disabler: 'disabled'
            })
            label.style.color = '#b30707'
            Str.className = _COMMENT_INPUT +' false'
            return false
        }
        else
        {
            label.style.color = '#282c34'
            Str.className = _COMMENT_INPUT
            if (input1.length>=3 && input2.length>=3) {
            this.setState({
                Disabler: ''
            })}
            return true
        }
    }

    getFullImage = (id) => {
        fetch(_FETCH_BIGIMAGE+id+'.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoadedFull: true,
                        item: result.url,
                        id: result.id,
                        comments: result.comments
                    })
                },
                (error) => {
                    this.setState({
                        isLoadedFull: false,
                        error
                    });
                }
                )
    }

    ImageRender = (item) => item.map((i) => {
            return (
                <Img
                    key = {i.id}
                    id = {i.id}
                    src = {i.url}
                    className = {_ALBUM}
                    onClick = {this.getFullImage.bind(this, i.id)}
                />
            )

        })

    CloseHandler = () => {
        this.setState({
            item: [],
            isLoadedFull: false
        })
        document.getElementById('HeadText').style.display = 'block'
    }


    getValue(id, id2) {
        let idValue = document.getElementById(id).value
        let id2Value = document.getElementById(id2).value
        return idValue + ': '+ id2Value
    }

    AddComment = (event) => {
        event.preventDefault()
        let comments = this.state.comments
        let id = this.state.id
        let ImgUrl = this.state.item
        let value = {text: this.getValue(_COMMENT_NAME, _COMMENT),
                     id: id+1,
                     date:  Date.now()}
          this.state.comments === undefined ? comments =  [value] :  comments.push(value)
            async function postData () {
            const url = _DATABASE_PUT+`${id}.json`
            const data =  {comments: comments,
                           id: id,
                           url: ImgUrl}
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
                console.log('Успех:', JSON.stringify(json))
            } catch (error) {
                console.error('Ошибка:', error)
            }
        }
        postData()
            document.getElementById(_COMMENT_NAME).value = ''
            document.getElementById(_COMMENT).value =''
        return this.setState({
            comments: comments
        })
    }

    render() {
        return (
            <div className="App">
                <header className={_APP_HEADER}>
                    <p id={_HEADER_TEXT}>TEST APP</p>
                    {this.state.isLoaded === false? Loader('Loader') : null}
                    <div id={_CONTAINER}>
                    {this.state.item.length !== 0 ?
                        ModalRender(this.state, this.AddComment.bind(), this.CloseHandler.bind(this)):
                        this.ImageRender(this.state.items) }
                    </div>
                </header>
            </div>
        )
    }

}

export default App;
