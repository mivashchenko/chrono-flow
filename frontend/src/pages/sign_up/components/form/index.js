import React, {useState} from "react";
import './style.scss';

export const SignUpForm = () => {

    const [authData, setAuthData] = useState({});
    const onSignUp = (e) => {
        e.preventDefault()
        fetch('http://localhost:5555/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                name: authData.name,

            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                console.log(data);
            } else {
                console.log(data);
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const updateAuthData = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={'login-form-container'}>
            <div className={'login-form-content'}>
                <form onSubmit={onSignUp} className={'login-form'}>

                    <label className={'sign-up-form-label'}> Name:
                        <input className={'sign-up-form-input'} type="text" name="name" onChange={updateAuthData}/>
                    </label>

                    <label className={'sign-up-form-label'}> Email:
                        <input className={'sign-up-form-input'} type="email" name="email" onChange={updateAuthData}/>
                    </label>

                    <label className={'sign-up-form-label'}> Password:
                        <input className={'sign-up-form-input'} type="password" name="password" onChange={updateAuthData}/>
                    </label>

                    <button>Sign up</button>
                </form>
            </div>
        </div>
    )
}