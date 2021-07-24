import get from './get';
import isEmpty from './isEmpty';

const Templator = {
  compile(tmpl: string, ctx = {}): string {
    let key = null;
    const regExp = /{{(.*?)}}/gi;
    let innerTmpl = tmpl;
    while ((key = regExp.exec(innerTmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        let data = get(ctx, tmplValue);
        data = isEmpty(data) ? '' : data;
        innerTmpl = innerTmpl.replace(new RegExp(key[0], 'gi'), data);
      }
    }
    return innerTmpl;
  },

  compilePassEmpty(tmpl: string, ctx = {}): string {
    let key = null;
    const regExp = /{{(.*?)}}/gi;
    let innerTmpl = tmpl;
    while ((key = regExp.exec(innerTmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        let data = get(ctx, tmplValue);
        data = isEmpty(data) ? '' : data;
        if (data) {
          innerTmpl = innerTmpl.replace(new RegExp(key[0], 'gi'), data);
        }
      }
    }
    return innerTmpl;
  },

  compileToHtml(tmpl: string, ctx = {}) {
    let innerTmpl = tmpl;
    innerTmpl = this.compilePassEmpty(innerTmpl, ctx);
    if (ctx.components) {
      const domParser = new DOMParser();
      const htmlTmpl = domParser.parseFromString(innerTmpl, 'text/html').body
        .children[0];

      htmlTmpl.querySelectorAll('*').forEach((node) => {
        if (node.nodeName === 'TEMPLATE') {
          node.replaceWith(
            ctx.components[node.content.textContent].getContent(),
          );
        }
      });
      return htmlTmpl;
    }

    return innerTmpl;
  },

  compileConcat(
    data: {
      template: string;
      context: {
        [key: string]: any;
      };
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
