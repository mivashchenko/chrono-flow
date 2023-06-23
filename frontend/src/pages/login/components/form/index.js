import React, {useState} from "react";
import './style.scss';
import {useAuth} from "../../../../authProvider";

export const LoginForm = () => {

    const [authData, setAuthData] = useState({});
    const {login} = useAuth();

    const updateAuthData = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5555/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
            }),
        }).then((res) => {
            if (res.status === 422) {
                throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
                console.log('Error!');
                throw new Error('Could not authenticate you!');
            }

            return res.json();
        }).then((resData) => {
            const token = resData.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', resData.userId);
            fetch('http://localhost:5555/auth/user',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => res.json()).then(userData => {
                login(userData);
            }).catch(err => {
                console.log(err);
                throw new Error('Something went wrong!');
            });
        });
    }

    return (
        <div className={'sign-up-form-container'}>
            <div className={'sign-up-form-content'}>
                <form onSubmit={handleSubmit} className={'sign-up-form'}>

                    <label className={'sign-up-form-label'}> Email:
                        <input className={'sign-up-form-input'} type="email" name="email" onChange={updateAuthData}/>
                    </label>

                    <label className={'sign-up-form-label'}> Password:
                        <input className={'sign-up-form-input'} type="password" name="password"
                               onChange={updateAuthData}/>
                    </label>

                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}