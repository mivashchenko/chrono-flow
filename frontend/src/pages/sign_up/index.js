import React from 'react';
import {SignUpForm} from "./components/form";
import {SignUpPageLayout} from "./layout";



export const SignUpPage = () => {

    return (
        <SignUpPageLayout children={<SignUpForm/>}/>
    )
};