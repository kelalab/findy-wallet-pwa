import Box from "./Box";

const Header = (props:any) => {
    console.log('Header', props);
    const {justify, direction} = props;
    let dir = direction || 'flex-row'
    const cls = `flex max-w-full bg-white ${justify?'justify-items-'+justify+' ':''}${props.class}`
    return <Box align={props.align || 'center'} 
                gap={props.gap || 'medium'} 
                class={cls} 
                flex={false} 
                direction={dir} 
                {...props}>{props.children}
            </Box>
}

export default Header