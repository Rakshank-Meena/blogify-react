import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import serverConn from '../api/ServerConn'
const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const data = {
        email: email,
        password: password
    }

    const onSuccess = (data: any) => {
        const item = {
            email: data.data.user.email,
            _patk: data.data._patk
        }
        document.cookie = `_jwt=${data.data._jwt}`

        localStorage.setItem("_uud", JSON.stringify(item))
        navigate('/blogs/all')
    }

    //api call for logging in
    const handleSubmit = async () => {
        return serverConn(onSuccess, (e: any) => { console.log(e) }, "post", `${process.env.REACT_APP_API_SERVER}/login`, {}, data)
    }

    useEffect(() => {
        localStorage.getItem("_uud") && navigate('/blogs/all')
    }, [])


    return (
        <>
            <div className="bg-white min-h-[80vh] h-full flex items-center justify-center">
                <div className="bg-white mx-2 w-full max-w-sm p-8 rounded-lg shadow-md">
                    <h1 className="text-primary text-2xl font-bold mb-8 text-center">Sign In</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-neutral3 block mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                            placeholder="Your email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-neutral3 block mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                            placeholder="Your password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md text-center hover:bg-secondary transition-colors duration-300"
                    >
                        Sign In
                    </button>
                    <p className="mt-4 text-center">
                        Don't have an account?{' '}
                        <Link to={"/auth/signup"} className="text-link hover:text-linkHover font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login

