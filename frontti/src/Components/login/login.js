import React from 'react';

const Login = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Username: <input name="loginUsername" onChange={props.onLoginChange} />
                </div>
                <div>
                    Password: <input name="loginPassword" onChange={props.onLoginChange} />
                </div>
                <div>
                    <button input='submit'>Log in</button>
                </div>
                <div>
                    <button input='submit' onClick={props.registerOrLogin}>Create account</button>
                </div>
            </form>
        </div>
    )
}
export default Login;