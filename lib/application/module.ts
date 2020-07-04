import { ApplicationController } from './controller/application';
import { ApplicationLayout } from './layout/application';
import { Layout } from './layout/layout';
//import { CrudRepository } from './repository/crud';

export declare namespace ApplicationModule{
	var applicationController : ApplicationController;
	var applicationLayout : ApplicationLayout;
	var layout : Layout;
};