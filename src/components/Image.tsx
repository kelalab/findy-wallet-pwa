const Image = (props) => {
    const {src, fit} = props;
    return <img alt={props.alt} class={`${fit?'object-contain ':''} ${props.class}`} src={src}></img>
}

export default Image;