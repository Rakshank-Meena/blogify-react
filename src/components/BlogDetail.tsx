import React, { lazy, useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import serverConn from '../api/ServerConn'
import { useNavigate } from 'react-router-dom'
const CommentsList = lazy(() => import('./CommentList'))

const BlogDetail = (props: any) => {
    const navigate = useNavigate()
    const [edit, setEdit] = useState<boolean>(true)
    const [blogTitle, setBlogTitle] = useState<string>()
    const [editAccess, setEditAccess] = useState<any>()
    const [blogContent, setBlog] = useState<string>('')
    const [author, setAuthor] = useState<string>()
    const [comment, setComment] = useState<string>("")
    const [commentsArr, setCommentsArr] = useState<any[]>([])

    useEffect(() => {
        setBlogTitle(props.blogs.title ? props.blogs.title : '')
        setBlog(props.blogs.content ? props.blogs.content : "")
        setAuthor(props.blogs.userName ? props.blogs.userName : "")
        setCommentsArr(props.blogs.comments)
        const userData = localStorage.getItem("_uud")
        if (userData !== null) {
            const user = JSON.parse(userData)
            const boolVal = user._patk === '1alwd' || user.email === props.blogs.email ? false : true
            setEditAccess(boolVal)
        }
    }, [])


    //function to edit existing blogs
    const handleEdit = async () => {
        if (editAccess || (blogTitle === props.blogs.title && blogContent === props.blogs.content)) {
            return setEdit(true)
        }
        const data = { title: blogTitle, content: blogContent, blogId: props.blogs.blogId, email: props.blogs.email, type: "content" }
        serverConn((data: any) => { return (alert('success'), setEdit(true)) }, (err: any) => { alert('failed') }, 'patch', `${process.env.REACT_APP_API_SERVER}/blogs`, {}, data)
    }

    //function to comment on blogs
    const handleComment = async () => {
        if (localStorage.getItem("_uud") === null || localStorage.getItem("_uud") === undefined) {
            navigate('/auth/login')
        }
        else {
            if (comment === "") {
                return
            }
            const data = { blogId: props.blogs.blogId, email: props.blogs.email, type: "comment", comment }
            serverConn((data: any) => { return (alert('comment posted successfully'), setEdit(true), setComment('')) }, (err: any) => { alert('failed') }, 'patch', `${process.env.REACT_APP_API_SERVER}/blogs`, {}, data)
        }
    }

    //function to delete a blog
    const handleDelete = () => {
        const param = {
            blogId: props.blogs.blogId
        }
        return window.confirm("are you sure you want to delete this blog permanently") &&
            serverConn((data: any) => { return (alert('blog deleted successfully'), navigate("/blogs/my-blogs")) }, (err: any) => { alert('failed') }, 'delete', `${process.env.REACT_APP_API_SERVER}/blogs`, param)
    }

    return (
        <>
            <div className="container mx-auto mt-8 lg:px-10 bg-white">
                {(!editAccess && !edit) &&
                    <div className='flex w-full justify-end gap-2 items-center'>
                        <div >
                            <CustomButton onClick={handleEdit} classes={''} type={'primary'} text={'save'} />
                        </div>
                        <div >
                            <CustomButton onClick={() => setEdit(!edit)} classes={''} type={'secondary'} text={'cancel'} />
                        </div>
                        <div className='ml-4 text-red-900' onClick={handleDelete}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="2em"
                                width="2em"
                                {...props}
                            >
                                <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                            </svg>
                        </div>
                    </div>
                }

                {edit ?
                    <h1 className={`text-3xl font-bold mb-8 px-8 `}>{blogTitle}</h1>
                    :
                    <div className=' mb-8 px-8 '>
                        <label className="block font-bold mb-2">Edit your Title</label>
                        <input type='text' readOnly={edit} className={`w-full  border-neutral1 border-2 rounded-md px-4 py-2 `} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                    </div>
                }
                <div className=" flex justify-between px-8 items-center">
                    <p className="text-neutral2 capitalize ">{author}</p>
                    {editAccess === false && <button className='text-blue-900' onClick={() => !editAccess && setEdit(!edit)}>Edit</button>}
                </div>
                <section className="bg-white rounded-lg p-8 ">
                    {edit ?
                        <div className="prose max-w-none break-words whitespace-pre-wrap">
                            <p
                                dangerouslySetInnerHTML={{ __html: blogContent }}
                            >
                            </p>
                        </div>
                        :
                        <>
                            <label className="block font-bold mb-2">Edit Your Content</label>
                            <textarea rows={8} className='w-full border-2 border-neutral1 rounded-md px-4 py-2' value={blogContent} onChange={(e) => setBlog(e.target.value)} />
                        </>
                    }
                </section>
            </div>
            <div className="  border border-neutral1 rounded-lg p-16">
                <h2 className="text-primary text-2xl font-bold mb-8 px-2 lg:px-10">Comments</h2>
                {commentsArr[0] && <div><CommentsList CommentsArr={commentsArr} /></div>}

                <div className="mt-8 px-2 lg:px-10">
                    <h3 className="text-accent text-xl font-bold mb-4">Leave a Comment</h3>
                    <textarea
                        className="border border-neutral1 rounded-lg p-4 w-full h-24 resize-none mb-4"
                        placeholder="Write your comment..."
                        value={comment} onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <CustomButton onClick={handleComment} classes={''} type={'primary'} text={'submit'} />
                </div>
            </div>
        </>
    )
}

export default BlogDetail
