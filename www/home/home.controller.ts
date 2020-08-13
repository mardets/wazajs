import { HomeService } from './home.service';
import { Home } from './home';
import { AppController } from '../application.controller';
import { ApplicationController } from "../../lib/application/controller/application";
import { Layout } from '../../lib/application/layout/layout';
import { ApplicationLayout } from "../../lib/application/layout/application";

export class HomeController extends ApplicationController implements ApplicationLayout {

  Service: HomeService;
  

  constructor(layout: Layout) {
	  super(layout)
    this.Service = new HomeService();
	this.location.title = 'Home page';
	this.hash.name = 'home';
  }

  findById(id: string): Home {
    return this.Service.findById(id);
  }

  create(item: Home): void {
    this.Service.create(item);
  }

  findAll(): Promise<Home> {
    return this.Service.findAll();
  }

  update(id: string): Home {
    return this.Service.update(id);
  }

  delete(id: string): void {
    return this.Service.delete(id);
  }
  
  render(template: string, type: any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
}
