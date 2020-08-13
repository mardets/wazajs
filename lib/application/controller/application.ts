import { Hash } from '../../core/config/hash';
import { Path } from '../../core/config/path';
import { Location } from '../../core/config/location';
import { Layout } from '../layout/layout';
import { Helper } from '../../core/util/helper';

export class ApplicationController {
  location:Location;
  hash: Hash;
  path: Path;
  resources: any[];
  
  constructor(private layout: Layout) {
    this.resources = [];
	this.hash = new Hash();
	this.path = new Path();
	this.location = new Location();
  }

  displayLayout(layout: Layout, hashname: string, resource?: any, title?: string, callback?: Function) {
    let layoutToDisplay:any = layout;
	let path = '/' + hashname;
	if(path.charAt(2) === '/') {
		path = path.substring(2, path.length);
	}
    layoutToDisplay.setViewLayout(path, title, this.setTemplate || callback, resource);
  }

  getResources(): any[] {
	return this.resources;
  }
  getLayout(): Layout {
	  return this.layout;
  }
  
  setLayout(layout: Layout) {
	  this.layout = layout;
  }
  
  render(template: string, title?: string, data?:any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
	window.document.querySelector('title').textContent = title;
  }
  
  async handler(resource: ApplicationController, template: string) {
	let arrayRoutes = resource.getLayout().getPage().getRoute().getRoutes();
	let routeResource = Helper.filter(arrayRoutes, '/' + resource.getLayout().hash.name);
	if( routeResource === undefined) {
		this.render('<p>404 page : the resource is not available</p>', '404 error');
	} else {
		if(routeResource.path !== '/') {
			var response:any = await routeResource.handler();
		}
		
		this.render(template, resource.location.title);
		this.htmlMarkup('#list',response);
	}
  }
  
  setResources(resource: any) {
	if(resource.getResources !== null) {
		this.resources[this.resources.length] = resource;
	}
  }
  
  static reload(layout: Layout, hash: string, title?: string) {
	
    this.prototype.displayLayout(layout, hash, this, title, this.prototype.setTemplate);
	window.location.reload();
  }
  
  setTemplate(template: string, clazz: any, hashname?:string) {
	let resources = clazz.instanceBuilder();
	for (let i = 0; i < resources.length; i++) {
      if (resources[i].getLayout().hash.name.includes(resources[i].hash.name)) {
		clazz.handler(resources[i], template);
        break;
      }
    }
	return;
  }
  
  /**
  * Example case
  */
  htmlMarkup(style: string, data: any) {
	 var markupEl = window.document.querySelector(style); 
	 if(style.includes('list')) {
		var ul = window.document.createElement('ul');
		
		for (let i=0; i < data.length; i++) {
			let li = window.document.createElement('li');
			let a = window.document.createElement('a');
			
			li.appendChild(a);
			a.textContent = data[i].ref_pack;
			ul.appendChild(li);
			markupEl.appendChild(ul);
		}
		
	 }
	 
  }
}
