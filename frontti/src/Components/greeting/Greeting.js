import React from 'react';
import Login from '../login/login'
import Register from '../register/register'
import ImageSearchForm from '../ImageSearchForm/ImageSearchForm'
import FaceDetect from '../FaceDetect/FaceDetect'

const Greeting = (props) => {
    const isLoggedIn = props.isLoggedIn;
    const userWantsToRegister = props.userWantsToRegister;
    if (!isLoggedIn) {
        if (!userWantsToRegister) {
            return <Login onSubmit={props.onUserLogin} onLoginChange={props.onLoginChange} registerOrLogin={props.registerOrLogin} />
        } else {
            return <Register onSubmit={props.onUserRegister} onRegisterChange={props.onRegisterChange} registerOrLogin={props.registerOrLogin} />
        }
    } else {
        if (props.box != {}) {
            return (
                <div>
                    <ImageSearchForm
                        onInputChange={props.onInputChange}
                        onSubmit={props.onSubmit}
                        user={props.user}
                    />
                    <h3>Hello {props.user.username}!</h3>
                    <h3>You have recognized {props.user.imageCount} images</h3>
                    <FaceDetect box={props.box} imageUrl={props.imageUrl} />
                </div>
            )
        } else {
            return (
                <div>
                <ImageSearchForm
                    onInputChange={props.onInputChange}
                    onSubmit={props.onSubmit}
                    user={props.user}
                />
                <h3>Hello {props.user.username}!</h3>
                <h3>You have recognized {props.user.imageCount} images</h3>
                </div>
            )
        }
    }
}
export default Greeting;