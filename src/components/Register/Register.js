import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import RegisterLogo from '../../images/logoHeader.svg';
import './Register.css';
import mainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/validation';

export default function Register(props){

    const history = useHistory();

    const [validName, setValidname] = React.useState(false);
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPassword, setValidPassword] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    
    const [signupStatus, setSignupStatus] = React.useState();
    const [signupErrorText, setSignupErrorText] = React.useState('');

    const changeName=(e) => {
        setName(e.target.value);
        if (name.length<1) {setValidname(true) } else {setValidname(false)}
        checkButtonState()
        };

    const changeEmail=(e) => {
        setEmail(e.target.value);
        if (email.length<1) {setValidEmail(true)} else {setValidEmail(false)}
        };    
        
    const changePassword=(e) => {
        setPassword(e.target.value);
        if (password.length<7) {setValidPassword(true)} else {setValidPassword(false)}
        checkButtonState()
        };

    function checkButtonState() {
        if(!validPassword) {
            setButtonState(false)
        }
    }

    function sendRegisterData(e) {
        e.preventDefault();

        // signin(user, () => navigate("/movies", {replace: true}));
        mainApi.register(name, email, password)
        .then((res) => {
            // console.log(res)
            setSignupStatus(true);//Ставим true, если email свободен и пользователь может зарегистрироваться
            setSignupErrorText('');

        mainApi.login(password, email)
        .then((res) => {
            //   console.log(res.token)
            localStorage.setItem('token', res.token)
            props.setLoggedIn(true)
            history.push("/movies")
          })
        .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
            
            if(err === 'Ошибка: 409') {
                setSignupStatus(false);//Статус для существующего email
                setSignupErrorText('Пользователь с таким email уже существует')
            } else if (err === 'Ошибка: 400') {
                setSignupStatus(false);//Статус для существующего email
                setSignupErrorText('Неверный формат email')
            } else {
                setSignupStatus(false);//Статус для существующего email
                setSignupErrorText(err);
            }
        })

    }

    return(
        <div className='register'>
            <form className='register__container' onSubmit={sendRegisterData}>
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

                <div className='register__subcontainer'>
                {signupStatus ? "" : <div className="register__error">{signupErrorText}</div>}
                <button className='register__button' disabled={buttonState} type='submit'>Зарегистрироваться</button>
                </div>
                <p className='register__paragraph'>Уже зарегистрированы? <span><Link className='register__link' to="/sign-in">Войти</Link></span></p>
            </form>
        </div>
    )
}