
export class HttpProvider {
	
	resource: any;
	
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
	
	fetch(path:string, options:any, collection?:string): any {
		let url = this.getAPIUrl() + path;
		let mheaders = new Headers();
		if(collection != "" && collection != undefined) {
			url = this.queryString(collection, path);
			mheaders.append("api-key", this.getApiKey());
		}
		
		let init = {
			method: options.method,
			headers: mheaders,
			mode: options.mode
			
		}
		
		
		return fetch(url, init).then(function(response) {
		  if(response.ok) {
			  return response.json();
		  } else {
			  throw new Error("Request error");
		  }
		});
	}
	
	request(url:string, options:any, path?: string, collection? :string): any {
		if(collection != "" && collection != undefined) {
			url = this.queryString(collection, path);
		}
		
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
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