import React from "react";
import './style.scss'

export const LoginPageLayout = ({children}) => {

    return (
        <div className={'sign-up-page-container'}>
            <div className={'sign-up-page-content'}>
                {children}
            </div>
        </div>
    )
}