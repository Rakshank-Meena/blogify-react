import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import serverConn from '../api/ServerConn'
const Signup = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')

    const [eventLoad, setEventLoad] = useState<boolean>(false)
    const data = {
        email: email,
        userName: userName,
        password: password,
        cPassword: cPassword,
        reqType: "signup"
    }
    const onSuccess = (data: any) => {
        const item = {
            email: data.data.user.email,
            _patk: data.data._patk
        }
        localStorage.setItem("_uud", JSON.stringify(item))
        setEventLoad(false)
        window.location.assign('/blogs/all')
    }

    const handleSubmit = async () => {
        setEventLoad(true)
        return serverConn(onSuccess, (e: any) => { return (setEventLoad(false), alert('signup failed :(')) }, "post", `${process.env.REACT_APP_API_SERVER}/login`, {}, data)
    }

    useEffect(() => {
        localStorage.getItem("_uud") && navigate('/blog/blogs')
    }, [])

    return (
        <>{eventLoad && <div className='w-[97vw] capitalize mx-auto text-primary text-xl font-bold mb-8 mt-7 flex justify-center items-center space-x-3'>
            signing you up,please wait...<span>
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
            <div className="bg-white min-h-[90vh] h-full  flex items-center justify-center">
                <div className="bg-white mx-2 w-full max-w-sm p-8 rounded-lg shadow-lg">
                    <h1 className="text-primary text-2xl font-bold mb-8 text-center">Sign Up</h1>
                    <div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-neutral3 block mb-2">
                                Email
                            </label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email"
                                id="email"
                                className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                                placeholder="Your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="text-neutral3 block mb-2">
                                Username
                            </label>
                            <input
                                onChange={(e) => { setUserName(e.target.value) }}
                                type="text"
                                id="username"
                                className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                                placeholder="Your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-neutral3 block mb-2">
                                Password
                            </label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password"
                                id="password"
                                className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                                placeholder="Your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="text-neutral3 block mb-2">
                                Confirm Password
                            </label>
                            <input
                                onChange={(e) => { setCPassword(e.target.value) }}
                                type="password"
                                id="confirmPassword"
                                className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
                                placeholder="Confirm password"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md text-center hover:bg-secondary transition-colors duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="mt-4 text-center">
                        Already have an account?
                        <Link to={"/auth/login"} className="text-link hovertext-linkHover font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup
