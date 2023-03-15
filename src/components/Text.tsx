const Text = (props:any) => {
    console.log('Text', props)
    return <span>{props.children}</span>
}
export default Text;