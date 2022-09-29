import React from 'react';
import {render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessPermissions } from '../index';
import {RecoilRoot} from 'recoil';
import userEvent from '@testing-library/user-event';
import { passwordPattern, patternValidation } from '@app/utils/patternValidation';


describe('AccessManagement page Permissions tab rendering', () => {
    test('if renders Share field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const share = screen.getByText(/share/i);
        expect(share).toBeDefined();
    });
    test('if renders Add/copy file field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const addCopyFile = screen.getByText(/add\/copy file/i);
        expect(addCopyFile).toBeDefined();
    });
    test('if renders Create manuals field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const createManuals = screen.getByText(/create manuals/i);
        expect(createManuals).toBeDefined();
    });
    test('if renders View field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const view = screen.getByText(/view/i);
        expect(view).toBeDefined();
    });
    test('if renders Invite field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const invite = screen.getByText(/invite/i);
        expect(invite).toBeDefined();
    });
    test('if renders Hub protection field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const hubProtection = screen.getByText(/hub protection/i);
        expect(hubProtection).toBeDefined();
    });
    test('if renders Set password field', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const setPassword = screen.getByText(/set password/i);
        expect(setPassword).toBeDefined();
    });
    test('if renders Save Btn', () => {
        render (
            <RecoilRoot>
                <AccessPermissions />
            </RecoilRoot>
        );
        const saveBtn = screen.getByRole('button', {name: /save/i});
        expect(saveBtn).toBeDefined();
    });
});

describe('Permissions tab passwords testing after Save btn click', () => {
    describe('empty fields', () => {
        test('if old and confirm new passwords are filled but new password is empty', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const oldPasswordValue = 'v1234567';
            const confirmNewPasswordValue = '1234567v';
            const oldPasswordPlaceholder = 'Old password';
            const newPasswordPlaceholder = 'New password';
            const confirmNewPasswordPlaceholder = 'Confirm new password';
            const errorPasswordValue = 'New password';
            const errorMessage = 'Passwords doesn\'t match';

            const oldPasswordInput = screen.getByPlaceholderText(oldPasswordPlaceholder);
            expect(oldPasswordInput).toBeDefined();
            expect(oldPasswordInput).toContainHTML('');
            await userEvent.type(oldPasswordInput, patternValidation(oldPasswordValue, passwordPattern));
            expect(oldPasswordInput).toContainHTML(oldPasswordValue);

            const newPasswordInput = screen.getByPlaceholderText(newPasswordPlaceholder);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');

            const confirmNewPasswordInput = screen.getByPlaceholderText(confirmNewPasswordPlaceholder);
            expect(confirmNewPasswordInput).toBeDefined();
            expect(confirmNewPasswordInput).toContainHTML('');
            await userEvent.type(confirmNewPasswordInput, patternValidation(confirmNewPasswordValue, passwordPattern));
            expect(confirmNewPasswordInput).toContainHTML(confirmNewPasswordValue);

            expect(screen.queryByText(`${errorPasswordValue} should not be empty`)).toBeNull();
            expect(screen.queryByText(`${errorMessage}`)).toBeNull();

            const saveBtn = screen.getByRole('button', {name: /save/i});
            expect(saveBtn).toBeDefined();
            await act(async () => {
                await userEvent.click(saveBtn);
            });

            expect(screen.queryByText(`${errorPasswordValue} should not be empty`)).toBeDefined();
            expect(screen.queryByText(`${errorMessage}`)).toBeDefined();
        });
        test('if old and new passwords are filled but confirm password is empty', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const oldPasswordValue = 'v1234567';
            const newPasswordValue = '1234567v';
            const oldPasswordPlaceholder = 'Old password';
            const confirmNewPasswordPlaceholder = 'Confirm new password';
            const errorPasswordValue = 'New password confirm';

            const convertToRegExp = (str: string) => new RegExp(str, 'i');

            const oldPasswordInput = screen.getByPlaceholderText(convertToRegExp(oldPasswordPlaceholder));
            expect(oldPasswordInput).toBeDefined();
            expect(oldPasswordInput).toContainHTML('');
            await userEvent.type(oldPasswordInput, patternValidation(oldPasswordValue, passwordPattern));
            expect(oldPasswordInput).toContainHTML(oldPasswordValue);

            const newPasswordInput = screen.getByPlaceholderText(/^new password$/i);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, patternValidation(newPasswordValue, passwordPattern));
            expect(newPasswordInput).toContainHTML(newPasswordValue);

            const confirmNewPasswordInput = screen.getByPlaceholderText(convertToRegExp(confirmNewPasswordPlaceholder));
            expect(confirmNewPasswordInput).toBeDefined();
            expect(confirmNewPasswordInput).toContainHTML('');

            expect(screen.queryByText(convertToRegExp(`${errorPasswordValue} should not be empty`))).toBeNull();

            const saveBtn = screen.getByRole('button', {name: /save/i});
            expect(saveBtn).toBeDefined();
            await act(async () => {
                await userEvent.click(saveBtn);
            });

            expect(screen.queryByText(convertToRegExp(`${errorPasswordValue} should not be empty`))).toBeDefined();
        });
    });
    describe('not match', () => {
        test('if confirm password doesnt match new password', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const oldPasswordValue = 'v1234567';
            const newPasswordValue = '1234567v';
            const confirmNewPasswordValue = oldPasswordValue;
            const oldPasswordPlaceholder = 'Old password';
            const confirmNewPasswordPlaceholder = 'Confirm new password';
            const errorPasswordValue = 'Passwords';

            const convertToRegExp = (str: string) => new RegExp(str, 'i');

            const oldPasswordInput = screen.getByPlaceholderText(convertToRegExp(oldPasswordPlaceholder));
            expect(oldPasswordInput).toBeDefined();
            expect(oldPasswordInput).toContainHTML('');
            await userEvent.type(oldPasswordInput, patternValidation(oldPasswordValue, passwordPattern));
            expect(oldPasswordInput).toContainHTML(oldPasswordValue);

            const newPasswordInput = screen.getByPlaceholderText(/^new password$/i);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, patternValidation(newPasswordValue, passwordPattern));
            expect(newPasswordInput).toContainHTML(newPasswordValue);

            const confirmNewPasswordInput = screen.getByPlaceholderText(convertToRegExp(confirmNewPasswordPlaceholder));
            expect(confirmNewPasswordInput).toBeDefined();
            expect(confirmNewPasswordInput).toContainHTML('');
            await userEvent.type(confirmNewPasswordInput, patternValidation(confirmNewPasswordValue, passwordPattern));
            expect(confirmNewPasswordInput).toContainHTML(confirmNewPasswordValue);

            expect(screen.queryByText(convertToRegExp(`${errorPasswordValue} doesn't match`))).toBeNull();

            const saveBtn = screen.getByRole('button', {name: /save/i});
            expect(saveBtn).toBeDefined();
            await act(async () => {
                await userEvent.click(saveBtn);
            });

            expect(screen.queryByText(convertToRegExp(`${errorPasswordValue} doesn't match`))).toBeDefined();
            expect(screen.queryByText(convertToRegExp(`${errorPasswordValue} doesn't match`))).not.toBeNull();
        });
    });
});

