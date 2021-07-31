import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import Templator from './Templator';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type ClassName = {
  type: 'add' | 'remove';
  value: string;
};
type Attribute = {
  type: 'set' | 'remove';
  value?: string;
};
type Attributes = {
  element: string;
  className?: ClassName;
  [key: string]: Attribute | string | ClassName | undefined;
};

type PropsEvent = {
  type: string;
  element: string;
  callback: (event: Event) => void;
};
export type Props = {
  withInternalId?: boolean;
  events?: PropsEvent[];
  attributes?: Attributes[];
  components?: { [key: string]: any };
  [key: string]: any;
};

interface IMeta {
  tmpl: string;
  props: Props;
}

class Block {
  public props: Props;

  protected _meta: IMeta;

  protected eventBus: EventBus;

  private readonly _id: string | undefined;

  private _boundEvents: PropsEvent[];

  constructor(props = {}, tmpl: string) {
    this._boundEvents = [];
    this.eventBus = new EventBus();
    this._meta = {
      tmpl,
      props,
    };
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    if (this.props.withInternalId) {
      this._id = makeUUID();
    }
    this._registerEvents();
    this.eventBus.emit(EVENTS.INIT);
  }

  protected _element!: HTMLElement;

  protected get element(): HTMLElement {
    return this._element;
  }

  destroyElem(): void {
    this.element.remove();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, { ...nextProps });
  };

  render(): HTMLCollection {
    return Templator.getCompiledChildren(this._meta.tmpl, this.props);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidMount() {}

  protected init(): void {
    this._createResources();
    this.eventBus.emit(EVENTS.FLOW_CDM);
  }

  protected componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    return oldProps !== newProps;
  }

  protected show(): void {
    this.getContent().classList.remove('hidden');
  }

  protected hide(): void {
    this.getContent().classList.add('hidden');
  }

  private _registerEvents(): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const element = Templator.getCompiledParent(this._meta.tmpl, this.props) as HTMLElement;

    if (this._id) {
      element.dataset.id = this._id;
    }
    this._element = element;
  }

  private _makePropsProxy<T>(target: Record<string, T>): Props {
    return new Proxy(target, {
      get: (target, prop: string): T => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value: T) => {
        if (typeof target[prop] === 'object') {
          Object.assign(target[prop], value);
        } else {
          target[prop] = value;
        }
        this.eventBus.emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  private addEvents(): void {
    const events = this._boundEvents;
    events.forEach(({ type, element, callback }) => {
      if (element) {
        if (element === 'root') {
          const innerEl = this.element;
          innerEl.addEventListener(type, callback);
        } else {
          const innerEl = this.element.querySelectorAll(element);
          innerEl.forEach((el) => {
            el.addEventListener(type, callback);
          });
        }
      }
    });
  }

  private removeEvents(): void {
    const events = this._boundEvents;

    events.forEach(({ type, element, callback }) => {
      if (element) {
        let innerEl;
        if (element === 'root') {
          innerEl = this.element;
        } else {
          innerEl = this.element.querySelector(element) as HTMLElement;
        }
        innerEl.removeEventListener(type, callback);
      }
    });

    if (this.props.events) {
      this._boundEvents = [];
      this.props.events.forEach(({ type, element, callback }) => {
        this._boundEvents.push({
          type,
          element,
          callback: callback.bind(this),
        });
      });
    }
  }

  private setAttributes(el: Element): Element {
    if (this.props.attributes !== undefined) {
      this.props.attributes.forEach((obj: Attributes) => {
        let innerEl = el;
        if (obj.element !== 'root') {
          innerEl = el.querySelector(obj.element) as HTMLElement;
        }
        if (innerEl !== null) {
          Object.keys(obj).forEach((key) => {
            if (key !== 'element') {
              if (key === 'className') {
                const type = obj[key]?.type;
                const value = obj[key]?.value;
                if (type !== undefined && value !== undefined) {
                  innerEl.classList[type](value);
                }
              } else {
                const attribute = obj[key] as Attribute;
                const { type } = attribute;
                const { value } = attribute;
                if (type === 'set') {
                  innerEl.setAttribute(key, <string>value);
                } else if (type === 'remove') {
                  innerEl.removeAttribute(key);
                }
              }
            }
          });
        }
      });
    }

    return el;
  }

  private _render(): void {
    const block = this.render();

    if (block.length) {
      this._element.innerHTML = '';
      this._element.append(...block);
    }
    this.removeEvents();
    this.setAttributes(this._element);
    this.addEvents();
  }
}

export default Block;
