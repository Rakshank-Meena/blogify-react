import React from 'react'

const LazyLoader = (props: { type?: string }) => {
    if (props.type === "home") {
        return (
            <>
                <div className="w-screen h-screen  bg-white p-5 opacity-10 animate-pulse">
                    <div className='border-2 h-full w-full'>
                        <div className='w-full h-3/5 bg-white px-2'>
                            <div className='w-full my-3 rounded-lg h-1/5 bg-neutral1'>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                            </div>
                            <div className='w-full my-3 rounded-lg h-1/5 bg-neutral1'>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                            </div>
                            <p className='w-full my-3 rounded-lg h-1/5 bg-neutral1'></p>
                            <div className='w-full my-3 rounded-lg h-1/5 bg-neutral1'>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                                <p className='w-full my-3 rounded-lg h-1/5 bg-neutral2'></p>
                            </div>
                            <p className='w-full my-3 rounded-lg h-1/5 bg-neutral1'></p>
                        </div>
                        <div className='w-full h-1/5 bg-neutral1'>
                            <span className='w-full my-1 h-full bg-neutral2'>

                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        const arr = [1, 2, 3]
        return (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto lg:w-[62rem] p-10 opacity-50'>
                {arr.map((item: any, i: number) => {
                    return (
                        <div key={`lazy${i}`} className="bg-white shadow-xl rounded-xl p-6  h-32 w-full lg:h-52 animate-pulse">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:h-28 h-3/5 w-full bg-neutral1 rounded-lg "><span></span></h2>
                            <div className="flex justify-between items-center h-1/5 w-full bg-neutral2 rounded-lg">
                                <div className="flex justify-between items-center ">
                                    <div className="flex items-center">
                                        <span className="text-gray-600 text-sm mr-2 capitalize"></span>
                                        <span className="text-gray-800 text-sm"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default LazyLoader