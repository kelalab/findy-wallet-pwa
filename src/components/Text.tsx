const Text = (props:any) => {
    console.log('Text', props)
    const {size, margin} = props;
    switch(size){
        case 'small':
            return <SmallText {...props} />
        case 'medium':
            return <MediumText {...props} />
        default: 
            return <span>{props.children}</span>

    }
}

const MediumText = (props:any) => {
    console.log('Text', props)
    return <span class="text-lg">{props.children}</span>
}

const SmallText = (props:any) => {
    console.log('Text', props)
    return <span class="text-sm">{props.children}</span>
}

export default Text;