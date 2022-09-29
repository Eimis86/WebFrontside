import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.scss';

import {ToolButton} from '@app/components/Button';
import {Icon} from '@app/components/Icon';
import {TextInput} from '@app/components/TextInput';
import {FieldControl} from '@app/layout/FormField';
import classnames from 'classnames';

function useEmailList(emails?: string[]) {
    const [list, setEmails] = useState<string[]>(emails || []);

    const add = (email: string) => {
        //do not ass already existed email
        setEmails(prevState =>
            prevState.find(item => item === email)
                ? prevState
                : [...prevState, email]
        );
    };

    const remove = (email: string) => {
        setEmails(prevState => prevState.filter(value => value !== email));
    };

    return {list, add, remove};
}

const EmailItem: React.FC<{
    readonly email: string;
    readonly onDelete: (email: string) => void;
}> = ({email, onDelete}) => (
    <span className={styles.emailItem}>
        {email}
        <button
            className={styles.deleteButton}
            onClick={() => onDelete(email)}
            type={'button'}
        >
            <Icon name='close_m' className={styles.deleteIcon}/>
        </button>
    </span>
);

const isValidEmail = (email: string) => /^\S+@\S+$/.test(email);

export const EmailList: React.FC<{
    readonly onChange: (emails: string[]) => void;
    readonly className?: string;
}> = ({onChange, className}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const emails = useEmailList();

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emails.list.length) {
            onChange(emails.list);
        }
        else if (value) {
            onChange([value]);
        }
        else {
            onChange([]);
        }
    }, [emails.list, value]);

    const addEmail = (newEmail: string) => {
        if (!newEmail) {
            setError('Email is required');
            return;
        }

        if (!isValidEmail(newEmail)) {
            setError('Please enter correct email');
            return;
        }

        if (emails.list.length >= 10) {
            setError('The maximum limit of emails (10) has been reached');
            return;
        }

        if (emails.list.find(item => item === newEmail)) {
            setError('You have already added this email');
            return;
        }

        emails.add(newEmail);
        setValue('');
    };

    return (
        <>
            <FieldControl name='email' error={error}>
                <TextInput
                    ref={ref}
                    type='email'
                    placeholder='Enter email here'
                    value={value}
                    className={classnames(className)}
                    onChange={setValue}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            addEmail(value);
                            e.preventDefault();
                        } else {
                            setError('');
                        }
                    }}
                    childrenAfter={(
                        <ToolButton
                            onClick={() => {
                                addEmail(value);
                                ref.current && ref.current.focus();
                            }}
                        >
                            <Icon name='plus'/>
                        </ToolButton>
                    )}
                />
            </FieldControl>

            <div className={styles.emailList}>
                {emails.list.map((value, idx) => (
                    <EmailItem
                        key={idx}
                        email={value}
                        onDelete={(value) => emails.remove(value)}
                    />
                ))}
            </div>
        </>
    );
};
