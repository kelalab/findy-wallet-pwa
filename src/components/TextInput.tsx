const TextInput = (props) => {

    const handleChange = (e) => {
        console.log('handleChange', e);
        props.onChange(e);
    }

    return <input type="text" class="border-2 rounded-md p-3 w-full text-lg" placeholder={props.placeholder} name={props.name} maxLength={props.maxLength} value={props.value} onChange={handleChange}/>
}

export default TextInput;