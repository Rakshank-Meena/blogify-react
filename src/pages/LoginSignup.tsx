import React, { lazy, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AuthLayout = lazy(()=>import('../components/AuthLayout'))

const LoginSignup = () => {
    const params = useParams()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className='min-h-screen h-auto'>
            {params.method === "login" ? (
                <>
                    <AuthLayout type={'login'} />
                </>
            ) : (
                <>
                    <AuthLayout type={'signup'} />
                </>
            )}
        </div>
    )
}

export default LoginSignup
