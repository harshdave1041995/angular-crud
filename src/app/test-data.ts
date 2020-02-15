import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    const articleDetails = [
      // { id: 101, title: 'Angular by Krishna', category: 'Angular' },
      // { id: 102, title: 'Core Java by Vishnu', category: 'Java' },
      // { id: 103, title: 'NgRx by Rama', category: 'Angular' }
      { id: 1, name: 'Harsh', birthdate: '1995-04-10', anniversary: '', gender: 'male', pinCode: '380054' }
    ];
    return { articles: articleDetails };
  }
}
