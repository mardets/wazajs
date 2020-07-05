import { CacheTpl } from '../../www/view/templates';

export class RouterProvider {
  routes: any[];
  templates: any;
  constructor() {
	this.routes = [];
    this.templates = CacheTpl.builder();
    console.log(this.templates);
    //this.getRoutes();
  }

  load (pathDir: string, componentHTMLName: string) {
    return pathDir == '' ? this.templates['layout\layout.html'] 
                      : this.checkingTpl(pathDir, componentHTMLName);
    
  }
  
  setRoutes(route: any) {
	this.routes[this.routes.length] = route;
  }
  
  getRoutes(): any[] {
	  return this.routes;
  }

  getCacheTpl() {
    return this.templates;
  }
  
  checkingTpl(pathDir: string, componentHTMLName: string) {
	if(this.templates[pathDir + componentHTMLName.toLowerCase() + '.html'] ) {
		let value = pathDir + componentHTMLName.toLowerCase() + '.html';
		return this.templates[value];
	} else if(this.templates[pathDir + '\\' + componentHTMLName.toLowerCase() + '.html']) {
		let value = pathDir + '\\' + componentHTMLName.toLowerCase() + '.html';
		return this.templates[value];
	} 
	else {
		throw new Error("The specified template doesn't exist. Add a template before routing.")
	}
  }
  
}