import {Scheme} from '@app/utils/useFromData';

export type PreferencesModel = {
    image: string;
    name: string;
    description: string;
    theme: number;
    storage: number;
}

export const scheme: Scheme<PreferencesModel> = {
    image: {
        title: 'Change image',
        description: 'Manage your settings and preferences here.',
        type: 'list',
        items: [
            {text: 'Anyone', value: '0'},
            {text: 'Selected group', value: '1'},
            {text: 'Admin only', value: '2'}
        ]
    },
    name: {
        title: 'Hub name',
        description: 'Manage your settings and preferences here.',
        type: 'list-multi',
        items: [
            {text: 'File 1', value: '0'},
            {text: 'File 2', value: '1'},
            {text: 'File 3', value: '2'}
        ]
    },
    description: {
        title: 'Hub description',
        description: 'Manage your settings and preferences here.',
        type: 'list-multi',
        items: [
            {text: 'Group 1', value: '0'},
            {text: 'Group 2', value: '1'},
            {text: 'Group 3', value: '2'}
        ]
    },
    theme: {
        title: 'Hub theme',
        description: 'Manage your settings and preferences here.',
        type: 'list',
        items: [
            {text: 'Private', value: '0'},
            {text: 'Public', value: '1'},
        ]
    },
    storage: {
        title: 'Storage',
        description: 'Manage your settings and preferences here.',
        type: 'list',
        items: [
            {text: 'Private', value: '0'},
            {text: 'Public', value: '1'},
        ]
    }
};

export function preferencesModel(): PreferencesModel {
    return {
        image: '/resources/img/avatar_demo_lg.png',
        name: 'Asus',
        description: 'Hub description that will be divided on multiple lines High performance - 15 Bars of pressure and a self-priming system means the Swan Retro espresso maker is always ready to make delicious coffees in minutes. High performance - 15 Bars of pressure and a self-priming system means the Swan Retro espresso maker is always ready to make',
        theme: 0,
        storage: 9.5
    };
}
