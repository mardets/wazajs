import { ApplicationController } from '../application/controller/application';
import { Layout } from '../application/layout/layout';
import { RouterProvider } from './router';
import { Helper } from '../core/util/helper';
export class PageProvider {

  cacheTpl: any;
  htmlView: string;
  layoutBuilder: any;
  url: string;

  constructor(private router: RouterProvider) {
	this.htmlView = '';
	this.url = window.location.href;
	this.layoutBuilder = {};
    this.cacheTpl = router.getCacheTpl();
  }
  
  setCacheTpl(url: string, hashname:string, html: string, callback?: Function, resource?: any) {
    if(url !== '/') {
      this.layoutTemplate(this.cacheTpl['layout\layout.html'], this.layoutBuilder);
      callback(html, resource);
    }
    else {
      this.layoutTemplate(html, this.layoutBuilder);
    }
  }
	
  layoutTemplate(html: string, layoutBuilder: any) {
    this.setHtmlView(html);
	
	let builder = Object.keys(layoutBuilder);
	
	if(builder.length > 1) {
		for(let i=0; i < builder.length; i++) {
			try {
				let el = window.document.querySelector('' + layoutBuilder[builder[i]]);
				el.innerHTML = this.cacheTpl['layout\\' + builder[i] + '\\' + builder[i] + '.html'];
			}
			catch(err) {
				console.log("The page doesnt exist at the layout path", err);
			}
		}
	}
	
    // Binding All 'a' tags to event click
    this.bindTagOnClick('a');
  }
  
  getHtmlView(): string {
	return this.htmlView;
  }

  setHtmlView(html: string): void {
    var el = window.document.querySelector('#app');
	if(!el) {
		console.error('Set the id as "app" to the div first child element of the body');
		return;
	}
    if(html === '' && window.location.pathname !== '') {
      el.innerHTML = '<div><div class="spinner"></div><a href="/">Back To Homepage</a></div>';
	  this.htmlView = el.innerHTML;
    } else {
      el.innerHTML = html;
	  this.htmlView = el.innerHTML;
    }
  }
  
  getUrl(): string {
	  return this.url;
  }
  
  setUrl(url: string) {
	  this.url = url;
  }

  getRoute(): RouterProvider {
    return this.router;
  }

  // @deprecated
  path(url:string): any {
    //return _.find(this.router.getRoutes(), ['path', url]);
  }

  // @deprecated
  filePath(url: string): string {
    return this.path(url).component;
  }

  bindTagOnClick(tag: string) {
    let aList = window.document.querySelectorAll(tag);
    for(let i = 0; i < aList.length; i++) {
      aList.item(i).addEventListener('click', (event:any) => {
        ApplicationController.reload(new Layout(this), event.currentTarget.textContent);
      });
    }
  }
  
}