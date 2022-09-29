import React from 'react';

export interface ApplicationContextProps {
    readonly isMobile: boolean;
}

export const ApplicationContext = React.createContext<ApplicationContextProps>({
    isMobile: true
});
