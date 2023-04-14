import axios from 'axios'
import React, { lazy } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import serverConn from '../api/ServerConn';
const CustomButton = lazy(() => import('./CustomButton'))
const SearchList = lazy(() => import('./SearchList'))
const Navbar = () => {
    const navigate = useNavigate()
    const [blog, setBlogs] = useState<any[]>([])
    const [search, setSearch] = useState<string>('')
    const [searchedItem, setSearchedItem] = useState<any[]>([])
    const [signupCta, setSignupCta] = useState<string>('sign in')
    const [hamburger, setHamburger] = useState<boolean>(false)
    const [hamburgerSearch, setHamSearch] = useState<boolean>(false)
    const searchInputRef = useRef<any>(null)
    const [isMobile, setIsmobile] = useState<boolean>(true)


    useEffect(() => {
        //for identifying device width
        window.innerWidth > 900 && setIsmobile(false)
        //for removing focus from search input whenever user taps/clicks outside
        document.addEventListener("click", () => {
            if (searchInputRef.current !== document.activeElement) {
                setSearch('')
                handleSearch()
            }
        })

        localStorage.getItem("_uud") && setSignupCta('sign out')

        serverConn((data: any) => setBlogs(data.data.data), (err) => { console.log(err) }, "get", `${process.env.REACT_APP_API_SERVER}/blogs`)
    }, [])


    //for implementing autosearch option
    const handleSearch = () => {
        if (search.length < 3) {
            return setSearchedItem([])

        }
        else {
            return blog.filter((item) => {
                return (item.title.replace(" ", '').toLowerCase().includes(search.replace(" ", '').toLowerCase()) || item.content.replace(" ", '').toLowerCase().includes(search.replace(" ", '').toLowerCase())) && (!searchedItem.includes(item) && setSearchedItem((any) => [...any, item]))
            })
        }
    }


    //for handling sign in/signout button
    const handleSignin = () => {
        setHamburger(false)
        if (localStorage.getItem("_uud")) {
            return (localStorage.removeItem("_uud"), setSignupCta('sign in'),window.location.reload())
        }
        else {
            navigate("/auth/login")
        }
    }


    //used for rendering search results
    const searchListing = (arr: any[]) => {
        return (
            <ul className="text-default">
                {arr.map((item: any, i: number) => {
                    return (
                        <SearchList key={`search${i}`} title={item.title} blogId={item.blogId} />
                    )
                })}
            </ul>
        )
    }


    const NavLinks = [
        {
            title: "Home",
            route: "/"
        },
        {
            title: "Blogs",
            route: "/blogs/all"
        },
        {
            title: "write a blog",
            route: "/create-blog"
        },
        {
            title: "my blogs",
            route: "/blogs/my-blogs"
        },
        {
            title: "utility"
        }
    ]


    //for rendering links on navbar and hamburger menu
    const NavLinksRender = () => {
        return NavLinks.map((links: any, i: number) => {
            return (
                links.title !== "utility" ? <li key={`navlinks${i}`}>
                    <Link onClick={() => isMobile && setHamburger(false)} to={`${links.route}`} className="hover:text-linkHover capitalize">
                        {links.title}
                    </Link>
                </li> : (
                    !isMobile ? (
                        <li key={`utils1${i}`}>
                            <div className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-gray-200 text-gray-800 py-2 pl-10 pr-4 rounded-md focus:outline-none focus:bg-white focus:placeholder-gray-500"
                                    value={search}
                                    onChange={(e) => { return (handleSearch(), setSearch(e.target.value)) }}
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        viewBox="0 0 1024 1024"
                                        fill="currentColor"
                                        height="auto"
                                        width="auto"
                                    >
                                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                                    </svg>
                                </span>
                                {searchedItem[0] && <div className='absolute left-0 mt-2 py-1 w-full bg-white shadow-md rounded-md z-10'>
                                    {searchListing(searchedItem)}
                                </div>}
                            </div>
                        </li>
                    ) : (
                        <li key={`utils2${i}`} className='mt-5'>
                            <CustomButton onClick={handleSignin} text={signupCta} type={'secondary '} classes={''} />
                        </li>
                    )
                )
            )
        }

        )
    }

    return (
        <>
            <nav className="flex items-center justify-between  sticky top-0 z-10 bg-primary text-white p-4">
                <Link to={"/"} className="text-2xl font-bold">
                    Blogify
                </Link>
                {!isMobile ? (<>
                    <ul className="flex space-x-4 justify-center items-center">
                        {NavLinksRender()}
                    </ul>
                    <CustomButton onClick={handleSignin} text={signupCta} type={'primary'} classes={''} />
                </>) : (
                    <>
                        {
                            searchedItem[0] && <div className='absolute  px-5 flex flex-col h-auto border left-[5%]  w-[90%] text-black bg-white top-[75px] py-1  rounded-sm '>
                                {searchListing(searchedItem)}
                            </div>
                        }
                        <div className='flex gap-4'>
                            <div className={`relative  bg-stone-50 text-black  rounded-md border-primaryTxt pl-3 flex justify-center items-center py-1 transition ease-in-out delay-150  ${hamburgerSearch === true ? "translate-x-0 opacity-100" : "!translate-x-12 opacity-0"}`}>
                                <input ref={searchInputRef} className={`search-input px-1 text-sm bg-stone-50 sm:w-auto w-[80px]`} placeholder={'Search'} value={search} onChange={(e) => { return (handleSearch(), setSearch(e.target.value)) }} />
                            </div>
                            <button className='z-10 ' onClick={() => setHamSearch(!hamburgerSearch)}>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                                </svg>
                            </button>

                            <div className=' mr-3 text-2xl z-20' onClick={() => setHamburger(!hamburger)}>
                                <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </nav >


            {/* hamburger menu */}
            {isMobile && (<div className={`md:w-[25%] w-[55%] z-40 px-[1.15rem] py-[1.35rem] text-white fixed h-[100vh] bg-primary top-0 transition ease-in-out delay-150 ${hamburger ? ' ' : '-translate-x-[80vw]'}`}>
                <div onClick={() => setHamburger(false)} className=" h-6 font-semibold w-6 mb-[4.7rem] ">
                    <svg fill="none" viewBox="0 0 15 15" height="100%" width="100%" >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                <ul className=" gap-6 flex  flex-col px-[1.15rem]">
                    {NavLinksRender()}
                </ul>
            </div>)}
        </>
    )
}


export default Navbar
