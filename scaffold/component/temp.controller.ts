import { <%= upParent %>Service } from './<%= name %>.service';
import { <%= upCaseName %>, <%= upCaseName %>Id } from './<%= name %>';
import { ApplicationController } from "../lib/application/controller/application";
import { Layout } from '../application/layout/layout';
import { ApplicationLayout } from "../application/layout/application";

export class <%= upCaseName %>Controller extends ApplicationController implements ApplicationLayout {

  <%= parent %>Service: <%= upCaseName %>Service;

  constructor(private layout: Layout) {
    this.<%= parent %>Service = new <%= upCaseName %>Service();
  }

  findById(id: number): <%= upCaseName %> {
    return this.<%= parent %>Service.findById(new <%= upCaseName %>Id(id));
  }

  create(item: <%= upCaseName %>): <%= upCaseName %> {
    return this.<%= parent %>Service.create();
  }

  findAll(): <%= upCaseName %>[] {
    return this.<%= parent %>Service.findAll();
  }

  update(id: <%= upCaseName %>Id): <%= upCaseName %> {
    return this.<%= parent %>Service.update(id);
  }

  delete(id: <%= upCaseName %>Id): void {
    return this.<%= parent %>Service.delete(id);
  }
  
  render(template: string, type: any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
}
