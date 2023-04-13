import { Link } from "react-router-dom"

const BlogList = (props: { author: string, title: string, blogId: string }) => {
    const { author, title, blogId } = props

    //function for adding dots and slicing string
    const add3dots = (text: string, char: number) => {
        return `${text.slice(0, char)}...`
    }
    return (
        <>
            <div className="bg-orange-50 border-neutral2 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:h-28  ">{title.length > 75 ? add3dots(title, 70) : title}</h2>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                            <span className="text-gray-600 text-sm mr-2 capitalize">Author:</span>
                            <span className="text-gray-800 text-sm">{author}</span>
                        </div>
                    </div>
                    <Link to={`/blog-detail/${blogId}`} className="text-blue-500  my-auto hover:text-blue-600">Read more</Link>
                </div>
            </div>
        </>
    )
}
export default BlogList