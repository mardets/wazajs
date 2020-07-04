
import { Application } from './core/application';
import { PageProvider } from './provider/page';
import { RouterProvider } from './provider/router';
import { Layout } from './application/layout/layout';
import { ApplicationController } from './application/controller/application';
//import { CacheTpl } from './core/templates';

window.onload = () => {
  let router = new RouterProvider();
  let layout = new Layout(new PageProvider(router));
  let app = new Application(layout);
  let appController = new ApplicationController(layout);
  app.start(appController);
}
