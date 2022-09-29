import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Header} from '../index';
import {RecoilRoot} from 'recoil';
import {MemoryRouter} from 'react-router-dom';


describe('Header', () => {
    test('if renders Home btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </RecoilRoot>
        );
        const homeBtn = screen.getByRole('tab', {name: /home/i});
        expect(homeBtn).toBeDefined();
    });
    test('if renders My Hubs btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </RecoilRoot>
        );
        const myHubsBtn = screen.getByRole('tab', {name: /my hubs/i});
        expect(myHubsBtn).toBeDefined();
    });
});