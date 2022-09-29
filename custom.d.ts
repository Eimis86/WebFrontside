declare module '*.svg' {
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const content: string;
    export default content;
}

declare module '*.png' {
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const content: string;
    export default content;
}


declare module '*.scss' {
    const classes: { [key: string]: string; };
    export default classes;
}
