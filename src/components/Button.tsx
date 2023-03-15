import Box from "./Box";

const Button = (props) => {
    console.log('Button', props);
    const {label, icon, round, onClick} = props;
    let cls = props.class;
    if(!round){
        cls = cls + " rounded-2xl";
    }
    return (
        <button class={cls} 
                onClick={onClick}>
            {icon ? 
                <Box direction="row" gap="small">{label}{icon}</Box>
                :
                label}
        </button>)
}

export const GreyButton = (props) => {
    return <Button class="bg-slate-900 text-white px-4 py-2" {...props}/>
}

export default Button;