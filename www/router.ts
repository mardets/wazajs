import { CacheTpl } from './view/templates';
import { RouterProvider } from '../lib/provider/router';
import { PackController } from './pack/pack.controller';

export class Router extends RouterProvider {
  routes: any[];
  templates: any;
  constructor() {
	super();
    this.templates = CacheTpl.builder();
    console.log(this.templates);
    this.getRoutes();
	
  }
  
  getRoutes(): any[] {
    return this.routes = [
      { path: '/', component: this.load('', '', this.templates) }, // Default
      { path: '/home', component: this.load('home', 'Home', this.templates) },
      { path: '/pack/list', component: this.load('pack', 'List', this.templates), handler: PackController.findAll }
    ]
  }

  
  
}
