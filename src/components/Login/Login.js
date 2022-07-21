import React from 'react';
import { Link, } from 'react-router-dom';
import RegisterLogo from '../../images/logoHeader.svg';
import '../Register/Register';
import mainApi from '../../utils/MainApi';

export default function Login({onLoginSuccess}){

    const [validEmail, setValidEmail] =React.useState(false);
    const [validPassword, setValidpassword] =React.useState(false);
    const [email, setEmail] =React.useState('');
    const [password, setPassword] =React.useState('');

    const [signinStatus, setSigninStatus] = React.useState();
    const [signinErrorText, setSigninErrorText] = React.useState('');

    function validateEmail(email){
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
        return re.test(email);
    }

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value) === true){
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
        };
        
    const changePassword=(e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 7) {setValidpassword(true)} else {setValidpassword(false)}
        };

    function handleLogin(e) {
        e.preventDefault();
        if(validEmail && validPassword){
        mainApi.login(password, email)
        .then((res) => {
            setSigninStatus(true);
            setSigninErrorText('');
            localStorage.setItem('token', res.token);
            onLoginSuccess()
        })
        .catch((err) => {
            if(err === 'Ошибка: 401'){
                setSigninStatus(false);
                setSigninErrorText('Некорректные данные');
            } else{
                setSigninStatus(false);
                setSigninErrorText(err);
            }
            if(err === 'Ошибка: 400'){
                setSigninStatus(false);
                setSigninErrorText('Пользователя не существует');
            } else{
                setSigninStatus(false);
                setSigninErrorText(err);
            }
        })}
    }

    return(
        <div className='register'>
            <form className='register__container' onSubmit={handleLogin}>
                <Link to="/"><img src={RegisterLogo} alt='Логотип' className='register__logo' /></Link>
                <h1 className='register__title'>Рады видеть!</h1>

                <label htmlFor='email' className='register__labels'>Email</label>
                <input className={`register__inputs ${email.length > 0 && validEmail === false ? "register__inputs_error":""}`} onChange={changeEmail} value={email || ""} type="email" required id="email" name="email" />
                {validEmail === false && email.length > 0 ?  <div className="register__error">Введите корректный email</div> :""}

                <label htmlFor='password' className='register__labels'>Пароль</label>
                <input className={`register__inputs ${password.length>0 && password.length<8 ? "register__inputs_error":""}`} value={password || ""} onChange={changePassword} type="password" required id="password" name="password" />
                {validPassword === false && password.length > 0 ?  <div className="register__error">Минимум 8 символов</div> :""}
                
                {signinStatus ? "" : <div className="register__error">{signinErrorText}</div>}
                <button className='register__button' type='submit'>Войти</button>
                <p className='register__paragraph'>Ещё не зарегистрированы? <span><Link className='register__link' to="/sign-up">Регистрация</Link></span></p>
            </form>
        </div>
    )
}