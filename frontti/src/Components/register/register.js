import React from 'react';

const Register = (props) => {

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Username: <input name="registerUsername" onChange={props.onRegisterChange} />
                </div>
                <div>
                    Password: <input name="registerPassword" onChange={props.onRegisterChange}/>
                </div>
                <div>
                    <button input='submit'>Register</button>
                </div>
                <div>
                    <button input='submit' onClick={props.registerOrLogin}>I already have an account</button>
                </div>                
            </form>
        </div>
    )
}
export default Register;