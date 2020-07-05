declare namespace Waza {
	
	version: string;
	
	export namespace application {
		
		interface ApplicationLayout {
			render(template: string, clazz?: any): void;
		}
		
		interface CrudRepository<T, TId> {
			findById(id: TId): T;
			create(item: T): T;
			findAll(): T[];
			update(id: TId, item?: T): T;
			remove(id: TId): void;
		}
		
		declare class Layout {
			private page;
			hash: Hash;
			viewLayout: string;
			constructor(page: PageProvider);
			getViewLayout(): string;
			setViewLayout(pathuri: string, title: string, cb?: Function, resource?: any): void;
			getPage(): PageProvider;
			setPage(): void;
		}
		
		declare class ApplicationController {
			private layout;
			location: Location;
			hash: Hash;
			path: Path;
			resources: any[];
			constructor(layout: Layout);
			init(layout: Layout): this;
			displayLayout(layout: Layout, hashname: string, title?: string, callback?: Function): void;
			getResources(): any[];
			getLayout(): Layout;
			setLayout(layout: Layout): void;
			render(template: string, type: any, title?: string): void;
			setResources(resource: ApplicationController): void;
			static reload(layout: Layout, hash: string, title?: string): void;
			setTemplate(template: string, clazz: any, title?: string): void;
		}
	}
	
	export namespace core {
		
		declare class Hash {
			name: string;
			constructor();
			getName(): string;
			setName(name: string): void;
		}
		
		declare class Location {
			title: string;
			constructor();
			getTitle(): string;
			setTitle(title: string): void;
		}

		declare class Path {
			name: string;
			constructor();
			getName(): string;
			setName(name: string): void;
		}
		
		declare class CacheTpl {
			static builder(): {};
		}
		
		declare class CacheTpl {
			static xmlToJson(xml: any): {};
		}
		
		declare class Logger {
			log(msg: string, data?: any): void;
			info(msg: string, data?: any): void;
			warning(msg: string, data?: any): void;
			debug(msg: string, data?: any): void;
			error(msg: string, error: any): void;
		}
	}
	
	export namespace provider {
		
		declare class HttpProvider {
			resource: any;
			constructor();
			getAPIUrl(): string;
			getApiKey(): string;
			getCollectionsList(): any
			queryString(collection, query): string;
			fetch(path, collection, options): any;
			request(path, collection, options): any;
		}
		
		declare class PageProvider {
			private router;
			cacheTpl: any;
			htmlView: string;
			layoutBuilder: any;
			url: string;
			button: any;
			constructor(router: RouterProvider);
			setCacheTpl(url: string, html: string, callback?: Function, resource?: any): void;
			layoutTemplate(html: string, layoutBuilder: any): void;
			getHtmlView(): string;
			setHtmlView(html: string): void;
			getUrl(): string;
			setUrl(url: string): void;
			getRoute(): RouterProvider;
			path(url: string): any;
			filePath(url: string): string;
			bindTagOnClick(tag: string): void;
		}
		
		declare class RouterProvider {
			routes: any[];
			templates: any;
			constructor();
			load(pathDir: string, componentHTMLName: string): any;
			setRoutes(route: any): void;
			getRoutes(): any[];
			getCacheTpl(): any;
			checkingTpl(pathDir: string, componentHTMLName: string): any;
		}
		
	}
}
