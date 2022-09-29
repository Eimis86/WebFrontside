export type AuthenticateState = 'Login' | 'SignUp' | 'Recovery'

export interface AuthenticateFormProps {
    doChangeState: (newState: AuthenticateState) => void;
}
