import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import Templator from './Templator';

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

  private _id: any;

  constructor(tagName = 'div', props = {}) {
    this._id = makeUUID();
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.removeEventListener(eventName, events[eventName].bind(this));
    });
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      const callback = events[eventName].bind(this);
      this._element.firstElementChild.addEventListener(eventName, callback);
    });
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  _render() {
    const block = this.render();

    this._removeEvents();
    console.log(this._element.innerHTML);
    this._element.append(block);

    // if (this._id !== null) {
    //   this._element.firstElementChild.dataset.id = this._id;
    // }
    this._addEvents();
  }

  render() {}
}

export default Block;
