import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

export default function Profile(props) {

    const [validName, setValidname] =React.useState(false);
    const [name, setName] =React.useState('');
    const [validEmail, setValidEmail] =React.useState(false);
    const [email, setEmail] =React.useState('');

    const [confirmationStatus, setConfirmationStatus] = React.useState(false)

    const currentUser = React.useContext(CurrentUserContext)

        React.useEffect(() => {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }, [])

    const changeName=(e) => {
        setName(e.target.value);
        if (name.length<1) {setValidname(true) } else {setValidname(false)}
        };

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (email.length<1) {setValidEmail(true)} else {setValidEmail(false)}
        };   
    
    function handleSignOut() {
        props.onSignOut();
    }

    function handleDataUpdate(e) {
        e.preventDefault();
        mainApi.updateUserData(name, email)
        .then((res) => {
            // console.log(res.data)
            props.onUpdateUser(res.data)
            setConfirmationStatus(true)
        })
    }

    return(
        <div className="profile">
            <form className="profile__container" onSubmit={handleDataUpdate}>
                <div className="profile__section">
                    <h1 className="profile__title">Привет, {props.currentUser.name}!</h1>
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
                    <div style={{paddingBottom: 30, color: "green"}}>{confirmationStatus ? 'Данные изменены' : ''}</div>
                    <button className="profile__button profile__edit-button" type="submit">Редактировать</button>
                    <button className="profile__button profile__logout-button" onClick={handleSignOut}>Выйти из аккаунта</button>
                </div>
            </form>
        </div>
    )
}