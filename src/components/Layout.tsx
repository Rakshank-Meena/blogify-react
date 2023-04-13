import React, { Suspense, lazy } from "react"
const Footer = lazy(()=>import("./Footer"))
const Navbar = lazy(() => import("./Navbar"))
const Layout = ({ children }: any) => {
    return (
        <div className="content ">
            <Suspense fallback={<></>}>
                <Navbar />
            </Suspense>
            {children}
            <Suspense fallback={<></>}>
                <Footer/>
            </Suspense>
        </div>
    )
}

export default Layout