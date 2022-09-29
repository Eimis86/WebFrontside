import React from 'react';
import {RecoveryForm} from '../recoveryForm';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecoilRoot} from 'recoil';
import { emailPattern, patternValidation } from '@app/utils/patternValidation';
import '@testing-library/jest-dom';

function renderRecoveryForm() {
    return render(
        <RecoilRoot>
            <RecoveryForm
                doChangeState={jest.fn()}
            />
        </RecoilRoot>
    );
}

describe('Forgot password verification: if email input field is empty and click Send PIN btn could we get an error', () => {

    test('if renders an email input field', async () => {
        renderRecoveryForm();
        const inputEmail = screen.getByPlaceholderText(/email/i);
        expect(inputEmail).toBeDefined();
    });
    test('if renders a Send PIN btn', async () => {
        renderRecoveryForm();
        const sendPINBtn = screen.getByRole('button', {name: /send pin/i});
        expect(sendPINBtn).toBeDefined();
    });
    test('if email input field is empty and we click a Send PIN btn, could we get an error', async () => {
        renderRecoveryForm();
        const emptyField = 'Email';

        const inputEmail = screen.getByPlaceholderText(/email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        const sendPINBtn = screen.getByRole('button', {name: /send pin/i});
        expect(sendPINBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(sendPINBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
});

describe('Forgot password verification: if email is correct', () => {
    test('if email is correct or not', async () => {
        renderRecoveryForm();

        const correctEmailValue = 'visitor1@example.com';
        const uncorrectEmailValue = 'visitor1examplecom';
        const emailPlaceholder = 'Email';

        const emailInput = screen.getByPlaceholderText(emailPlaceholder);
        expect(emailInput).toBeDefined();
        expect(patternValidation(uncorrectEmailValue, emailPattern)).toBe('');
        expect(patternValidation(uncorrectEmailValue, emailPattern)).not.toBeTruthy();

        expect(patternValidation(correctEmailValue, emailPattern)).toBe(correctEmailValue);
        expect(patternValidation(correctEmailValue, emailPattern)).not.toBe('');
    });
});
