import { Layout } from '../application/layout/layout';
import { ApplicationController } from '../application/controller/application';

export class Application {
	
  constructor(private layout: Layout) {
  }

  start(applicationController: ApplicationController) {
	try {
		//applicationController.init(this.layout);
		console.log('App started! Welcome to Waza.');
		return this;
	} catch(err) {
		console.error('Error starting application!', err);
	}
  }
}