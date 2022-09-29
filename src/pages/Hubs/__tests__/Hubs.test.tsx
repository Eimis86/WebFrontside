import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Hubs} from '../index';
import {RecoilRoot} from 'recoil';
import {MemoryRouter} from 'react-router-dom';
import {useUserHubs} from '@app/store/hubs/actions';


const MyHubs = [
    {
        'id': 0,
        'name': 'ASUS',
        'image': '/resources/img/01.png'
    },
    {
        'id': 1,
        'name': 'Biogen',
        'image': '/resources/img/02.png'
    },
    {
        'id': 2,
        'name': 'Asphalt',
        'image': '/resources/img/03.png'
    },
    {
        'id': 3,
        'name': 'USA Airlines',
        'image': '/resources/img/04.png'
    },
    {
        'id': 4,
        'name': 'USA Navy',
        'image': '/resources/img/05.png'
    },
    {
        'id': 5,
        'name': 'Indoor',
        'image': '/resources/img/06.png'
    }
];

const initializeState = ({ set }: any) => {
    const hubs = useUserHubs();
    set(hubs, MyHubs);
};

describe('My Hubs page', () => {
    test('if renders My Hubs tab', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Hubs />
                </MemoryRouter>
            </RecoilRoot>
        );
        const myHubsTab = screen.getByRole('tab', {name: /my hubs/i});
        expect(myHubsTab).toBeDefined();
    });
    test('if renders Followed Hubs tab', async () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Hubs />
                </MemoryRouter>
            </RecoilRoot>
        );
        const followedHubsTab = screen.getByRole('tab', {name: /followed hubs/i});
        expect(followedHubsTab).toBeDefined();
    });
});
