import React from "react";
import './style.scss'

export const SignUpPageLayout = ({children}) => {

    return (
        <div className={'login-page-container'}>
            <div className={'login-page-content'}>
                {children}
            </div>
        </div>
    )
}