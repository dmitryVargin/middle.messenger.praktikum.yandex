import EventBus from '../../utils/classes/EventBus';
declare type ClassName = {
    type: 'add' | 'remove';
    value: string;
};
declare type Attribute = {
    type: 'set' | 'remove';
    value?: string;
};
declare type Attributes = {
    element: string;
    className?: ClassName;
    [key: string]: Attribute | string | ClassName | undefined;
};
export declare type PropsEvent = {
    type: string;
    element: string;
    callback: (event: Event) => void;
};
export declare type Props = {
    withInternalId?: boolean;
    events?: PropsEvent[];
    attributes?: Attributes[];
    components?: {
        [key: string]: Block | Block[];
    };
    [key: string]: any;
};
interface IMeta {
    tmpl: string;
    props: Props;
}
declare class Block {
    props: Props;
    protected _meta: IMeta;
    protected eventBus: EventBus;
    private _boundEvents;
    constructor(props: {} | undefined, tmpl: string);
    protected _element: HTMLElement;
    protected get element(): HTMLElement;
    destroy(): void;
    create(): void;
    getContent(): HTMLElement;
    setProps: (nextProps: Props) => void;
    render(): HTMLCollection;
    componentDidMount(): void;
    protected init(): void;
    protected componentDidUpdate(oldProps?: Props, newProps?: Props): boolean;
    show(): void;
    hide(): void;
    private _registerEvents;
    private _createResources;
    private _makeProxy;
    private _componentDidMount;
    private _componentDidUpdate;
    private addEvents;
    private removeEvents;
    private setAttributes;
    private _render;
    forceUpdate(): void;
    afterRender(): void;
}
export default Block;
