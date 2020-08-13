import { Layout } from '../lib/application/layout/layout';
import { ApplicationLayout } from "../lib/application/layout/application";

import { ApplicationController } from '../lib/application/controller/application';
import { Helper } from '../lib/core/util/helper';
import { Resources } from './resources';

export class AppController extends ApplicationController implements ApplicationLayout {
  title:any;
  constructor(layout: Layout) {
    super(layout);
  }

  init() {
	console.log("Init methogfdshfd for starting application instance");
    this.instanceBuilder();
    this.displayLayout(this.getLayout(), window.location.hash, this);
  }
  
  static getInstance() {
	  return this;
  }
  
  instanceBuilder(): any[] {
	  console.log(Resources.list(this.getLayout()));
	  localStorage.setItem('resources', JSON.stringify(Resources.list(this.getLayout())));
	  
	  return Resources.list(this.getLayout());
  }
  
  static reload(layout: Layout, hash: string, title?: string) {
    this.prototype.displayLayout(layout, hash, this, title, this.prototype.setTemplate);
  }

  
}
