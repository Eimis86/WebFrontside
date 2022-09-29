import React from 'react';
import {SignupForm} from '../signupForm';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecoilRoot} from 'recoil';
import '@testing-library/jest-dom';
import { emailPattern, passwordPattern, namePattern, patternValidation } from '@app/utils/patternValidation';

function renderSignupForm() {
    return render(
        <RecoilRoot>
            <SignupForm
                doChangeState={jest.fn()}
            />
        </RecoilRoot>
    );
}

describe('Sign Up verification: if we left one of fours input fields and click Sign Up could we get an error', () => {
    test('if renders a name input field', () => {
        renderSignupForm();
        const inputName = screen.getByPlaceholderText(/name/i);
        expect(inputName).toBeDefined();
    });
    test('if renders an email input field', () => {
        renderSignupForm();
        const inputEmail = screen.getByPlaceholderText(/email/i);
        expect(inputEmail).toBeDefined();
    });
    test('if renders a password input field', () => {
        renderSignupForm();
        const inputPassword = screen.getByPlaceholderText('Password');
        expect(inputPassword).toBeDefined();
    });
    test('if renders a repeat password input field', () => {
        renderSignupForm();
        const inputRepeatPassword = screen.getByPlaceholderText(/repeat password/i);
        expect(inputRepeatPassword).toBeDefined();
    });
    test('if renders a Sign Up btn in Sign Up Form', () => {
        renderSignupForm();
        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();
    });
    test('if name is empty but others are filled', async () => {
        renderSignupForm();
        const emptyField  = 'Name';
        const emailValue = 'visitor1@example.com';
        const passwordValue = 'v1234567';

        const inputName = screen.getByPlaceholderText(emptyField);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');

        const inputEmail = screen.getByPlaceholderText(/Email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        await userEvent.type(inputEmail, patternValidation(emailValue, emailPattern));
        expect(inputEmail).toContainHTML(emailValue);

        const inputPassword = screen.getByPlaceholderText(/^Password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');
        await userEvent.type(inputPassword, patternValidation(passwordValue, passwordPattern));
        expect(inputPassword).toContainHTML(passwordValue);

        const inputRepeatPassword = screen.getByPlaceholderText(/Repeat Password/i);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');
        await userEvent.type(inputRepeatPassword, patternValidation(passwordValue, passwordPattern));
        expect(inputRepeatPassword).toContainHTML(passwordValue);

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
    test('if email is empty but others are filled', async () => {
        renderSignupForm();
        const nameValue = 'visitor1';
        const passwordValue = 'v1234567';
        const emptyField = 'Email';

        const inputName = screen.getByPlaceholderText(/Name/i);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');
        await userEvent.type(inputName, patternValidation(nameValue, namePattern));
        expect(inputName).toContainHTML(nameValue);

        const inputEmail = screen.getByPlaceholderText(emptyField);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');

        const inputPassword = screen.getByPlaceholderText(/^Password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');
        await userEvent.type(inputPassword, patternValidation(passwordValue, passwordPattern));
        expect(inputPassword).toContainHTML(passwordValue);

        const inputRepeatPassword = screen.getByPlaceholderText(/Repeat Password/i);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');
        await userEvent.type(inputRepeatPassword, patternValidation(passwordValue, passwordPattern));
        expect(inputRepeatPassword).toContainHTML(passwordValue);

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
    test('if password and repeat password are empty but others are filled', async () => {
        renderSignupForm();
        const emailValue = 'visitor1@example.com';
        const nameValue = 'visitor1';
        const emptyField = 'Password';

        const inputName = screen.getByPlaceholderText(/name/i);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');
        await userEvent.type(inputName, patternValidation(nameValue, namePattern));
        expect(inputName).toContainHTML(nameValue);

        const inputEmail = screen.getByPlaceholderText(/email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        await userEvent.type(inputEmail, patternValidation(emailValue, emailPattern));
        expect(inputEmail).toContainHTML(emailValue);

        const inputPassword = screen.getByPlaceholderText(/^password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');

        const inputRepeatPassword = screen.getByPlaceholderText(/repeat password/i);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} should not be empty`)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(`${emptyField} should not be empty`);
        expect(error).toBeDefined();
    });
    test('if repeat password is empty but others are filled', async () => {
        renderSignupForm();
        const emailValue = 'visitor1@example.com';
        const nameValue = 'visitor1';
        const passwordValue = 'v1234567';
        const emptyField = 'Repeat Password';
        const errorRepeatPasswordValue = 'Passwords';

        const inputName = screen.getByPlaceholderText(/Name/i);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');
        await userEvent.type(inputName, patternValidation(nameValue, namePattern));
        expect(inputName).toContainHTML(nameValue);

        const inputEmail = screen.getByPlaceholderText(/Email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        await userEvent.type(inputEmail, patternValidation(emailValue, emailPattern));
        expect(inputEmail).toContainHTML(emailValue);

        const inputPassword = screen.getByPlaceholderText(/^Password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');
        await userEvent.type(inputPassword, patternValidation(passwordValue, passwordPattern));
        expect(inputPassword).toContainHTML(passwordValue);

        const inputRepeatPassword = screen.getByPlaceholderText(emptyField);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(`${emptyField} doesn't match`)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(`${errorRepeatPasswordValue} doesn't match`);
        expect(error).toBeDefined();
    });
    test('if repeat password is not the same as password', async () => {
        renderSignupForm();
        const nameValue = 'visitor1';
        const emailValue = 'visitor1@example.com';
        const passwordValue = 'v1234567';
        const repeatPasswordWrongValue = 'some value';
        const errorRepeatPasswordValue = 'Passwords';

        const inputName = screen.getByPlaceholderText(/Name/i);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');
        await userEvent.type(inputName, patternValidation(nameValue, namePattern));
        expect(inputName).toContainHTML(nameValue);

        const inputEmail = screen.getByPlaceholderText(/Email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        await userEvent.type(inputEmail,patternValidation(emailValue, emailPattern));
        expect(inputEmail).toContainHTML(emailValue);

        const inputPassword = screen.getByPlaceholderText(/^Password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');
        await userEvent.type(inputPassword,patternValidation(passwordValue, passwordPattern));
        expect(inputPassword).toContainHTML(passwordValue);

        const inputRepeatPassword = screen.getByPlaceholderText(/Repeat Password/i);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');
        await userEvent.type(inputRepeatPassword, repeatPasswordWrongValue);
        expect(inputRepeatPassword).toContainHTML(repeatPasswordWrongValue);

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(`${errorRepeatPasswordValue} doesn't match`)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(`${errorRepeatPasswordValue} doesn't match`);
        expect(error).toBeDefined();
    });
    test('if terms and conditions are empty', async () => {
        renderSignupForm();
        const nameValue = 'visitor1';
        const emailValue = 'visitor1@example.com';
        const passwordValue = 'v1234567';
        const repeatPasswordValue = passwordValue;
        const errorTermsAndConditionsValue = 'You have to agree with terms and condition';

        const inputName = screen.getByPlaceholderText(/Name/i);
        expect(inputName).toBeDefined();
        expect(inputName).toContainHTML('');
        await userEvent.type(inputName, patternValidation(nameValue, namePattern));
        expect(inputName).toContainHTML(nameValue);

        const inputEmail = screen.getByPlaceholderText(/Email/i);
        expect(inputEmail).toBeDefined();
        expect(inputEmail).toContainHTML('');
        await userEvent.type(inputEmail, patternValidation(emailValue, emailPattern));
        expect(inputEmail).toContainHTML(emailValue);

        const inputPassword = screen.getByPlaceholderText(/^Password$/i);
        expect(inputPassword).toBeDefined();
        expect(inputPassword).toContainHTML('');
        await userEvent.type(inputPassword,passwordValue);
        expect(inputPassword).toContainHTML(passwordValue);

        const inputRepeatPassword = screen.getByPlaceholderText(/Repeat Password/i);
        expect(inputRepeatPassword).toBeDefined();
        expect(inputRepeatPassword).toContainHTML('');
        await userEvent.type(inputRepeatPassword,patternValidation(repeatPasswordValue, passwordPattern));
        expect(inputRepeatPassword).toContainHTML(repeatPasswordValue);

        const checkbox = screen.getByRole('checkbox', {name: 'Agree to Terms & Conditions'});
        expect(checkbox).toBeDefined();
        expect(checkbox).not.toBeChecked();

        const SignUpBtn = screen.getByRole('button', {name: /sign up/i});
        expect(SignUpBtn).toBeDefined();

        expect(screen.queryByText(errorTermsAndConditionsValue)).toBeNull();
        await act( async () => {
            userEvent.click(SignUpBtn);
        });

        const error = screen.getByText(errorTermsAndConditionsValue);
        expect(error).toBeDefined();
    });
});

describe('Sign Up verification: if name is correct', () => {
    test('if name is correct or not', async () => {
        renderSignupForm();

        const namePlaceholder = 'name';
        const correctNameValue = 'visitor1';
        const uncorrectNameValue = ' ';

        const convertToRegExp = (str: string) => new RegExp(str, 'i');

        const nameInput = screen.getByPlaceholderText(convertToRegExp(namePlaceholder));
        expect(nameInput).toBeDefined();
        expect(patternValidation(uncorrectNameValue, namePattern)).toBe('');
        expect(patternValidation(uncorrectNameValue, namePattern)).not.toBeTruthy();

        expect(patternValidation(correctNameValue, namePattern)).toBe(correctNameValue);
        expect(patternValidation(correctNameValue, namePattern)).not.toBe('');
    });
    test('if email is correct or not', async () => {
        renderSignupForm();

        const emailPlaceholder = 'email';
        const correctEmailValue = 'visitor1@example.com';
        const uncorrectEmailValue = 'visitor1examplecom';

        const convertToRegExp = (str: string) => new RegExp(str, 'i');

        const emailInput = screen.getByPlaceholderText(convertToRegExp(emailPlaceholder));
        expect(emailInput).toBeDefined();
        expect(patternValidation(uncorrectEmailValue, emailPattern)).toBe('');
        expect(patternValidation(uncorrectEmailValue, emailPattern)).not.toBeTruthy();

        expect(patternValidation(correctEmailValue, emailPattern)).toBe(correctEmailValue);
        expect(patternValidation(correctEmailValue, emailPattern)).not.toBe('');
    });
    test('if password is correct or not', async () => {
        renderSignupForm();

        const correctPasswordValue = 'v1234567';
        const uncorrectPasswordValue = ' ';

        const passwordInput = screen.getByPlaceholderText(/^password$/i);
        expect(passwordInput).toBeDefined();
        expect(patternValidation(uncorrectPasswordValue, passwordPattern)).toBe('');
        expect(patternValidation(uncorrectPasswordValue, passwordPattern)).not.toBeTruthy();

        expect(patternValidation(correctPasswordValue, passwordPattern)).toBe(correctPasswordValue);
        expect(patternValidation(correctPasswordValue, passwordPattern)).not.toBe('');
    });
});
