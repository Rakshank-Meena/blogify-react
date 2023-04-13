import React, { lazy, useEffect, useState } from 'react'
import LazyLoader from './LazyLoader'
import { useNavigate } from 'react-router-dom'
import serverConn from '../api/ServerConn'
const BlogList = lazy(() => import('./BlogList'))

const BlogListing = (props: { email?: string }) => {
    const navigate = useNavigate()
    const { email } = props
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [param, setParams] = useState<any>({})
    const onSuccess = (data: any) => {
        setBlogs(data.data.data)
        setLoading(false)
    }
    const onFailure = (data: any) => {
        console.log(data)
        setLoading(false)
    }
    useEffect(() => {
        email ? setParams({
            email: email
        }) : setParams({})
        const params = param
        serverConn(onSuccess, onFailure, 'get', `${process.env.REACT_APP_API_SERVER}/blogs`, params)
    }, [])

    return (
        <>
            {loading ?
                <LazyLoader />
                :
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto ">
                    {blogs.map((item, index) => {
                        return (
                            <div className="my-3" key={`blogList${index}`}>
                                <BlogList author={item.userName} title={item.title} blogId={item.blogId} />
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default BlogListing
