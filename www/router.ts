import { CacheTpl } from './view/templates';
import { RouterProvider } from '../lib/provider/router';

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
      { path: '/', component: this.load('', '') }, // Default
      { path: '/home', component: this.load('home', 'Home') }
    ]
  }

  
  
}