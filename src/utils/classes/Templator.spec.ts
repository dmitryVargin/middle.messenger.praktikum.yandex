import {expect, assert} from 'chai';

import Templator from './Templator';
import Block from '../../modules/Block/Block';


const props = {someClass: 'class1', value: 'value1'}
const blockTmpl = `<div class="{{someClass}}"><div>{{value}}</div></div>`
const someComponents = [new Block(props, blockTmpl), new Block(props, blockTmpl)]
const tmpl = `<div class="{{someClass}}">
               <div>{{value}}</div>
               <div data-component="someComponents"></div>
              </div>`

describe('Test Templator', () => {

  it('should return compiled string correctly', () => {
    expect(Templator.compile(blockTmpl, props)).equal(`<div class="class1"><div>value1</div></div>`)
  });

  it('should return HTML element with props and without children', () => {
    const testFunc = (el: Element) => el instanceof HTMLDivElement && el.className === 'class1' && el.children.length === 0
    const result = testFunc(Templator.getCompiledParent(blockTmpl, props))
    assert.isTrue(result)
  });

  it('should return HTML elements with props and without parents', () => {
    const testFunc = (elements: HTMLCollection) => {
      let valid = false
      Array.from(elements).forEach(el => {
        valid = el instanceof HTMLDivElement && el.textContent === 'value1'
      })
      return valid
    }
    const result = testFunc(Templator.getCompiledChildren(blockTmpl, props))
    assert.isTrue(result)
  });

  it('should return HTML elements with props and components', () => {
    const testFunc = (element: Element) => {
      const childString = `<div class="class1"><div>value1</div></div>`
      return element.className === 'class1' && element.children[0].textContent === 'value1'
        && element.children[1].outerHTML === childString && element.children[2].outerHTML === childString
    }
    const result = testFunc(Templator.compileToHtml(tmpl, {
      ...props,
      components: {someComponents}
    }))
    assert.isTrue(result)
  });
});
