const Anchor = (props) => {
    console.log('Anchor', props);
    return <a id={props.id} class={props.class} onClick={props.onClick}>{props.children}</a>
} 
export default Anchor;