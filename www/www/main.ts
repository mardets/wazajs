
import { Application } from './application';
import { PageProvider } from '../lib/provider/page';
import { Router } from './router';
import { Layout } from '../lib/application/layout/layout';
import { ApplicationController } from '../lib/application/controller/application';
import { AppController } from './application.controller';
//import { CacheTpl } from './core/templates';

window.onload = () => {
  let router = new Router();
  let layout = new Layout(new PageProvider(router));
  let app = new Application(layout);
  let appCtrl = new AppController(layout);
  app.start(appCtrl);
}
