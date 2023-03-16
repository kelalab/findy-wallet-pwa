import { Dynamic } from "solid-js/web";

const Heading = (props) => {
    const {level} = props;
    const textSize = ['', '2xl', 'xl', 'lg', 'md', 'md'];
    let cls = props.class || '';
    cls = `${cls} heading text-${textSize[level]}`.trim();
    const as = `H${level}`
    switch(level){
        case 1: 
            return <H1 {...props}/>
        case 2: 
            return <H2 {...props}/>
        default:{
            return <H1 {...props}/>
        }
    }
}

const H1 = (props) => {
    return <h1 class="text-6xl">{props.children} </h1>
}

const H2 = (props) => {
    return <h2 class="text-4xl font-medium my-7">{props.children} </h2>
}

export default Heading;