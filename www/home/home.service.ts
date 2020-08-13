import { HomeRepository } from "./home.repository";
import { Home } from './home';

export class HomeService implements HomeRepository<Home> {
  constructor() {
  }
  
  findById(id: string): Home {
    return;
  }

  create(item: Home): Home {
    return;
  }

  findAll(): Promise<Home> {
    return;
  }

  update(id: string): Home {
    return;
  }

  delete(id: string): void {
    return;
  }
  
}