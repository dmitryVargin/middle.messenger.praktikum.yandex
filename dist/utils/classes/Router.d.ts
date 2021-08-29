import Block from '../../modules/Block/Block';
import Route from './Route';
export declare type Pathname = string;
declare class Router {
    private static __instance;
    routes: Route[];
    history: History;
    private _currentRoute;
    private readonly _rootQuery;
    constructor(rootQuery: string);
    use(pathname: Pathname, block: Block, isProtected: boolean): Router;
    getCurrentRoute(): Route | null;
    start(): void;
    _onRoute(pathname: Pathname): void;
    go(pathname: Pathname): void;
    back(): void;
    forward(): void;
    getRoute(pathname: Pathname): Route | undefined;
}
export default Router;
