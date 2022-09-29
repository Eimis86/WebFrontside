import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessManagement } from '../accessManagement'; 
import {RecoilRoot} from 'recoil';
import {MemoryRouter} from 'react-router-dom';


describe('AccessManagement page', () => {
    test('if renders Manage Access', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <AccessManagement />
                </MemoryRouter>
            </RecoilRoot>
        );
        const manageAccess = screen.getByText(/manage access/i);
        expect(manageAccess).toBeDefined();
    });
    test('if renders Permissions Btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <AccessManagement />
                </MemoryRouter>
            </RecoilRoot>
        );
        const permissionsBtn = screen.getByRole('tab', {name: /permissions/i});
        expect(permissionsBtn).toBeDefined();
    });
    test('if renders Member list Btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <AccessManagement />
                </MemoryRouter>
            </RecoilRoot>
        );
        const memberListBtn = screen.getByRole('tab', {name: /member list/i});
        expect(memberListBtn).toBeDefined();
    });
    test('if renders Groups Btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <AccessManagement />
                </MemoryRouter>
            </RecoilRoot>
        );
        const groupsBtn = screen.getByRole('tab', {name: /groups/i});
        expect(groupsBtn).toBeDefined();
    });
    test('if renders Requests Btn', () => {
        render (
            <RecoilRoot>
                <MemoryRouter>
                    <AccessManagement />
                </MemoryRouter>
            </RecoilRoot>
        );
        const requestsBtn = screen.getByRole('tab', {name: /requests/i});
        expect(requestsBtn).toBeDefined();
    });
});