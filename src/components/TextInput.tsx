const TextInput = (props) => {

    const handleChange = (e) => {
        console.log('handleChange', e);
        props.onChange(e);
    }

    return <input type="text" placeholder={props.placeholder} name={props.name} maxLength={props.maxLength} value={props.value} onChange={handleChange}/>
}

export default TextInput;