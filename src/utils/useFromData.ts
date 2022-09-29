import {FormEvent, useState} from 'react';
import {Maybe} from '@app/utils/maybe';

export type FieldType = number | string | boolean | FieldType[]

export type FieldValidator<T> = (
    fieldName: keyof T,
    fieldValue: T[keyof T],
    ...args: any[]
) => string | undefined;

export type FormValidator<T> = (
    data: T,
    addError: (field: keyof T, error: string) => void,
    validateField: (
        fieldName: keyof T,
        validator: FieldValidator<T>,
        ...args: any[]
    ) => void,
) => void

export interface FieldDefinition {
    title?: string;
    description?: string;
    type: 'set' | 'boolean' | 'string' | 'number';
    // items?: any[];
}

export type Scheme<T> = Record<keyof T, FieldDefinition & any>

type FormErrors<T> = {
    readonly [ key in keyof T ]?: string | string[];
}

type FormErrorList<T> = {
    readonly fieldName: keyof T;
    readonly error: string;
}[];

class ErrorList<T> {
    private errorList: FormErrorList<T>;

    constructor() {
        this.errorList = [];
    }

    public addError (fieldName: keyof T, error: string) {
        this.errorList.push({fieldName, error});
    }

    public hasErrors() {
        return this.errorList.length > 0;
    }

    public getErrors() {
        return this.errorList.reduce((result, errorItem) => {
            const err: string | string[] | undefined = result[errorItem.fieldName];
            if (!err) {
                return {...result, [errorItem.fieldName]: errorItem.error};
            }
            if (Array.isArray(err)) {
                return {...result, [errorItem.fieldName]: [...err, errorItem.error]};
            }

            return {...result, [errorItem.fieldName]: [err, errorItem.error]};
        }, {} as FormErrors<T>);
    }
}

export function useFromData<T extends object> (initialData: T, validate?: FormValidator<T>) {
    const [formData, setFormData] = useState<T>(initialData);

    const [errors, setErrors] = useState<Maybe<FormErrors<T>>>({});

    const setField = <K extends keyof T>(fieldName: K) => (value: T[K]) => {
        setFormData({...formData, [fieldName]: value});
    };

    const submitForm = (submitHandler?: (data: T) => void) => (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors(undefined);

        if (validate) {
            const errorList = new ErrorList<T>();

            const addError = (field: keyof T, error: string) => errorList.addError(field, error);

            const validateField = (fieldName: keyof T, validator: FieldValidator<T>, ...args: any[]) => {
                const fieldError = validator(fieldName, formData[fieldName], ...args);
                if (fieldError) {
                    addError(fieldName, fieldError);
                }
            };

            validate(formData, addError, validateField);

            if (errorList.hasErrors()) {
                setErrors(errorList.getErrors());
                return false;
            }
        }

        submitHandler && submitHandler(formData);
        return true;
    };

    const getField = <K extends keyof T>(fieldName: K) => {
        return formData[fieldName];
    };

    const getError = <K extends keyof T>(fieldName: K) => {
        return errors?.[fieldName];
    };

    const getAllFieldProps = <K extends keyof T>(fieldName: K) => ({
        name: fieldName,
        value: getField(fieldName),
        onChange: setField(fieldName),
        errorMessage: getError(fieldName),
    });

    return {getField, setField, submitForm, getError, getAllFieldProps};
}


function validateNotEmpty(fieldName: string, fieldValue: FieldType) {
    if (!fieldValue) {  //
        return `${fieldName}  should not be empty`;
    }
}

export const validate = {
    NotEmpty: validateNotEmpty
};
