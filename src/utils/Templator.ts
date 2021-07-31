import get from './get';
import isEmpty from './isEmpty';
import Block, { Props } from './Block';

const Templator = {
  compile(tmpl: string, ctx = {}): string {
    let key = null;
    const regExp = /{{(.*?)}}/gi;
    let innerTmpl = tmpl;
    // eslint-disable-next-line no-cond-assign
    while ((key = regExp.exec(innerTmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue) as string;
        const dataForTmpl = isEmpty(data) ? '' : data;
        innerTmpl = innerTmpl.replace(new RegExp(key[0], 'gi'), dataForTmpl);
      }
    }
    return innerTmpl;
  },

  compilePassEmpty(tmpl: string, ctx = {}): string {
    let key = null;
    const regExp = /{{(.*?)}}/gi;
    let innerTmpl = tmpl;
    // eslint-disable-next-line no-cond-assign
    while ((key = regExp.exec(innerTmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue) as string;
        const dataForTmpl = isEmpty(data) ? '' : data;
        if (data) {
          innerTmpl = innerTmpl.replace(new RegExp(key[0], 'gi'), dataForTmpl);
        }
      }
    }
    return innerTmpl;
  },

  getCompiledParent(tmpl: string, ctx: Props): Element {
    const innerTmpl = this.compile(tmpl, ctx);
    const domParser = new DOMParser();
    const htmlTmpl: Element = domParser.parseFromString(innerTmpl, 'text/html')
      .body.children[0];
    if (htmlTmpl.children.length) {
      htmlTmpl.innerHTML = '';
    }
    return htmlTmpl;
  },
  getCompiledChildren(tmpl: string, ctx: Props): HTMLCollection {
    return this.compileToHtml(tmpl, ctx).children;
  },

  compileToHtml(tmpl: string, ctx: Props): Element {
    let innerTmpl = tmpl;
    innerTmpl = this.compile(innerTmpl, ctx);

    const domParser = new DOMParser();
    const htmlTmpl: Element = domParser.parseFromString(innerTmpl, 'text/html')
      .body.children[0];
    if (ctx.components) {
      htmlTmpl.querySelectorAll('[data-component]').forEach((node) => {
        // console.log(ctx);
        if (ctx.components !== undefined && node instanceof HTMLElement) {
          const componentContent = ctx.components[
            node.dataset.component as string
          ] as Block | Block[];
          if (componentContent !== undefined) {
            if (Array.isArray(componentContent)) {
              node.replaceWith(
                ...componentContent.map((component) => component.getContent()),
              );
            } else {
              node.replaceWith(componentContent.getContent());
            }
          }
        }
      });
    }

    return htmlTmpl;
  },

  compileConcat(
    data: {
      template: string;
      context: Props;
    }[],
  ): string {
    let res = '';
    data.forEach((obj) => {
      res += Templator.compile(obj.template, obj.context);
    });
    return res;
  },
};

export default Templator;
