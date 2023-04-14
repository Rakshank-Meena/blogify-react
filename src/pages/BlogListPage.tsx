import { Suspense, lazy, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LazyLoader from '../components/LazyLoader'
const MyBlogs = lazy(() => import('../components/MyBlogs'))
const BlogListing = lazy(() => import('../components/BlogListing'))


const BlogListPage = () => {
    const navigate = useNavigate()
    const { pageType } = useParams<any>()
    const [email, setEmail] = useState<string>('')
    useEffect(() => {
        const user = localStorage.getItem("_uud")
        if (user == null) {
            pageType !== 'all' && navigate('/auth/login')
        }
        else {
            return setEmail(JSON.parse(user).email)
        }
    }, [pageType])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (pageType === 'all') {
        return (
            <>
                <div className="container min-h-screen mx-auto px-4 py-8 lg:max-w-[62rem] bg-white">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">All Blogs</h1>
                    <Suspense fallback={<LazyLoader />}>
                        <BlogListing />
                    </Suspense>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="container mx-auto px-4 py-8 lg:max-w-[62rem] ">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">My Blogs</h1>
                    <Suspense fallback={<LazyLoader />}>
                        <MyBlogs email={email} />
                    </Suspense>
                </div>
            </>
        )
    }
}


export default BlogListPage
