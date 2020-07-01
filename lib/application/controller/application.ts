export class ApplicationController {
  title:any;
  hash: Hash;
  path: Path;
  resources: any[];
  
  constructor(private layout: Layout) {
    this.resources = [];
	this.hash = new Hash();
	this.path = new Path();
	this.title = '';
  }

  init() {
    this.instanceBuilder();
    this.displayLayout(this.layout, this.hash.getName());
  }

  displayLayout(layout: Layout, hashname: string, title?: string, callback?: Function) {
    if(this.hash.getName() === undefined) {
      this.hash.setName(window.location.hash || '');
    }
    this.hash.setName(hashname);
    let layoutToDisplay:any = layout;
    this.path.setName(hashName);
    layoutToDisplay.setLayout(this.path.getName(), title, callback, this);
  }

  getResources(): any[] {
	return resources;
  }
  
  setResources(resource: T extends ApplicationController) {
	resources[resources.length] = resource;
  }
  
  static reload(layout: Layout, hash: string) {
    this.prototype.displayLayout(layout, hash, this.prototype.setTemplate);
  }
  
  setTemplate(template: string, clazz: any) {
    clazz.hash = clazz.getHash(localStorage.getItem('hash'));
    for (let i = 0; i < clazz.instanceBuilder().length; i++) {
      if (clazz.instanceBuilder()[i].constructor.name
              .toLowerCase().indexOf(clazz.hash) === 0) {
        clazz.instanceBuilder()[i].render(template, clazz);
        break;
      }
    }
  }
}