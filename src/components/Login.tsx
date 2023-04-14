import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import serverConn from '../api/ServerConn'
const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [eventLoad, setEventLoad] = useState<boolean>(false)
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
        setEventLoad(false)
        window.location.assign('/blogs/all')
    }

    //api call for logging in
    const handleSubmit = async () => {
        setEventLoad(true)
        return serverConn(onSuccess, (e: any) => { return (setEventLoad(false), alert('Error while trying to log you in')) }, "post", `${process.env.REACT_APP_API_SERVER}/login`, {}, data)
    }

    useEffect(() => {
        localStorage.getItem("_uud") && navigate('/blogs/all')
    }, [])


    return (
        <>
            {eventLoad && <div className='w-[97vw] capitalize mx-auto text-primary text-xl font-bold mb-8 mt-7 flex justify-center items-center space-x-3'>
                logging you in,please wait...<span>
                    <svg
                        className='animate-spin'
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.2em"
                        width="1.2em"
                    >
                        <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
                    </svg>
                </span>
            </div>}
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

