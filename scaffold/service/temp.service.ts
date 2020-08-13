import { <%= upCaseName %>Repository } from "./<%= name %>.repository";
import { <%= upCaseName %> } from './<%= name %>';
import { HttpProvider } from '../../lib/provider/http';

export class <%= upCaseName %>Service implements <%= upCaseName %>Repository<<%= upCaseName %>> {
  constructor(private http: HttpProvider) {
  }
  
  findById(id: string): <%= upCaseName %> {
    return;
  }

  create(item: <%= upCaseName %>): <%= upCaseName %> {
    return;
  }

  findAll(): <%= upCaseName %>[] {
    return;
  }

  update(id: string): <%= upCaseName %> {
    return;
  }

  delete(id: string): void {
    return;
  }
  
}