import React from 'react';
import {LoginForm} from "./components/form";
import {LoginPageLayout} from "./layout";



export const LoginPage = () => {

    return (
        <LoginPageLayout children={<LoginForm/>}/>
    )
};