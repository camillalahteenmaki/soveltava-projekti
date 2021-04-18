import React from 'react';
import picture from './login.svg.png';
import './register.css'

const Register = (props) => {

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div class="imgcontainer">
                    <img src={picture} alt="Avatar" class="avatar"/>
                </div>                
                <div class="w3-large">
                    Username: <input type="text" name="registerUsername" onChange={props.onRegisterChange} />
                </div>
                <div class="w3-large">
                    Password: <input type="password" name="registerPassword" onChange={props.onRegisterChange}/>
                </div>
                <div class="container">
                    <button input='submit'>Register</button>
                </div>
                <div class="container">
                    <button input='submit' onClick={props.registerOrLogin}>I already have an account</button>
                </div>                
            </form>
        </div>
    )
}
export default Register;