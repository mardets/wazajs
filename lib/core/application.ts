export class Application {
	
  constructor(private layout: Layout) {
  }

  start(ApplicationController: applicationController) {
	try {
		applicationController.init(this.layout).init();
		console.log('App started! Welcome to Waza.');
	} catch(err: Error) {
		console.log('Error starting application!', err);
	}
  }
}