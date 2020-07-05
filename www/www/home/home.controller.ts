import { HomeService } from './home.service';
import { Home, HomeId } from './home';
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

  findById(id: number): Home {
    return this.Service.findById(new HomeId(id));
  }

  create(item: Home): void {
    this.Service.create(item);
  }

  findAll(): Home[] {
    return this.Service.findAll();
  }

  update(id: HomeId): Home {
    return this.Service.update(id);
  }

  delete(id: HomeId): void {
    return this.Service.delete(id);
  }
  
  render(template: string, type: any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
}
