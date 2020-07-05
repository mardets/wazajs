export class HomeId {
  idValue: number;
  constructor(private id: number) {
	  this.idValue = id;
  }
  
  getId(): number {
    return this.idValue;
  }
}

export class Home {

    constructor(private id: HomeId, name: string) {}
    
};
