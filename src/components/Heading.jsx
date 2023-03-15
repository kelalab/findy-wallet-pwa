import { Dynamic } from "solid-js/web";

const Heading = (props) => {
    const {level} = props;
    const textSize = ['', '2xl', 'xl', 'lg', 'md', 'md'];
    let cls = props.class || '';
    cls = `${cls} heading text-${textSize[level]}`.trim();
    const as = `h${level}`
    return <Dynamic class={cls} component={as} children={props.children} />
}

export default Heading;