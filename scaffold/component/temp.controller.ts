import { <%= upParent %>Service } from './<%= name %>.service';
import { <%= upCaseName %> } from './<%= name %>';
import { ApplicationController } from "../../lib/application/controller/application";
import { AppController } from '../application.controller';
import { ApplicationLayout } from "../../lib/application/layout/application";
import { HttpProvider } from '../../lib/provider/http';
import { Constants } from '../constants';

export class <%= upCaseName %>Controller extends ApplicationController implements ApplicationLayout {

  service: <%= upCaseName %>Service;

  constructor(layout: Layout) {
    this.service = new <%= upCaseName %>Service();
  }

  findById(id: string): <%= upCaseName %> {
    return this.service.findById(new <%= upCaseName %>Id(id));
  }

  create(item: <%= upCaseName %>): <%= upCaseName %> {
    return this.service.create();
  }

  findAll(): <%= upCaseName %>[] {
    return this.service.findAll();
  }

  update(id: string): <%= upCaseName %> {
    return this.service.update(id);
  }

  delete(id: string): void {
    return this.service.delete(id);
  }
  
  render(template: string, type: any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
}
