import { Hash } from '../../core/config/hash';
import { Path } from '../../core/config/path';
import { Location } from '../../core/config/location';
import { Layout } from '../layout/layout';
import { Helper } from '../../core/util/helper';
import { Resources } from '../../../app/resources';

export class ApplicationController {
  location:Location;
  hash: Hash;
  path: Path;
  resources: any[];
  document: any;
  
  constructor(private layout: Layout) {
    this.resources = [];
	this.hash = new Hash();
	this.path = new Path();
	this.location = new Location();
  }

  /*init(layout: Layout) {
	console.log("Init method for starting application instance");
    this.getResources();
    this.displayLayout(this.layout, this.hash.getName());
	return this;
  }*/

  displayLayout(layout: Layout, hashname: string, resource?: any, title?: string, callback?: Function) {
    //this.hash.setName(hashname);
	/*if(this.hash.getName() === undefined) {
      this.hash.setName(window.location.hash || '');
    }*/
    let layoutToDisplay:any = layout;
    //this.path.setName(window.location.pathname + hashname.substr(2, hashname.length -1));
	let path:string = '/' + hashname;
    layoutToDisplay.setViewLayout(/*this.path.getName()*/path, title, this.setTemplate || callback, resource);
  }

  getChildInstances(): any[] {
        //return Resources.list(this.layout);
return [];
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
  
  render(template: string, type: any, title?: string) {
	if(title !== '' || title !== undefined) {
		this.location.setTitle(title);
	}
    var contentEl = document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
  
  setResources(resource: any) {
	if(resource.getResources !== null) {
		this.resources[this.resources.length] = resource;
	}
  }
  
  static reload(layout: Layout, hash: string, title?: string) {
    this.prototype.displayLayout(layout, hash, this, title, this.prototype.setTemplate);
  }
  
  setTemplate(template: string, clazz: any, title?: string) {
    for (let i = 0; i < this.getResources().length; i++) {
      if (this.getResources()[i].constructor.name
              .toLowerCase().indexOf(clazz.hash) === 0) {
        this.getResources()[i].render(template, clazz, title);
        break;
      }
    }
	return;
  }
}
