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
  
  render(template: string, title?: string) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
	window.document.querySelector('title').textContent = title;
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
	let resources = JSON.parse(localStorage.getItem('resources'));
	for (let i = 0; i < resources.length; i++) {
      if (resources[i].hash.name.indexOf(hashname) === 0) {
		if(clazz.constructor.name !== 'ApplicationController') {
			clazz.render(template, resources[i].location.title);
		} else {
			clazz.prototype.render(template, resources[i].location.title);
		}
        break;
      }
    }
	return;
  }
}