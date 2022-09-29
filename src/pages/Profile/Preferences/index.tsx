import React from 'react';
import styles from './styles.scss';

import { log } from '@app/utils/debug';
import { Controller, useForm } from 'react-hook-form';
import { FieldControl, FormField } from '@app/layout/FormField';
import {Toggle} from '@app/components/Toggle';
import {Button} from '@app/components/Button';



export type PreferencesModel = {
    readonly appNotification: boolean;
    readonly emailNotification: boolean;
}


export const Preferences: React.FC = () => {
    const doSubmit = (data: PreferencesModel) => {
        log.Info('submitting', data);
    };

    const { control, handleSubmit, getValues } = useForm<PreferencesModel>({
        defaultValues: {
            appNotification: false,
            emailNotification: false
        },
        mode: 'onBlur',
    });

    return (
        <>
            {/* <form onSubmit={handleSubmit((doSubmit))}>
                <FormField title='App notification' subTitle='Get all app notifications' align={'bottom'}>
                    <Controller
                        name='appNotification'
                        control={control}
                        render={({ field, }) => (
                            <FieldControl name='appNotification'>
                                <Toggle
                                    name='appNotification'
                                    value={field.value}
                                    onChange={field.onChange}
                                    label={field.value ? 'On' : 'Off'}
                                />
                            </FieldControl>
                        )}
                    />
                </FormField>

                <FormField title='Email notification' subTitle='Send me email notifications' align={'bottom'}>
                    <Controller
                        name='emailNotification'
                        control={control}
                        render={({ field, }) => (
                            <FieldControl name='emailNotification'>
                                <Toggle
                                    name='emailNotification'
                                    value={field.value}
                                    onChange={field.onChange}
                                    label={field.value ? 'On' : 'Off'}
                                />
                            </FieldControl>
                        )}
                    />
                </FormField>
            </form>  - hiding?*/}

            <FormField
                title='Delete my account'
                subTitle={<>
                    This action will delete your account permanently.
                    <br/>
                    Be sure if you want that.
                </>}
                align={'center'}
            >
                <Button kind='red' size='medium'>Delete account</Button>
            </FormField>
        </>
    );
};
