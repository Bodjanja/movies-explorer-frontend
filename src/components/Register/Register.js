import React from 'react';
import { Link } from 'react-router-dom';
import RegisterLogo from '../../images/logoHeader.svg';
import './Register.css';

export default function Register(){

    const [validName, setValidname] =React.useState(false);
    const [validEmail, setValidEmail] =React.useState(false);
    const [validPassword, setValidpassword] =React.useState(false);
    const [name, setName] =React.useState('');
    const [email, setEmail] =React.useState('');
    const [password, setPassword] =React.useState('');

    const changeName=(e) => {
        setName(e.target.value);
        if (name.length<1) {setValidname(true) } else {setValidname(false)}
        };

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (email.length<1) {setValidEmail(true)} else {setValidEmail(false)}
        };    
        
    const changePassword=(e) => {
        setPassword(e.target.value);
        if (password.length<7) {setValidpassword(true)} else {setValidpassword(false)}
        };

    return(
        <div className='register'>
            <div className='register__container'>
                <Link to="/"><img src={RegisterLogo} alt='Логотип' className='register__logo' /></Link>
                <h1 className='register__title'>Добро пожаловать!</h1>

                <label htmlFor='name' className='register__labels'>Имя</label>
                <input className={`register__inputs ${name.length<2 ? "register__inputs_error":""}`} value={name || ""} onChange={changeName} type="text" required id="name" name="name" />
                {validName ?  <div className="register__error">Что-то пошло не так...</div> :""}

                <label htmlFor='email' className='register__labels'>Email</label>
                <input className={`register__inputs ${email.length<2 ? "register__inputs_error":""}`} value={email || ""} onChange={changeEmail} type="email" required id="email" name="email" />
                {validEmail ?  <div className="register__error">Что-то пошло не так...</div> :""}

                <label htmlFor='password' className='register__labels'>Пароль</label>
                <input className={`register__inputs ${password.length<8 ? "register__inputs_error":""}`} value={password || ""} onChange={changePassword} type="password" required id="password" name="password" />
                {validPassword ?  <div className="register__error">Что-то пошло не так...</div> :""}

                <button className='register__button'>Зарегистрироваться</button>
                <p className='register__paragraph'>Уже зарегистрированы? <span><Link className='register__link' to="/sign-in">Войти</Link></span></p>
            </div>
        </div>
    )
}