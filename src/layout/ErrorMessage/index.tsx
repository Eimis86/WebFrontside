import React from 'react';
import styles from './styles.scss';

export const ErrorMessage: React.FC<{
    readonly name: string;
    readonly error?: string | string[] | {message?: string;};
}> = ({ name, error }) => {
    if (!error) {
        return null;
    }

    if (typeof error !== 'string' && !Array.isArray(error) && !error.message) {
        return null;
    }

    const renderError = () => {
        if (typeof error === 'string') {
            return (error);
        }

        if (Array.isArray(error)) {
            return (error.join('. '));
        }

        return error.message;
    };

    return (
        <span
            id={`error-${name}`}
            className={styles.fieldError}
        >
            {renderError()}
        </span>
    );
};
