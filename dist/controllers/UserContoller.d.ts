import { UserFromServer, UserPassword } from './AuthController';
declare class UserContoller {
    static updateProfile(data: UserFromServer): Promise<XMLHttpRequest>;
    static updateProfileAvatar(avatar: FormData): Promise<XMLHttpRequest>;
    static updateUserPassword(oldPassword: UserPassword, newPassword: UserPassword): void;
    static getUserById(id: UserFromServer['id']): void;
    static searchUsersByLogin(login: string): void;
}
export default UserContoller;
