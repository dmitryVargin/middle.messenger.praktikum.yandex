import EventBus from './EventBus';
import Templator from './Templator';
import { v4 as makeUUID } from 'uuid';

type Element = HTMLElement;
export type Props = Record<string, any>;
type Meta = {
  tagName: string;
  props: Props;
};

interface IBlock {
  _element: Element;
  props: Props;
  eventBus: () => EventBus;
  _meta: Meta;
  setProps: (nextProps: Props) => void;
  readonly element: HTMLElement;

  _registerEvents(eventBus: EventBus): void;

  _createResources(): void;

  init(): void;

  _componentDidMount(): void;

  componentDidMount(oldProps: Props): void;

  _componentDidUpdate(oldProps: Props, newProps: Props): void;

  componentDidUpdate(oldProps: Props, newProps: Props): boolean;

  _render(): void;

  render(): Element;

  getContent(): Element;

  checkPrivateProp(prop: string): boolean;

  _makePropsProxy(props: Props): Props;

  _createDocumentElement(tagName: string): HTMLElement;

  show(): void;

  hide(): void;
}

class Block implements IBlock {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: Element;

  props: Props;

  tmpl: string;

  eventBus: () => EventBus;

  _meta: Meta;
  private _id: any;

  constructor(tagName = 'div', props: Props = {}, tmpl?: string) {
    this.tmpl = tmpl;
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init(): void {
    this._element = document.createDocumentFragment();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    this.componentDidMount(this.props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps: Props): void {}

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): Element {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  checkPrivateProp(prop: string): boolean {
    return prop.startsWith('_');
  }

  _makePropsProxy(props: Props): Props {
    const self = this;
    return new Proxy(props, {
      set(target, prop: string, value: any) {
        if (self.checkPrivateProp(prop)) {
          throw new Error('Нет прав');
        } else {
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  private removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.removeEventListener(eventName, events[eventName].bind(this));
    });
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.firstElementChild.addEventListener(
        eventName,
        events[eventName],
      );
    });
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }

  _render() {
    const block = this.render();

    this.removeEvents();
    this._element.append(block);

    // if (this._id !== null) {
    //   this._element.firstElementChild.setAttribute('data-id', this._id);
    // }

    this._addEvents();
  }

  render(): Element {
    return Templator.compileToHtml(this.tmpl, this.props);
  }
}

export default Block;
