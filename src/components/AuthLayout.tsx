import { lazy } from 'react'

const Login = lazy(()=>import('./Login'))
const Signup = lazy(()=>import('./Signup'))

const AuthLayout = (props: { type: string }) => {
    if (props.type === "login") {
        return (
            <>
                <Login/>
            </>
        )
    }
    else {
        return (
            <>
                <Signup/>
            </>
        )
    }
}

export default AuthLayout
