import get from './get';
import isEmpty from './isEmpty';

class Templator {
  static compile(tmpl, ctx = {}) {
    let key = null;
    const regExp = /\{\{(.*?)\}\}/gi;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        let data = get(ctx, tmplValue);
        data = isEmpty(data) ? '' : data;
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
    }
    return tmpl;
  }

  static compileConcat(data) {
    let res = '';
    data.forEach((obj) => {
      res += Templator.compile(obj.template, obj.context);
    });
    return res;
  }
}

export default Templator;
