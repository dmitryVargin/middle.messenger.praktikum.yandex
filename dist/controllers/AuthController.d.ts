export declare type SignUpData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};
export declare type SignInData = {
    login: string;
    password: string;
};
export declare type UserFromServer = {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    display_name: string | null;
    avatar: string | null;
};
export declare type UserPassword = string;
declare class AuthController {
    static signUp(data: SignUpData): void;
    static getUser(successCallback?: () => void): void;
    static checkUserLoggedIn(): Promise<XMLHttpRequest>;
    static signIn(data: SignInData): void;
    static logout(): void;
}
export default AuthController;
