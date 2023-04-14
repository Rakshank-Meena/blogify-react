import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import serverConn from '../api/ServerConn'
import LazyLoader from '../components/LazyLoader'
const BlogDetail = lazy(() => import('../components/BlogDetail'))

const BlogDetailPage = () => {

    const { blogId } = useParams()
    const [blogDetail, setBlogDetail] = useState<any>()
    
    useEffect(() => {
        window.scrollTo(0,0)
        serverConn((data: any) => setBlogDetail(data.data.data), (err: any) => { console.log(err) }, 'get', `${process.env.REACT_APP_API_SERVER}/blogs`, { blogId })
    }, [])

    return (
        <>
            {blogDetail !== undefined && <Suspense fallback={<LazyLoader type={'home'} />}>
                <BlogDetail blogs={blogDetail} />
            </Suspense>}
        </>
    )
}

export default BlogDetailPage
