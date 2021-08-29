import { UserFromServer } from '../controllers/AuthController';
declare class UserApi {
    static updateProfile(data: string): Promise<XMLHttpRequest>;
    static updateProfileAvatar(data: FormData): Promise<XMLHttpRequest>;
    static updateUserPassword(data: string): Promise<XMLHttpRequest>;
    static getUserById(id: UserFromServer['id']): Promise<XMLHttpRequest>;
    static searchUsersByLogin(login: string): Promise<XMLHttpRequest>;
}
export default UserApi;
