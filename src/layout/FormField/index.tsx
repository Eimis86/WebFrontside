import React, {PropsWithChildren, ReactElement, ReactNode, useContext} from 'react';
import styles from './styles.scss';

import {ApplicationContext} from '@app/AppContext';
import {Description} from '@app/layout';
import classnames from 'classnames';
import {ErrorMessage} from '@app/layout/ErrorMessage';
import _ from 'lodash';
import {FieldType} from '@app/utils/useFromData';

export interface InputControlProps<T extends FieldType> {
    readonly hasError: boolean;
}

export interface FieldControlProps<T extends FieldType> {
    readonly name: string;
    readonly className?: string;
    readonly error?: string | string[] | {message?: string;};
    readonly children: ((props: PropsWithChildren<InputControlProps<T>>) => ReactElement<InputControlProps<T>> | null) | ReactElement<InputControlProps<T>>;
    // readonly children: ReactElement<InputControlProps> | ((props: InputControlProps) => ReactElement);
}

type FieldControlComponent = <T extends FieldType>(props: FieldControlProps<T>, context?: any) => ReactElement<any, any> | null;

function renderField<T extends FieldType>(element: ReactNode, props: InputControlProps<T>): JSX.Element {

    const propKeys = Object.keys(props) as (keyof InputControlProps<T>)[];
    const usedKeys = propKeys.filter((key: keyof InputControlProps<T>) => props[key] != undefined);
    const usedProps = Object.fromEntries(usedKeys.map(key => [key, props[key]]));

    if (React.isValidElement(element)) {
        return React.cloneElement(element, usedProps);
    } else if (_.isFunction(element)) {
        return element(usedProps);
    }
    else {
        return (<>{element}</>);
    }
}

export const FieldControl: FieldControlComponent = ({
    name,
    className,
    error,
    children
}) => {
    return (
        <div className={classnames(styles.fieldControl, className)} data-field={name}>
            {renderField(children, {hasError: !!error})}
            <ErrorMessage name={name} error={error}/>
        </div>
    );
};

type FieldAlign = 'top' | 'bottom' | 'center';
export interface FormFieldProps {
    readonly title?: string;
    readonly subTitle?: ReactNode;
    readonly className?: string;
    readonly align?: FieldAlign;
}

export const FormField: React.FC<FormFieldProps> = ({
    title,
    subTitle,
    className,
    align= 'top',
    children
}) => {
    const fieldAligns: Record<FieldAlign, string> = {
        'top': styles.formFieldAlignTop,
        'center': styles.formFieldAlignCenter,
        'bottom': styles.formFieldAlignBottom
    };

    return (
        <div className={classnames(styles.formField, fieldAligns[align], className)}>
            <div className={styles.formField__description}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
            </div>
            <div className={styles.formField__control}>
                {children}
            </div>
        </div>
    );
};
