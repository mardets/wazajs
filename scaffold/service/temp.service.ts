import { <%= upCaseName %>Repository } from "./<%= name %>.repository";
import { <%= upCaseName %>, <%= upCaseName %>Id } from './<%= name %>';

export class <%= upCaseName %>Service implements <%= upCaseName %>Repository<<%= upCaseName %>, <%= upCaseName %>Id> {
  constructor() {
  }
  
  findById(id: <%= upCaseName %>Id): <%= upCaseName %> {
    return;
  }

  create(item: <%= upCaseName %>): <%= upCaseName %> {
    return;
  }

  findAll(): <%= upCaseName %>[] {
    return;
  }

  update(id: <%= upCaseName %>Id): <%= upCaseName %> {
    return;
  }

  delete(id: <%= upCaseName %>Id): void {
    return;
  }
  
}