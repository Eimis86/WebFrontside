import React, {ReactNode} from 'react';
import _ from 'lodash';

export function renderElement(element: ReactNode, props: any): JSX.Element {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props);
    } else if (_.isFunction(element)) {
        return element(props);
    }
    else {
        return (<>{element}</>);
    }
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}
