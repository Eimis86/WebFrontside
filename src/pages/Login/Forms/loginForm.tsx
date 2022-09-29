import React from 'react';
import styles from './styles.scss';

import {useLogin} from '@app/store/user';
import {FieldControl} from '@app/layout/FormField';
import {TextInput} from '@app/components/TextInput';
import {Password} from '@app/components/Password';
import {FlexRow} from '@app/layout/Flexbox';
import {Checkbox} from '@app/components/Checkbox';
import {Button, SubmitButton, ToolButton} from '@app/components/Button';
import {AuthenticateErrorMessage} from './errorMessage';
import {AuthenticateFormProps} from './types';
import {Controller, useForm} from 'react-hook-form';
import {Divider} from '@app/components/Divider';

interface LoginData {
    readonly email: string;
    readonly password: string;
    readonly remember: boolean;
}

export const LoginForm: React.FC<AuthenticateFormProps> = ({doChangeState}) => {
    const {login} = useLogin();

    const { control, handleSubmit } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    });

    return (
        <>
            <div className={styles.title}>Please Log in</div>

            <AuthenticateErrorMessage/>

            <form className={styles.loginForm} onSubmit={handleSubmit(login)}>
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: 'Email should not be empty'
                    }}
                    render={({ field, fieldState}) => (
                        <FieldControl name='name' error={fieldState.error}>
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
                    render={({ field, fieldState}) => (
                        <FieldControl name='password' error={fieldState.error}>
                            <Password placeholder='Password' {...field}/>
                        </FieldControl>
                    )}
                />

                <FlexRow kind='wide' wrap={true}>
                    <Controller
                        name='remember'
                        control={control}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='remember' error={fieldState.error}>
                                <Checkbox {...field}>
                                    Remember Me
                                </Checkbox>
                            </FieldControl>
                        )}
                    />

                    <Button kind='link' onClick={() => doChangeState('Recovery')}>Forgot Password?</Button>
                </FlexRow>

                <SubmitButton name='submit' kind='primary'>Login</SubmitButton>
            </form>

            <FlexRow kind={'center'} wrap={true}>
                {'Don\'t have an account? '} <Button kind='link' onClick={() => doChangeState('SignUp')}>Sign Up</Button>
            </FlexRow>
        </>
    );
};
