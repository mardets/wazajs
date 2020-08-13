import { PackRepository } from "./pack.repository";
import { Pack } from './pack';
import { HttpProvider } from '../../lib/provider/http';

export class PackService implements PackRepository<Pack> {
	  
  
  constructor(private http: HttpProvider) {
  }
  
  findById(id: string): any {
	let path = '/packs/' + id;
	let options = {
		method: 'GET',
		mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin' // include, *same-origin, omit
	}
    return this.http.request(path, options) 
	.then((res: any) => {
		
			return res;
		}
	);
	
  }

  create(item: Pack): any {
    return;
  }

  findAll(): Promise<any> {
    let path = this.http.getAPIUrl() + '/packs/list';
	
	let mheaders = new Headers();
		
	mheaders.append("Content-Type", "application/json");
	mheaders.append("lang", "en");
	mheaders.append("Access-Control-Allow-Origin", "*");
	mheaders.append("Content-Type", "application/json; charset=utf8");
	mheaders.append("Connection", "keep-alive");
	mheaders.append("Cache-Control", "no-cache");
	mheaders.append("X-Powered-By", "Express");
	
	let options = {
		method: 'GET',
		mode: 'cors', // no-cors, cors, *same-origin
        credentials: 'include' // include, *same-origin, omit
	}
	
	let init = {
			method: options.method,
			headers: mheaders,
			mode: options.mode,
			credentials: options.credentials
	}
	
    return this.http.request(path, init) 
	.then((response: any) => {
			return new Promise(resolve => {
				setTimeout(() => {
				  resolve(response);
				}, 2000);
		  });
		}
	);
  }

  update(id: string): any {
    return;
  }

  delete(id: string): void {
    return;
  }
  
}