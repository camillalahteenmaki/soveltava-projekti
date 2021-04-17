import React from 'react';

const Register = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Username: <input name="username" onChange={props.onChange} />
                </div>
                <div>
                    Password: <input name="password" onChange={props.onChange} />
                </div>
                <div>
                    <button input='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;