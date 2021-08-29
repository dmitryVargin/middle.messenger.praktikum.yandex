declare class AuthApi {
    static signUp(data: string): Promise<XMLHttpRequest>;
    static signIn(data: string): Promise<XMLHttpRequest>;
    static getUser(): Promise<XMLHttpRequest>;
    static logout(): Promise<XMLHttpRequest>;
}
export default AuthApi;
