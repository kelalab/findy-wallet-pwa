const Image = (props) => {
    const {src, fit} = props;
    return <img class={`${fit?'object-contain ':''}`} src={src}></img>
}

export default Image;