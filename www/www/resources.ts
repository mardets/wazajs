import { HomeController } from './home/home.controller';
import { AppController } from './application.controller';
import { Layout } from '../lib/application/layout/layout';
export class Resources {
  
  
  static list(layout: Layout): any[] {
	return [
      new HomeController(layout)
    ]
  }

  
  
}