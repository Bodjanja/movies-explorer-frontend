import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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

    const history = useHistory();

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (email.length<1) {setValidEmail(true)} else {setValidEmail(false)}
        };    
        
    const changePassword=(e) => {
        setPassword(e.target.value);
        if (password.length<7) {setValidpassword(true)} else {setValidpassword(false)}
        };

    function handleLogin(e) {
        e.preventDefault();
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
        })
    }

    return(
        <div className='register'>
            <form className='register__container' onSubmit={handleLogin}>
                <Link to="/"><img src={RegisterLogo} alt='Логотип' className='register__logo' /></Link>
                <h1 className='register__title'>Рады видеть!</h1>

                <label htmlFor='email' className='register__labels'>Email</label>
                <input className={`register__inputs ${email.length<2 ? "register__inputs_error":""}`} value={email || ""} onChange={changeEmail} type="email" required id="email" name="email" />
                {validEmail ?  <div className="register__error">Что-то пошло не так...</div> :""}

                <label htmlFor='password' className='register__labels'>Пароль</label>
                <input className={`register__inputs ${password.length<8 ? "register__inputs_error":""}`} value={password || ""} onChange={changePassword} type="password" required id="password" name="password" />
                {validPassword ?  <div className="register__error">Что-то пошло не так...</div> :""}
                
                {signinStatus ? "" : <div className="register__error">{signinErrorText}</div>}
                <button className='register__button' type='submit'>Войти</button>
                <p className='register__paragraph'>Ещё не зарегистрированы? <span><Link className='register__link' to="/sign-up">Регистрация</Link></span></p>
            </form>
        </div>
    )
}