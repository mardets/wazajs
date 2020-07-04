export class HttpProvider {
	
	resource: any;
	window: any;
	
	constructor(private config: any) {
		this.resource = config;
	}
	
	getAPIUrl(): string {
		return this.resource.api;
	}
	
	getApiKey (): string {
      return this.resource.API_KEY;
    }
	
	getCollectionsList (): any {
      return this.getAPIUrl() + '/collections/?apiKey=' + this.resource.API_KEY;
    }
	
	queryString(collection:string, query:string): string {
		if(!query) {
        query = '';
      } else if (query.includes('?')) {
        query = '/' + query;
      } else {
        query = '?' + query;
      }
      //this.resource.collection = collection;
      let queryString = this.getAPIUrl() + '/collections/' + collection + query + 'apiKey=' + this.getApiKey();
      return queryString;
	}
	
	fetch(path:string, collection:string, options:any): any {
		let url = this.queryString(collection, path);
		
		let headers = {
			'Content-Type': 'application/json',
			'lang': 'en',
			'api-key': this.getApiKey()
		}
		
		let config = { ...options, ...headers };
		
		return this.window.fetch(url, config)
			   .then((response:any) => {
				   if(response.ok ) {
					   return response.json()
				   }
				   //throw new Error(r);
			   })
	}
	
	request(path:string, collection:string, options:any): any {
		let url = this.queryString(collection, path);
		
		
		return new this.window.Promise((resolve:any, reject:any) => {
			const xhr = new this.window.XMLHttpRequest();
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('lang', 'en');
			xhr.setRequestHeader('api-key', this.getApiKey());
			if (options.method = 'GET') {
				xhr.open(options.method, url);
			}
			else {
				xhr.open(options.method, url, options.body);
			}
			xhr.onload = () => resolve(xhr.responseText);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		});
	}
}