import { PageProvider } from '../../provider/page';
import { Hash } from '../../core/config/hash';
export class Layout {

  layout: string;
  hash: Hash;
  layoutView: string;

  constructor(private page:  PageProvider) {
	this.hash = new Hash();
	this.layoutView = '';
  }

  getViewLayout(): string {
    return this.layoutView;
  }

  setViewLayout(pathuri: string, title: string, cb?: Function, resource?: any): void {
    
	let cacheTpl = this.page.getRoute().getCacheTpl();
	if (pathuri !== '/') {
		let uri = pathuri.substring(1, pathuri.length) + '\\' + pathuri.substring(1, pathuri.length);
		if(cacheTpl[uri + '.html'] !== undefined) {
			this.layoutView = cacheTpl[uri + '.html']
		}
		else {
			let uri = pathuri.substring(1, pathuri.length) + pathuri.substring(1, pathuri.length);
			this.layoutView = cacheTpl[uri + '.html']
		}
	} else {
		this.layoutView = cacheTpl['layout\layout.html'];
	}
	this.page.setCacheTpl(pathuri, pathuri.substring(1, pathuri.length), this.layoutView, cb, resource);
  }

  getPage():  PageProvider {
    return this.page;
  }

}