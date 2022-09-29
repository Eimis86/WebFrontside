import React, {ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './styles.scss';

import {TextInput} from '@app/components/TextInput';
import {Button, SubmitButton, ToolButton} from '@app/components/Button';
import {Divider} from '@app/components/Divider';
import {Icon} from '@app/components/Icon';
import QRCode from 'react-qr-code';
import {Description} from '@app/layout';
import {FieldControl} from '@app/layout/FormField';
import {Controller, useForm} from 'react-hook-form';
import {displaySystemMessage} from '@app/components/SystemMessage';
import {useShareModel} from '@app/store/models';
import {EmailList} from '@app/pages/ModelDetails/ShareModel/EmailList';
import {ApplicationContext} from '@app/AppContext';
import {ModalWindow} from '@app/components/ModalWindow';
import {Collapse} from '@app/components/Collapse';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';

interface ShareModelData {
    readonly emails: string[];
}


export const ShareModelContent: React.FC<{
    readonly modelId: string;
}> = ({modelId}) => {
    const [isQrCodeVisible, setQrCodeVisible] = useState(false);
    const [isCopyMessageVisible, setCopyMessageVisible] = useState(false);

    const { control, handleSubmit, getValues } = useForm<ShareModelData>({
        defaultValues: {
            emails: [],
        }
    });

    const shareModel = useShareModel();

    useEffect(() => {
        if (shareModel.state.status === 'Success') {
            displaySystemMessage('success', 'Successful!', `link to the model was sent to ${getValues('emails')}`);
        }

        if (shareModel.state.status === 'Error') {
            displaySystemMessage('error', 'Error!', shareModel.state.error || 'Something goes wrong');
        }
    }, [shareModel.state]);

    const modelLink = `${window.location.origin}/models/${modelId}/info`;

    const displayCopyMessage = () => {
        setCopyMessageVisible(true);
        setTimeout(() => {
            setCopyMessageVisible(false);
        }, 3000);
    };

    return (
        <>
            <div className={styles.shareModelHeader}>
                <div className={styles.title}>Share with others</div>
                <Description size='small' className={styles.description}>Enter email of the people you want to share model with</Description>
            </div>

            <Divider/>

            <div className={styles.shareModelContent}>

                <form className={styles.form} onSubmit={handleSubmit(data => {
                    shareModel.send(modelId.toString(), data.emails);
                })}>
                    <Controller
                        name='emails'
                        control={control}
                        rules={{
                            required: 'Email should not be empty',
                        }}
                        render={({ field, fieldState}) => (
                            <FieldControl name='email' error={fieldState.error}>
                                <EmailList className={styles.textInput} onChange={field.onChange}/>
                            </FieldControl>
                        )}
                    />

                    <SubmitButton
                        kind='primary'
                        disabled={shareModel.state.status === 'Sending'}
                        className={styles.button}
                    >
                        Invite
                    </SubmitButton>
                </form>

                <Divider text='Or use this link'/>

                <div className={styles.textLinkBlock}>
                    <TextInput
                        className={styles.shareLink}
                        value={modelLink}
                        readOnly={true}
                        childrenAfter={<>
                            <ToolButton
                                noBorder
                                onClick={() => {navigator.clipboard.writeText(modelLink).then(() => {displayCopyMessage();});}}
                            >
                                <Icon name='copy'/>
                            </ToolButton>
                            <ToolButton
                                noBorder
                                onClick={() => {setQrCodeVisible(!isQrCodeVisible);}}
                            >
                                <Icon name='qrCode'/>
                            </ToolButton>
                        </>}
                    />
                    {isCopyMessageVisible && (
                        <div className={styles.copyMessage}>
                            <span>The link has been copied to clipboard</span>
                        </div>
                    )}
                </div>
                {isQrCodeVisible && (
                    <div className={styles.qrCode}>
                        <QRCode value={modelLink} />
                    </div>
                )}
            </div>
        </>
    );
};

export const ShareModelWindow: React.FC<{
    readonly modelId: string;
    readonly renderButton: (doOpen: () => void) => ReactNode | undefined;
}> = ({modelId, renderButton}) => {
    const {isMobile} = useContext(ApplicationContext);
    const [isOpen, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useMouseDownOutside(ref, () => setOpen(false), [isOpen]);

    const renderWindow = useCallback((isOpen) => {
        if (isMobile) {
            return isOpen
                ? (
                    <ModalWindow
                        onExit={() => setOpen(false)}
                    >
                        <ShareModelContent modelId={modelId}/>
                    </ModalWindow>
                )
                : null;
        }
        else {
            return (
                <Collapse isOpen={isOpen} className={styles.shareModelWrapper}>
                    <ShareModelContent modelId={modelId}/>
                </Collapse>
            );
        }
    }, [isMobile, modelId])

    return (
        <div className={styles.shareModelContainer}>
            {renderButton(() => setOpen(true))}
            <div ref={ref}>
                {renderWindow(isOpen)}
            </div>

        </div>
    )
};
