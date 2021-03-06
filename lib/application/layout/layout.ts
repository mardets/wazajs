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
		/*let uri = pathuri.substring(1, pathuri.length) + '\\' + pathuri.substring(1, pathuri.length);
		if(cacheTpl[uri + '.html'] !== undefined) {
			this.layoutView = cacheTpl[uri + '.html']
		}
		else {
			let uri = pathuri.substring(1, pathuri.length) + pathuri.substring(1, pathuri.length);
			this.layoutView = cacheTpl[uri + '.html']
		}*/
		if(pathuri) {
			let _pathuri = pathuri.substring(1, pathuri.length);
			let uri = _pathuri.substr(0, _pathuri.indexOf("/"));
			
			if(pathuri.includes('create')) {
				this.layoutView = cacheTpl[uri + 'create.html'];
			}
			
			if(pathuri.includes('update')) {
				this.layoutView = cacheTpl[uri + 'edit.html'];
			}
			
			if(pathuri.includes('list')) {
				this.layoutView = cacheTpl[uri + 'list.html'];
			}
			
			if(!pathuri.includes('create') && !pathuri.includes('update') && !pathuri.includes('list')) {
				uri += uri;
				this.layoutView = cacheTpl[uri + '.html'];
			}
		}
	} else {
		this.layoutView = cacheTpl['layout\layout.html'];
	}
	setTimeout(() => {
		this.page.setCacheTpl(pathuri, pathuri.substring(1, pathuri.length), this.layoutView, cb, resource);
	}, 1100)
	
  }

  getPage():  PageProvider {
    return this.page;
  }

}