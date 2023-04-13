import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import serverConn from "../api/ServerConn";

const CreateBlog = () => {
    const navigate = useNavigate()
    const [blogTitle, setBlogTitle] = useState('')
    const [content, setContent] = useState('')
    const payload = {
        title: blogTitle,
        content: content
    }
    const onSuccess = () => {
        return (alert('blog posted successfully'), setBlogTitle(''), setContent(''), navigate("/blog/blogs"))
    }
    const onFailure = (err: any) => {
        alert(err)
    }

    const handleFormSubmit = async () => {
        if (localStorage.getItem("_uud") === null || localStorage.getItem("_uud") === undefined) {
            navigate('/auth/login')
        }
        else {
            if (blogTitle !== '' && content !== '') {
                serverConn(onSuccess, onFailure, "post", `${process.env.REACT_APP_API_SERVER}/blogs`, {}, payload)
            }
        }
    }

    return (
        <>
            <div className="container mx-auto mt-8">
                <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto bg-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-neutral1 rounded-md px-4 py-2"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block font-bold mb-2">Content</label>
                        <textarea
                            id="content"
                            className="w-full border border-neutral1 rounded-md px-4 py-2"
                            rows={8}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-link">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog

