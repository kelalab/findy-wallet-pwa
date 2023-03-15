import { For } from "solid-js";
import Box from "./Box";

const Nav = (props) => {
    const {animation, gap, align, direction} = props;
    console.log('nav', animation, gap, align, direction);

    let gapClass='';
    if(direction){
        if(direction === 'column'){
            if(gap === 'small'){
                gapClass='h-2'
            }
        }
    }else{

    }

    return <Box {...props}/>
}

export default Nav;