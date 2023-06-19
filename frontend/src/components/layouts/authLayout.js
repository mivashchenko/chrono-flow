import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import {AuthProvider, useAuth} from "../../authProvider";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const { userPromise } = useLoaderData();

    const { login } = useAuth();

    return (
        <Suspense fallback={<div>Progress...</div>}>
            <Await
                resolve={userPromise}
                errorElement={<div>Something went wrong!</div>}
                children={(user) => (
                    <AuthProvider userData={user}>{outlet}</AuthProvider>
                )}
            />
        </Suspense>
    );
};