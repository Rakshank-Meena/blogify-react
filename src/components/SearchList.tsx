
const SearchList = (props: { title: string, blogId: string }) => {
    const { blogId, title } = props
    return (
        <>
            <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-t-2 mt-1 lg:border-none"
            >
                <a href={`/blog-detail/${blogId}`}>
                    {title}
                </a>
            </li>

        </>
    )
}
export default SearchList