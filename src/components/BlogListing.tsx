import React, { lazy, useEffect, useState } from 'react'
import LazyLoader from './LazyLoader'
import { useNavigate } from 'react-router-dom'
import serverConn from '../api/ServerConn'
import CustomButton from './CustomButton'
const BlogList = lazy(() => import('./BlogList'))

const BlogListing = (props: { email?: string }) => {
    const navigate = useNavigate()
    const { email } = props
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [param, setParams] = useState<any>({})
    const [slow, setSlow] = useState<boolean>(false)
    const onSuccess = (data: any) => {
        setBlogs(data.data.data)
        setSlow(false)
        setLoading(false)
    }
    const onFailure = (data: any) => {
        console.log(data)
        setSlow(false)
        setLoading(false)
    }
    useEffect(() => {
        setTimeout(() => setSlow(true), 4500)
        email ? setParams({
            email: email
        }) : setParams({})
        const params = param
        serverConn(onSuccess, onFailure, 'get', `${process.env.REACT_APP_API_SERVER}/blogs`, params)
    }, [])

    return (
        <>
            {loading ?
                <>
                    {slow && <div className='w-auto capitalize mx-auto text-primary text-xl font-bold mb-8 mt-7 flex justify-center items-center space-x-3'>
                        looks like servers are taking more time than usual 😔 <span>
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
                    <LazyLoader />
                </>
                :
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto ">
                    {blogs[0] ? blogs.map((item, index) => {
                        return (
                            <div className="my-3" key={`blogList${index}`}>
                                <BlogList author={item.userName} title={item.title} blogId={item.blogId} />
                            </div>
                        )
                    }) : <div className='w-[95%] absolute left-[2.5%] h-[80%] text-2xl flex-col text-primary flex justify-center gap-10 items-center'>
                        <span className='animate-pulse'>Nothing to show here 😢</span>
                        <CustomButton classes={'animate-none'} type={'secondary'} text={'write a blog'} onClick={() => navigate('/create-blog')} />
                    </div>}
                </div>
            }
        </>
    )
}

export default BlogListing
