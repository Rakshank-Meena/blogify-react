const CommentsList = (props: any) => {
    return (
        <div className="space-y-4">
            {props.CommentsArr.map((item: any, i: number) => (
                <div key={`comment${i}`} className="flex border px-3 py-2 rounded-lg shadow-md border-neutral1">
                    <div className="flex-grow">
                        <h3 className="text-secondary text-lg font-bold capitalize">{item.user}</h3>
                        <p className="text-default">{item.comment}</p>

                    </div>
                </div>
            ))}

        </div>
    )
}
export default CommentsList
