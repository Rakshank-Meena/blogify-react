const CustomButton = (props: { type: string, text: string, classes: string, onClick: any }) => {
    const { type, text, classes, onClick } = props
    return (type === 'primary' ? (
        <button
            onClick={onClick}
            className={`bg-primary text-sm md:text-base uppercase hover:bg-linkHover text-white font-bold py-2 px-4 rounded-full md:rounded  ${classes}`}>
            {text}
        </button>
    ) : (
        <button
            onClick={onClick}
            className={`bg-secondary text-sm md:text-base uppercase hover:bg-linkHover text-white font-bold py-2 px-4 rounded-full md:rounded ${classes}`}>
            {text}
        </button>
    ))
}
export default CustomButton;