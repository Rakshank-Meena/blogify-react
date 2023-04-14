import { useNavigate } from "react-router-dom"
import CustomButton from '../components/CustomButton'
import { useEffect } from "react"
const HomePage = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <div className='min-h-screen w-full bg-[#faf8f5]  h-auto'>
                <div className=" flex flex-col justify-center h-auto  py-[60px] bg-bannerGreen px-10 ">


                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-bold text-neutral3 mb-8">Welcome to <span className='text-primary'>Blogify</span></h1>
                        <p className="text-lg font-semibold text-gray-600 mb-5">
                            Welcome to our blog website, where you can share your thoughts, insights, and stories with the world! We believe that everyone has a unique perspective to offer, and we are excited to provide a platform for you to do just that.

                            Our blog website is designed to be user-friendly and accessible to anyone who wants to write. Whether you're an experienced blogger or just starting out, we have everything you need to create a high-quality post that will engage and inform your readers.

                        </p>

                        <div className="flex space-x-4 mt-20">

                            <CustomButton onClick={() => navigate("auth/login")} text={"sign in"} type={'primary'} classes={'py-3 px-6 bg-primaryCta text-primaryCtaColor rounded-lg  focus:outline-none border-2 border-primaryCtaColor focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'} />

                            <CustomButton onClick={() => navigate("/blogs/all")} text={"explore"} type={'secondary'} classes={'py-3 px-6 bg-primaryCta text-primaryCtaColor rounded-lg  focus:outline-none border-2 border-primaryCtaColor focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'} />

                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}

export default HomePage
