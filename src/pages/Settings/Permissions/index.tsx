import React from 'react';
import styles from './styles.scss';
import {FieldControl, FormField} from '@app/layout/FormField';
import {Dropdown} from '@app/components/Dropdown';
import {Multiselect} from '@app/components/Multiselect';
import {log} from '@app/utils/debug';
import { Controller, useForm } from 'react-hook-form';
import {SubmitButton} from '@app/components/Button';
import {ContentNarrow} from '@app/layout';


export type PermissionModel = {
    readonly share: string;
    readonly files: string[];
    readonly view: string;
}

export const scheme = {
    share: {
        title: 'Share',
        description: 'Select who will be able to share this hub.',
        items: [
            {text: 'Anyone', value: '0'},
            {text: 'Selected group', value: '1'},
            {text: 'Admin only', value: '2'}
        ]
    },
    files: {
        title: 'Add/copy file',
        description: 'Select who will be able to add/copy this hub files.',
        items: [
            {text: 'Group 1', value: '0'},
            {text: 'Group 2', value: '1'},
            {text: 'Group 3', value: '2'}
        ]
    },
    view: {
        title: 'View',
        description: 'Select who will be able to view this hub.',
        items: [
            {text: 'Private', value: '0'},
            {text: 'Public', value: '1'},
        ]
    },
};

export const AccessPermissions: React.FC = () => {
    const doSubmit = (data: PermissionModel) => {
        log.Info('submitting', data);
    };

    const { control, handleSubmit } = useForm<PermissionModel>({
        defaultValues: {
            share: '',
            files: [''],
            view: '',
        },
        mode: 'onBlur',
    });
    
    return (
        <form onSubmit={handleSubmit((doSubmit))}>
            <ContentNarrow className={styles.pageContent}>
                <FormField title={scheme.share.title} subTitle={scheme.share.description}>
                    <Controller
                        name='share'
                        control={control}
                        render={({ field, }) => (
                            <FieldControl name='share'>
                                <Dropdown
                                    items={scheme.share.items}
                                    placeholder='select option'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FieldControl>
                        )}
                    />
                </FormField>

                <FormField title={scheme.files.title} subTitle={scheme.files.description}>
                    <Controller
                        name='files'
                        control={control}
                        render={({ field, }) => (
                            <FieldControl name='files'>
                                <Multiselect
                                    items={scheme.files.items}
                                    placeholder='select group'
                                    {...field}
                                />
                            </FieldControl>
                        )}
                    />
                </FormField>

                <FormField title={scheme.view.title} subTitle={scheme.view.description} className={styles.view}>
                    <Controller
                        name='view'
                        control={control}
                        render={({ field, }) => (
                            <FieldControl name='view'>
                                <Dropdown
                                    items={scheme.view.items}
                                    placeholder='select option'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FieldControl>
                        )}
                    />
                </FormField>
                <SubmitButton kind='primary' size='medium' className={styles.submitBtn}>Save</SubmitButton>
            </ContentNarrow>
        </form>
    );
};