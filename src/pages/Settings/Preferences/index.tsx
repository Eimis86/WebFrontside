import React, {useState} from 'react';
import styles from './styles.scss';
import {ContentNarrow, Description, Title} from '@app/layout';
import {useFromData} from '@app/utils/useFromData';
import {PreferencesModel, preferencesModel, scheme} from '@app/pages/Settings/Preferences/scheme';
import {FieldControl, FormField} from '@app/layout/FormField';
import {TextInput} from '@app/components/TextInput';
import {Textarea} from '@app/components/Textarea';
import {ThemeSelector} from '@app/components/ThemeSelector';
import {ProgressBar} from '@app/components/ProgressBar';
import {FileUpload} from '@app/components/FileUpload';
import {Button, SubmitButton} from '@app/components/Button';
import {isDefined, Maybe} from '@app/utils/maybe';
import {FlexRow} from '@app/layout/Flexbox';
import {log} from '@app/utils/debug';
import {Breadcrumb} from '@app/components/Breadcrumb';


export const Preferences: React.FC = () => {
    const {submitForm, getAllFieldProps, getField} = useFromData(preferencesModel());
    const [imagePreview, setImagePreview] = useState<Maybe<string>>(getField('image'));

    const doSubmit = (data: PreferencesModel) => {
        log.Info('submitting', data);
    };

    return (
        <ContentNarrow>
            <Breadcrumb path={[{text: 'Home', link: '/'}]}>
                Preferences
            </Breadcrumb>

            <div className={styles.header}>
                <Title>Preferences</Title>
                <Description>Manage your settings and preferences here</Description>
            </div>

            <form onSubmit={submitForm(doSubmit)}>
                <FormField title={scheme.image.title} subTitle={scheme.image.description}>
                    <FlexRow gap={'large'}>
                        <div className={styles.imagePreview}>
                            {isDefined(imagePreview) && <img src={imagePreview} alt='hub'/>}
                        </div>
                        <FileUpload
                            accept={['image/jpeg', 'image/gif', 'image/png']}
                            isMultiple={false}
                            onChange={(file) => {
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        ev.target?.result && setImagePreview(ev.target.result as string);
                                    };

                                    reader.readAsDataURL(file);
                                }
                            }}
                        >
                            <Button kind='primary'>Change Image</Button>
                        </FileUpload>
                    </FlexRow>
                </FormField>

                <FormField title={scheme.name.title} subTitle={scheme.name.description}>
                    <FieldControl {...getAllFieldProps('name')}>
                        <TextInput/>
                    </FieldControl>
                </FormField>

                <FormField title={scheme.description.title} subTitle={scheme.description.description}>
                    <FieldControl {...getAllFieldProps('description')}>
                        <Textarea/>
                    </FieldControl>
                </FormField>

                <FormField title={scheme.theme.title} subTitle={scheme.theme.description}>
                    <FieldControl {...getAllFieldProps('theme')}>
                        <ThemeSelector colors={['white', '#E8E9EC', '#1D2D44', '#0E7C7B']}/>
                    </FieldControl>
                </FormField>

                <FormField title={scheme.storage.title} subTitle={scheme.storage.description}>
                    <FieldControl {...getAllFieldProps('storage')}>
                        <ProgressBar max={15}/>
                    </FieldControl>
                    <Description>9.5 Gb of 15.0 Gb used</Description>
                </FormField>

                <SubmitButton kind='primary'>Save</SubmitButton>
            </form>
        </ContentNarrow>
    );
};
