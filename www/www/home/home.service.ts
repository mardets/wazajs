import { HomeRepository } from "./home.repository";
import { Home, HomeId } from './home';

export class HomeService implements HomeRepository<Home, HomeId> {
  constructor() {
  }
  
  findById(id: HomeId): Home {
    return;
  }

  create(item: Home): Home {
    return;
  }

  findAll(): Home[] {
    return;
  }

  update(id: HomeId): Home {
    return;
  }

  delete(id: HomeId): void {
    return;
  }
  
}