import React from 'react';
import Login from '../login/login'
import ImageSearchForm from '../ImageSearchForm/ImageSearchForm'
import FaceDetect from '../FaceDetect/FaceDetect'

const Greeting = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if (!isLoggedIn) {
        return <Login onSubmit={props.onUserLogin} />
    } else {
        return (
            <div>
                <ImageSearchForm
                    onInputChange={props.onInputChange}
                    onSubmit={props.onSubmit}
                />
                <FaceDetect box={props.box} imageUrl={props.imageUrl} />
            </div>

        )
    }
    /*
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
    */
}
export default Greeting;