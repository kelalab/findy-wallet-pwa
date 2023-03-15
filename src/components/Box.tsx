import { For } from "solid-js";

export interface BoxProps{
    direction: string
}

const Box = (props:any) => {
    console.log('Box', props);
    let cls=props.class;
    let gapClass='';
    if(!props.direction || 'column' === props.direction){
        cls=cls+' flex-col ';
        if(props.direction === 'column'){
            if(props.gap === 'small'){
                gapClass='h-2'
            }
        }
    }else{
        cls=cls+ ' flex-row ';
        if(props.gap === 'small'){
            gapClass='w-2'
        }else if(props.gap === 'medium'){
            gapClass='w-4'
        }else if(props.gap === 'large'){
            gapClass='w-16'
        }
    }
    if(props.align){
        cls=`${cls}items-${props.align} `
    }else{
        cls=`${cls}items-center `
    }
    if(props.flex !== undefined){
        if(!props.flex){
            cls=`${cls}flex-none `
        }
    }
    if(props.elevation){
        if(props.elevation === 'medium'){
            cls=`${cls}drop-shadow-md `
        }
    }
    console.log('cls', cls);
    console.log('gapcls', gapClass);
    return (
    <div class={`flex ${cls}${props.fill?'w-full ':''}${props.background?`bg-${props.background} `:''}`}>
        <For each={props.children} fallback={props.children}>
            {(item) => {
                return (
                    <>
                        {props?.gap&&
                            <Box class={gapClass}></Box>
                        }
                        {item}
                    </>
                );
            }}
        </For>
    </div>)
}

export default Box;