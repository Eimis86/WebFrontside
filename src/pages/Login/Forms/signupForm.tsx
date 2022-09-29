import React, {useEffect} from 'react';
import styles from './styles.scss';

import {useSignup} from '@app/store/user';
import {FieldControl} from '@app/layout/FormField';
import {TextInput} from '@app/components/TextInput';
import {Password} from '@app/components/Password';
import {Button, SubmitButton, ToolButton} from '@app/components/Button';
import {FlexRow} from '@app/layout/Flexbox';
import {AuthenticateErrorMessage} from './errorMessage';
import {AuthenticateFormProps} from './types';
import {Checkbox} from '@app/components/Checkbox';
import {Controller, useForm} from 'react-hook-form';
import {Divider} from '@app/components/Divider';
import {displaySystemMessage} from '@app/components/SystemMessage';

interface SignupData {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly passwordConfirm: string;
    readonly termsAndConditions: boolean;
}

export const SignupForm: React.FC<AuthenticateFormProps> = ({doChangeState}) => {
    const {signup, state} = useSignup();

    const { control, handleSubmit, getValues } = useForm<SignupData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            termsAndConditions: false
        }
    });

    useEffect(() => {
        if (state === 'Success') {
            displaySystemMessage('success', 'Email has been sent!', 'Please check your email and follow the link');
            doChangeState('Login');
        }
    }, [state]);

    return (
        <>
            <div className={styles.title}>Please Sign up</div>

            <AuthenticateErrorMessage/>

            <form className={styles.signupForm} onSubmit={handleSubmit(signup)}>
                <Controller
                    name='name'
                    control={control}
                    rules={{
                        required: 'Name should not be empty'
                    }}
                    render={({ field, fieldState, }) => (
                        <FieldControl name='name' error={fieldState.error}>
                            <TextInput placeholder='Name' {...field}/>
                        </FieldControl>
                    )}
                />

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
                            <Password placeholder='Password' {...field}/>
                        </FieldControl>
                    )}
                />

                <Controller
                    name='termsAndConditions'
                    control={control}
                    rules={{
                        required: 'You have to agree with terms and condition'
                    }}
                    render={({ field, fieldState, }) => (
                        <FieldControl name='termsAndConditions' error={fieldState.error}>
                            <Checkbox {...field}>
                                Agree to Terms & Conditions
                            </Checkbox>
                        </FieldControl>
                    )}
                />

                <SubmitButton name='submit' kind='primary'>Sign Up</SubmitButton>
            </form>

            <FlexRow kind={'center'}>
                Already have an account? <Button kind='link' onClick={() => doChangeState('Login')}>Login</Button>
            </FlexRow>
        </>
    );
};