describe('Permissions tab passwords testing before Save btn click', () => {
    describe('at least 1 letter', () => {
        test('if new password does not contain at least 1 letter and onBlur event', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const passwordNumberValue = '12345678';
            const newPasswordPlaceholder = 'New password';
            const errorMessage = 'Please choose a stronger password. Try a mix of letters, numbers, use from 8 to 16 characters.';

            const newPasswordInput = screen.getByPlaceholderText(newPasswordPlaceholder);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, passwordNumberValue);
            expect(newPasswordInput).toContainHTML(passwordNumberValue);

            expect(screen.queryByText(errorMessage)).toBeNull();
            await act(async () => {
                await userEvent.click(document.body);
            });

            expect(screen.getByText(errorMessage)).toBeDefined();
            expect(screen.queryByText(errorMessage)).not.toBeNull();
        });
        test('if new password confirm does not contain at least 1 letter and onBlur event', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const passwordNumberValue = '12345678';
            const confirmNewPasswordPlaceholder = 'Confirm new password';
            const errorMessage = 'Passwords doesn\'t match';

            const confirmNewPasswordInput = screen.getByPlaceholderText(confirmNewPasswordPlaceholder);
            expect(confirmNewPasswordInput).toBeDefined();
            expect(confirmNewPasswordInput).toContainHTML('');
            await userEvent.type(confirmNewPasswordInput, passwordNumberValue);
            expect(confirmNewPasswordInput).toContainHTML(passwordNumberValue);

            expect(screen.queryByText(errorMessage)).toBeNull();
            await act(async () => {
                await userEvent.click(document.body);
            });

            expect(screen.getByText(errorMessage)).toBeDefined();
            expect(screen.queryByText(errorMessage)).not.toBeNull();
        });
    });
    describe('at least 1 number', () => {
        test('if new password does not contain at least 1 number and onBlur event', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const passwordLetterValue = 'qwertyui';
            const newPasswordPlaceholder = 'New password';
            const errorMessage = 'Please choose a stronger password. Try a mix of letters, numbers, use from 8 to 16 characters.';

            const newPasswordInput = screen.getByPlaceholderText(newPasswordPlaceholder);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, passwordLetterValue);
            expect(newPasswordInput).toContainHTML(passwordLetterValue);

            expect(screen.queryByText(errorMessage)).toBeNull();
            await act(async () => {
                await userEvent.click(document.body);
            });

            expect(screen.getByText(errorMessage)).toBeDefined();
            expect(screen.queryByText(errorMessage)).not.toBeNull();
        });
    });
    describe('less than 8 characters', () => {
        test('if new password is less than 8 characters and onBlur event', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const passwordValue = 'v1234';
            const newPasswordPlaceholder = 'New password';
            const errorMessage = 'Use from 8 to 16 characters for your password';

            const newPasswordInput = screen.getByPlaceholderText(newPasswordPlaceholder);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, passwordValue);
            expect(newPasswordInput).toContainHTML(passwordValue);

            expect(screen.queryByText(errorMessage)).toBeNull();
            await act(async () => {
                await userEvent.click(document.body);
            });

            expect(screen.queryByText(errorMessage)).toBeDefined();
            expect(screen.queryByText(errorMessage)).not.toBeNull();
        });
    });
    describe('more than 8 characters', () => {
        test('if new password is more than 8 characters and onBlur event', async () => {
            render (
                <RecoilRoot>
                    <AccessPermissions />
                </RecoilRoot>
            );
            const passwordValue = 'v1234567890123456';
            const newPasswordPlaceholder = 'New password';
            const errorMessage = 'Use from 8 to 16 characters for your password';

            const newPasswordInput = screen.getByPlaceholderText(newPasswordPlaceholder);
            expect(newPasswordInput).toBeDefined();
            expect(newPasswordInput).toContainHTML('');
            await userEvent.type(newPasswordInput, passwordValue);
            expect(newPasswordInput).toContainHTML(passwordValue);

            expect(screen.queryByText(errorMessage)).toBeNull();
            await act(async () => {
                await userEvent.click(document.body);
            });

            expect(screen.queryByText(errorMessage)).toBeDefined();
            expect(screen.queryByText(errorMessage)).not.toBeNull();
        });
    });
});
