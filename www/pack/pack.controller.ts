import { Pack } from './pack';
import { ApplicationController } from "../../lib/application/controller/application";
import { Layout } from '../../lib/application/layout/layout';
import { PackService } from './pack.service';
import { AppController } from '../application.controller';
import { ApplicationLayout } from "../../lib/application/layout/application";
import { HttpProvider } from '../../lib/provider/http';
import { Constants } from '../constants';

export class PackController extends ApplicationController implements ApplicationLayout {

  static service: PackService;

  constructor(layout: Layout) {
	  super(layout)
    PackController.service = new PackService(new HttpProvider(Constants.getConfig()));
	this.location.title = 'Pack page';
	this.hash.name = 'pack';
  }

  static findById(id: string): any {
    return PackController.service.findById(id);
  }

  static create(item: Pack): any {
    return PackController.service.create(item);
  }

  static findAll(): Promise<any> {
    var resp:any = PackController.service.findAll();
	console.log(resp);
	return resp;
  }

  static update(id: string): Pack {
    return PackController.service.update(id);
  }

  static delete(id: string): void {
    return PackController.service.delete(id);
  }
  
  render(template: string, type: any) {
    var contentEl = window.document.querySelector('.ui-view');
    contentEl.innerHTML = template;
  }
}
