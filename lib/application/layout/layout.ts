import { PageProvider } from '../provider/page';
import { Header } from './header/header';
import { Nav } from './nav/nav';
export class Layout {

  layout: string;
  hash: Hash;

  constructor(private page:  PageProvider) {
	this.hash = new Hash();
  }

  getLayout(): string {
    return this.page.filePath(window.location.pathname);
  }

  setLayout(url: string, title: string, cb?: Function, resource?: any): void {
    
	let cacheTpl = this.page.getRoute().getCacheTpl();
	if(title !== '') {
	  this.page.setHtmlView('');
	}
	
	setTimeout(() => {
	  let html: string = cacheTpl[this.hash.getName() + url + '.html'] || cacheTpl['layout/layout.html'];
	  // Setting the Layout Page
	  this.page.setPage(url, html, cb, resource);
	}, 800);
  }

  getPage():  PageProvider {
    return this.page;
  }

}