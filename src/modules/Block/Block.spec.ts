import {assert} from 'chai';
import Block from './Block';

const tmpl = `<div>
                <div data-component="someComponent"></div>
              </div>`
const someProps = {
  components: {
    someComponent: new Block({someValue: 'someValueProps'}, '<div>{{someValue}}</div>')
  },
  attributes: [
    {
      element: 'root',
      className: {
        type: 'add',
        value: 'to-left',
      },
    },
    {
      element: 'root',
      'data-path': {
        type: 'set',
        value: '/messenger',
      },
    },
  ],
  events: [
    {
      type: 'click',
      element: 'root',
      callback(this: Block) {
        this.setProps({
          attributes: [
            {
              element: 'root',
              className: {
                type: 'remove',
                value: 'to-left',
              },
            }
          ]
        })
      },
    },
  ],
}

describe('Block correct works', () => {
  it('Attributes/props/components are set, events working', () => {
    const testFunc = (el: HTMLElement): boolean => {
      let valid
      valid = el instanceof HTMLDivElement && el.className === 'to-left' && el.dataset.path === '/messenger'
        && el.children[0].textContent === 'someValueProps'
      el.click()
      valid = valid && el.className === ''
      return valid
    }
    const result = testFunc(new Block(someProps, tmpl).getContent())
    assert.isTrue(result)
  });
});
