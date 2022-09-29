import React, {useEffect, useState} from 'react';
import styles from './styles.scss';

import {useRecover} from '@app/store/user';
import {FieldControl} from '@app/layout/FormField';
import {TextInput} from '@app/components/TextInput';
import {Button, SubmitButton} from '@app/components/Button';
import {Description} from '@app/layout';
import {PinCode} from '@app/components/PinCode';
import {Password} from '@app/components/Password';
import {AuthenticateErrorMessage} from './errorMessage';
import {AuthenticateFormProps} from './types';
import {Controller, useForm} from 'react-hook-form';
import {displaySystemMessage} from '@app/components/SystemMessage';

interface RecoveryData {
    readonly email: string;
    readonly password: string;
    readonly passwordConfirm: string;
    readonly pin: string;
}

export const RecoveryForm: React.FC<AuthenticateFormProps> = ({doChangeState}) => {
    const {sendEmail, checkPin, resetPassword, resetState, recoverState} = useRecover();

    const { control, handleSubmit, getValues } = useForm<RecoveryData>({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            pin: ''
        }
    });

    useEffect(() => {
        if (recoverState === 'VerifyPin') {
            displaySystemMessage('success', 'Email has been sent!', 'Enter the code you have received on your email.');
        }

        if (recoverState == 'Recovered') {
            displaySystemMessage('success', 'Successful!', 'Your password has been changed successfully!');
            doChangeState('Login');
        }
    }, [recoverState]);

    return (
        <>
            <div className={styles.title}>{recoverState === 'VerifyPin' ? 'Verifications' : 'Enter New Password'}</div>

            <AuthenticateErrorMessage/>

            {recoverState === 'SendEmail' &&
                <form className={styles.recoveryForm} onSubmit={handleSubmit(data => {
                    sendEmail(data);
                })}>
                    <Controller
                        name='email'
                        control={control}
                        rules={{
                            required: 'Email should not be empty'
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='email' error={fieldState.error}>
                                <TextInput placeholder='Email' {...field}/>
                            </FieldControl>
                        )}
                    />


                    <SubmitButton kind='primary'>Send PIN</SubmitButton>
                </form>
            }

            {recoverState === 'VerifyPin' &&
                <form className={styles.recoveryForm} onSubmit={handleSubmit(data => {
                    checkPin(data);
                })}>
                    <Description>Enter the code you have received on your email.</Description>

                    <Controller
                        name='pin'
                        control={control}
                        rules={{
                            required: 'Pin should not be empty'
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='pin' error={fieldState.error}>
                                <PinCode size={6}  {...field}/>
                            </FieldControl>
                        )}
                    />

                    <Button name='resend' kind='link' onClick={() => {
                        resetState();
                    }}>Resend Email</Button>

                    <SubmitButton kind='primary'>Next</SubmitButton>
                </form>
            }

            {recoverState === 'ResetPassword' &&
                <form className={styles.recoveryForm} onSubmit={handleSubmit(data => {
                    resetPassword(data);
                })}>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: 'Password should not be empty'
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='password' error={fieldState.error}>
                                <Password placeholder='Password' {...field}/>
                            </FieldControl>
                        )}
                    />

                    <Controller
                        name='passwordConfirm'
                        control={control}
                        rules={{
                            validate: (value) => {
                                if (value !== getValues('password')) {
                                    return 'Passwords doesn\'t match';
                                }
                            }
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='passwordConfirm' error={fieldState.error}>
                                <Password placeholder='Repeat Password' {...field}/>
                            </FieldControl>
                        )}
                    />

                    <SubmitButton kind='primary'>Confirm</SubmitButton>
                </form>
            }

            <Button name='submit' kind={'secondary'} onClick={() => doChangeState('Login')}>Cancel</Button>
        </>
    );
};
