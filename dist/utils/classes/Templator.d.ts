import { Props } from '../../modules/Block/Block';
declare const Templator: {
    compile(tmpl: string, ctx?: {}): string;
    getCompiledParent(tmpl: string, ctx: Props): Element;
    getCompiledChildren(tmpl: string, ctx: Props): HTMLCollection;
    compileToHtml(tmpl: string, ctx: Props): Element;
};
export default Templator;
