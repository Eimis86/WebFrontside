import React, {PropsWithChildren, ReactElement, useMemo} from 'react';
import styles from './styles.scss';
import classnames from 'classnames';
import {Maybe} from '@app/utils/maybe';

export interface FileUploadProps<T extends boolean, K = T extends true ? FileList : Maybe<File>> {
    readonly accept: string[];
    readonly isMultiple: T;
    readonly className?: string;
    readonly onChange: (file: K) => void;
}
export type FileUploadComponent = <T extends boolean>(props: PropsWithChildren<FileUploadProps<T>>) => ReactElement | null;

export const FileUpload: FileUploadComponent = ({accept, isMultiple, className, onChange, children}) => {

    const acceptStr = useMemo(() => accept.join(','), [accept]);

    return (
        <label className={classnames(styles.fileUpload, className)}>
            <span className={styles.fileUpload__label}>
                { children }
            </span>
            <input
                className={styles.fileUpload__input}
                type='file'
                accept={acceptStr}
                multiple={isMultiple}
                onChange={(event) => {
                    if (event.target.files) {
                        isMultiple
                            ? onChange(event.target.files as (FileList & Maybe<File>))
                            : onChange((event.target.files || [undefined])[0] as (FileList & Maybe<File>));
                    }
                }}
            />
        </label>
    );
};
