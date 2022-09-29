import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessRequests } from '../index';
import {RecoilRoot} from 'recoil';
import {MemoryRouter} from 'react-router-dom';
import {getHubMembers} from '@app/store/hubs';


const HubMembers = [
    {
        'id': 0,
        'name': 'John Galt',
        'email': 'who@is.net',
        'roleId': 0,
        'image': '/resources/img/user01.png',
    }
];

const initializeState = ({ set }: any) => {
    set(getHubMembers, HubMembers);
};

describe('AccessManagement page Requests tab', () => {
    test('if renders a Member', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <AccessRequests />
                </MemoryRouter>
            </RecoilRoot>
        );
        const JohnGalt = screen.getByText(/john galt/i);
        expect(JohnGalt).toBeDefined();
    });
    test('if renders Approve Btn', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <AccessRequests />
                </MemoryRouter>
            </RecoilRoot>
        );
        const ApproveBtn = screen.getByRole('button', {name: /approve/i});
        expect(ApproveBtn).toBeDefined();
    });
    test('if renders Discard Btn', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <AccessRequests />
                </MemoryRouter>
            </RecoilRoot>
        );
        const DiscardBtn = screen.getByRole('button', {name: /discard/i});
        expect(DiscardBtn).toBeDefined();
    });
});
