import React from 'react';

export const RawImage: React.FC<{
    readonly src?: string;
    readonly alt?: string;
    readonly classname?: string;
}> = ({src, alt, classname}) => (
    <img
        className={classname}
        alt={alt}
        src={`data:image/png;base64,${src}`}
    />
);
