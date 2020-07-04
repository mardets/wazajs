export class <%= upCaseName %>Id {
  constructor(private id: number) {
  }
  
  getId(): number {
    return this.idValue;
  }
}

export class <%= upCaseName %> {

    constructor(private id: <%= upCaseName %>Id, name: string) {}
    
};
