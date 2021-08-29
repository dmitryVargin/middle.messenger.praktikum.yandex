import { Pathname } from './Router';
import Block from '../../modules/Block/Block';
declare type Props = {
    rootQuery: string;
};
declare class Route {
    pathname: Pathname;
    private readonly _block;
    private _props;
    private init;
    isProtected: boolean;
    constructor(pathname: Pathname, view: Block, props: Props, isProtected: boolean);
    navigate(pathname: Pathname): void;
    leave(): void;
    render(): void;
}
export default Route;
