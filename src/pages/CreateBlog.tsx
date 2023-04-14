import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import serverConn from "../api/ServerConn";

const CreateBlog = () => {
    const navigate = useNavigate()
    const [blogTitle, setBlogTitle] = useState('')
    const [content, setContent] = useState('')
    const [eventLoad, setEventLoad] = useState<boolean>(false)
    const payload = {
        title: blogTitle,
        content: content
    }
    const onSuccess = () => {
        return (setEventLoad(false), alert('blog posted successfully'), setBlogTitle(''), setContent(''), navigate("/blogs/my-blogs"))
    }
    const onFailure = (err: any) => {
        setEventLoad(false)
        return alert(err)
    }

    const handleFormSubmit = async () => {
        if (localStorage.getItem("_uud") === null || localStorage.getItem("_uud") === undefined) {
            navigate('/auth/login')
        }
        else {
            if (blogTitle !== '' && content !== '') {
                setEventLoad(true)
                return serverConn(onSuccess, onFailure, "post", `${process.env.REACT_APP_API_SERVER}/blogs`, {}, payload)
            }
        }
    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>{eventLoad && <div className='w-[97vw] capitalize mx-auto text-primary text-xl font-bold mb-8 mt-7 flex justify-center items-center space-x-3'>
            please wait while we appreciate your creativity!!...<span className="text-base text-black">&#40; slow servers  😔 &#41;</span><span>
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
            <div className="container mx-auto mt-8">
                <div className="max-w-5xl mx-auto bg-white rounded-lg p-8">
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
                    <button onClick={handleFormSubmit} className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-link">
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateBlog

