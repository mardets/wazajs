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

  /*render(template: string, clazz: any) {
    clazz.hash = clazz.getHash(localStorage.getItem('hash'));
    for (let i = 0; i < clazz.instanceBuilder().length; i++) {
      if (clazz.instanceBuilder()[i].constructor.name
              .toLowerCase().indexOf(clazz.hash) === 0) {
        clazz.instanceBuilder()[i].render(template, clazz);
        break;
      }
    }
  }

  displayLayout(layout: Layout, hash: string, callback?: Function) {
    let hashName = hash;
    if(hashName === undefined) {
      hashName = window.location.hash || '';
    }
    this.getHash(hashName);
    this.title = document.querySelector('title');
    this.setTitle(hashName);
    let layoutToDisplay:any = layout || this.layout;
    let pathname = this.getPathName(hashName);
    layoutToDisplay.setLayout(pathname, this.title.text, this.render || callback, this);
  }
  
  getResources(): any[] {
	ApplicationController.setResources(Helper.hashToControllerName(ApplicationController.hash.setName(window.location.hash)));
	return ApplicationController.getResources();
  }
  
  instanceBuilder(): any[] {
	  return this.getResources();
  }

  instanceBuilder(): any[] {
    return [
      new AboutController(),
      new AccountController(),
      new HelloController(),
      new FeedController(),
      new ProfileController(),
      new SettingsController(),
      new LoginController(),
      new RegisterController()
    ]
  }

  setTitle(hash: string) {
    if(hash === '' || hash === undefined) {
      this.title.text = 'Home';
    }
    else {
      let text = hash.substr(2, hash.length - 1);
      this.title.text = text.replace(text.charAt(0), text.charAt(0).toUpperCase());
    }
  }

  getPathName(hash: string): string {
    if(hash === 'register' || hash === 'login') {
      return hash;
    }
    else {
      return window.location.pathname + hash.substr(2, hash.length - 1);
    }
  }

  getHash(hash: string): string {
    if(hash.includes('login')) {
      hash = 'login';
    } else if(hash.includes('register')) {
      hash = 'register';
    } else {
      return hash.substr(2, hash.length - 1)
    }
    return hash;
  }

  static reload(layout: Layout, hash: string) {
    this.prototype.displayLayout(layout, hash, this.prototype.render);
  }*/
}