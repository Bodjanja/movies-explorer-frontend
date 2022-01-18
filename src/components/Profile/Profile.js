import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import PopupHeader from "../PopupHeader/PopupHeader";

export default function Profile(props) {

    const [validName, setValidname] =React.useState(false);
    const [name, setName] =React.useState('');
    const [validEmail, setValidEmail] =React.useState(false);
    const [email, setEmail] =React.useState('');

    const changeName=(e) => {
        setName(e.target.value);
        if (name.length<1) {setValidname(true) } else {setValidname(false)}
        };

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (email.length<1) {setValidEmail(true)} else {setValidEmail(false)}
        };    

    return(
        <div className="profile">
            <Header menuOpener={props.menuOpener} />
            <div className="profile__container">
                <div className="profile__section">
                    <h1 className="profile__title">Привет, !</h1>
                    <div className="profile__subcontainer">
                        <p className="profile__data">Имя</p>
                        <input className={`register__inputs ${name.length<2 ? "register__inputs_error":""} profile__data profile__data_align`} style={{borderBottom: "none"}} value={name || ""} onChange={changeName} type="text" required id="name" name="name" placeholder="Виталий" />
                        {validName ?  <div className="register__error profile__input-error">Что-то пошло не так...</div> :""}
                        <div className="profile__separator"></div>
                        <p className="profile__data">Email</p>
                        <input className={`register__inputs ${email.length<2 ? "register__inputs_error":""} profile__data profile__data_align`} value={email || ""} style={{borderBottom: "none"}} onChange={changeEmail} type="email" required id="email" name="email" placeholder="pochta@pochta.ru" />
                        {validEmail ?  <div  className="register__error profile__input-error">Что-то пошло не так...</div> :""}
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <button className="profile__button profile__edit-button">Редактировать</button>
                    <button className="profile__button profile__logout-button">Выйти из аккаунта</button>
                </div>
            </div>
            <PopupHeader menuOpen={props.menuOpen} menuCloser={props.menuCloser} />
        </div>
    )
}