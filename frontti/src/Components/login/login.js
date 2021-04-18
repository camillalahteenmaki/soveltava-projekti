import React from 'react';
import './login.css';
import picture from'./login.svg.png';

const Login = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div class="imgcontainer">
                    <img src={picture} alt="Avatar" class="avatar"/>
                </div>
                <div class="w3-large">
                    Username: <input type="text" name="loginUsername" onChange={props.onLoginChange} />
                </div>
                <div class="w3-large">
                    Password: <input type="password" name="loginPassword" onChange={props.onLoginChange} />
                </div>
                <div class="container">
                    <button input='submit'>Log in</button>
                </div>
                <div class="container">
                    <button input='submit' onClick={props.registerOrLogin}>Create account</button>
                </div>
            </form>
        </div>
    )
}
export default Login;