export class Hash {
	
	name: string;
	window: any;
	
	constructor() {
		this.name = window.location.hash.substr(2, window.location.hash.length - 1);
	}
	
	public getName(): string {
		return this.name;
	}
	
	public setName(name: string) {
		this.name = name;
	}
	
	
}