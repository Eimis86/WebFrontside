import React, { useState } from 'react';
import styles from './styles.scss';
import { Controller, DefaultValues, useForm } from 'react-hook-form';
import { FieldControl, FormField } from '@app/layout/FormField';
import { TextInput } from '@app/components/TextInput';
import { FlexCol } from '@app/layout/Flexbox';
import { Password } from '@app/components/Password';
import { FileUpload } from '@app/components/FileUpload';
import { FlexRow } from '@app/layout/Flexbox';
import {useUserProfile} from '@app/store/profile';
import {UserProfile} from '@app/store/profile/types';
import {Button, SubmitButton} from '@app/components/Button';


type DetailsEditData = {
    readonly imageStr: string;
    readonly email: string;
    readonly name: string;
    readonly oldPassword: string;
    readonly newPassword: string;
    readonly newPasswordConfirm: string;
}

export const texts = {
    image: {
        title: 'Change image',
        description: 'Manage your settings and preferences here.',
    },
    userName: {
        title: 'Name',
        description: 'Manage your settings and preferences here.',
    },
    email: {
        title: 'Email',
        description: 'Manage your settings and preferences here.',
    },
    password: {
        title: 'Set password',
        description: 'Manage your settings and preferences here.',
    }
};

function binaryToImage(src: string) {
    return 'data:image/bmp;base64,' + window.btoa(src);
}

const DetailsForm: React.FC<{
    readonly profile: UserProfile;
    readonly onSubmit: (data: DetailsEditData) => void;
}> = ({profile, onSubmit}) => {
    const [imgPreview, setImgPreview] = useState<string>();

    const defaultValues: DefaultValues<DetailsEditData> = {
        imageStr: '',
        email: profile?.email,
        name: profile?.name,
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    };

    const { control, handleSubmit, getValues, reset } = useForm<DetailsEditData>({
        defaultValues,
        mode: 'onBlur',
    });

    const userImage = imgPreview || profile?.imageUrl || '/resources/img/no-avatar.png';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <FormField title={texts.image.title} subTitle={texts.image.description} className={styles.formField}>
                <Controller
                    name='imageStr'
                    control={control}
                    render={({ field, }) => (
                        <FlexRow gap={'large'}>
                            <div className={styles.imagePreview}>
                                <img src={userImage} alt='profileImage'/>
                            </div>
                            <FileUpload
                                accept={['image/jpeg', 'image/gif', 'image/png']}
                                isMultiple={false}
                                onChange={(file) => {
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            if (ev.target?.result) {
                                                field.onChange(ev.target?.result as string);
                                                setImgPreview(binaryToImage(ev.target?.result as string));
                                            }
                                        };
                                        reader.readAsBinaryString(file);
                                    }
                                }}
                            >
                                <Button kind='outlined' size='medium'>Change image</Button>
                            </FileUpload>
                        </FlexRow>
                    )}
                />
            </FormField>

            <FormField title={texts.userName.title} subTitle={texts.userName.description} className={styles.formField}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field, }) => (
                        <FieldControl name='name'>
                            <TextInput
                                placeholder={field.value}
                                value={field.value}
                                onChange={field.onChange}
                                className={styles.userName}
                            />
                        </FieldControl>
                    )}
                />
            </FormField>

            <FormField title={texts.email.title} subTitle={texts.email.description} className={styles.formField}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field, }) => (
                        <FieldControl name='email'>
                            <TextInput
                                placeholder={field.value}
                                value={field.value}
                                onChange={field.onChange}
                                className={styles.email}
                            />
                        </FieldControl>
                    )}
                />
            </FormField>

            <FormField title={texts.password.title} subTitle={texts.password.description} className={styles.setPassword}>
                <FlexCol gap='medium'>
                    <Controller
                        name='oldPassword'
                        control={control}
                        rules={{
                            validate: (value) => {
                                if (getValues('newPassword')) {
                                    return true;
                                }
                            }
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='oldPassword' error={fieldState.error}>
                                <Password placeholder='Current password' {...field}/>
                            </FieldControl>
                        )}
                    />

                    <Controller
                        name='newPassword'
                        control={control}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='newPassword' error={fieldState.error}>
                                <Password placeholder='New password' {...field}/>
                            </FieldControl>
                        )}
                    />

                    <Controller
                        name='newPasswordConfirm'
                        control={control}
                        rules={{
                            validate: (value) => {
                                if (value !== getValues('newPassword')) {
                                    return 'Passwords doesn\'t match';
                                }
                            }
                        }}
                        render={({ field, fieldState, }) => (
                            <FieldControl name='confirmNewPassword' error={fieldState.error}>
                                <Password placeholder='Confirm new password' {...field}/>
                            </FieldControl>
                        )}
                    />
                </FlexCol>
            </FormField>
            <FlexRow className={styles.buttons}>
                <Button kind='secondary' size='medium' onClick={() => reset(defaultValues)}>Discard</Button>
                <SubmitButton kind='primary' size='medium'>Save</SubmitButton>
            </FlexRow>
        </form>
    );
};

export const Details: React.FC = () => {
    const profile = useUserProfile();

    const doSubmit = (data: DetailsEditData) => {
        profile.update(data.newPassword
            ? {
                email: data.email,
                name: data.name,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                imageStr: data.imageStr
            } : {
                email: data.email,
                name: data.name,
                imageStr: data.imageStr
            });
    };

    if (!profile.data) {
        return null;
    }

    return (
        <DetailsForm
            profile={profile.data}
            onSubmit={doSubmit}
        />
    );
};
