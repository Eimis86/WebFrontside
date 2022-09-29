import React from 'react';
import {LoginForm} from '../loginForm';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecoilRoot} from 'recoil';
import '@testing-library/jest-dom';
import { emailPattern, passwordPattern, patternValidation } from '@app/utils/patternValidation';

function renderLoginForm() {
    return render(
        <RecoilRoot>
            <LoginForm
                doChangeState={jest.fn()}
            />
        </RecoilRoot>
    );
}

describe('Login verification: if we fill one of twos input fields and click login we get an error', () => {

    test('if renders an email input field', () => {
        renderLoginForm();
        const inputEmail = screen.getByPlaceholderText(/email/i);
        expect(inputEmail).toBeDefined();
    });
    test('if renders an password input field', () => {
        renderLoginForm();
        const inputPassword = screen.getByPlaceholderText(/password/i);
        expect(inputPassword).toBeDefined();
    });
    test('if renders a login btn', () => {
        renderLoginForm();
        const loginBtn = screen.getByRole('button', {name: /login/i});
        expect(loginBtn).toBeDefined();
    });
    test('if email is filled but password is empty', async () => {
        renderLoginForm();

        const emailValue = 'visitor1@example.com';
        const filledField = 'Email';
        const emptyField = 'Password';

        const convertToRegExp = (str: string) => new RegExp(str, 'i');

        const emailInput = screen.getByPlaceholderText(convertToRegExp(filledField));
        expect(emailInput).toBeDefined();
        await userEvent.type(emailInput, patternValidation(emailValue, emailPattern));
        expect(emailInput).toContainHTML(emailValue);

        const passwordInput = screen.getByPlaceholderText(convertToRegExp(emptyField));
        expect(passwordInput).toBeDefined();
        expect(passwordInput).toContainHTML('');

        const loginBtn = screen.getByRole('button', {name: /login/i});
        expect(loginBtn).toBeDefined();
        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(loginBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
    test('if email is empty but password is filled', async () => {
        renderLoginForm();

        const passwordValue = 'v1234567';
        const filledField = 'Password';
        const emptyField = 'Email';

        const emailInput = screen.getByPlaceholderText(emptyField);
        expect(emailInput).toBeDefined();
        expect(emailInput).toContainHTML('');

        const passwordInput = screen.getByPlaceholderText(filledField);
        expect(passwordInput).toBeDefined();
        await userEvent.type(passwordInput, patternValidation(passwordValue, passwordPattern));

        expect(passwordInput).toContainHTML(passwordValue);

        const loginBtn = screen.getByRole('button', {name: /login/i});
        expect(loginBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(loginBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
});

describe('Login verification: if email and password are correct', () => {
    test('if email is correct or not', async () => {
        renderLoginForm();

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
    test('if password is correct or not', async () => {
        renderLoginForm();

        const passwordPlaceholder = 'Password';
        const correctPasswordValue = 'v1234567';
        const uncorrectPasswordValue = ' ';

        const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);
        expect(passwordInput).toBeDefined();
        expect(patternValidation(uncorrectPasswordValue, passwordPattern)).toBe('');
        expect(patternValidation(uncorrectPasswordValue, passwordPattern)).not.toBeTruthy();

        expect(patternValidation(correctPasswordValue, passwordPattern)).toBe(correctPasswordValue);
        expect(patternValidation(correctPasswordValue, passwordPattern)).not.toBe('');
    });
});

describe('Login verification', () => {
    test('if renders a forgot password btn', () => {
        renderLoginForm();
        const forgotPasswordBtn = screen.getByRole('button', {name: /forgot password/i});
        expect(forgotPasswordBtn).toBeDefined();
    });
    test('if renders a Sign Up btn in Login Form', () => {
        renderLoginForm();
        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();
    });
    test('if renders a Login btn in Sign Up Form', () => {
        renderLoginForm();
        const LoginBtn = screen.getByRole('button', {name: /login/i});
        expect(LoginBtn).toBeDefined();
    });
});
