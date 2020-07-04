export class Path {
	
	name: string;
	window: any;
	constructor() {
		this.name = window.location.pathname;;
	}
	
	public getName(): string {
		return this.name;
	}
	
	public setName(name: string) {
		
		this.name = name;
	}
}