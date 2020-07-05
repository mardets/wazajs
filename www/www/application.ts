import { Layout } from '../lib/application/layout/layout';
import { AppController } from './application.controller';

export class Application {
	
  constructor(private layout: Layout) {
  }

  start(appController: AppController) {
	try {
		appController.init();
		console.log('App started! Welcome to Waza.');
		return this;
	} catch(err) {
		console.error('Error starting application!', err);
	}
  }
}