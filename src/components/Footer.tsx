import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-neutral3 text-center py-8">
            <div className="text-4xl font-bold text-white  mb-4">
                Blogify
            </div>
            <nav className="flex justify-center space-x-4">
                <a href="/" className="text-link hover:text-linkHover">Home</a>
                <a href="/blogs/all" className="text-link hover:text-linkHover">Blogs</a>
                <a href="/blogs/my-blogs" className="text-link hover:text-linkHover">My Blogs</a>
                <a href="/create-blog" className="text-link hover:text-linkHover">Write a Blog</a>
            </nav>
            <p className="mt-4 text-neutral2 text-xs">© 2023 Blogify. All rights reserved.</p>
        </footer>
    )
}

export default Footer
