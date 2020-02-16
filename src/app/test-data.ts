import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    const articleDetails = [
      // { id: 101, title: 'Angular by Krishna', category: 'Angular' },
      // { id: 102, title: 'Core Java by Vishnu', category: 'Java' },
      // { id: 103, title: 'NgRx by Rama', category: 'Angular' }
      // tslint:disable-next-line: max-line-length
      { id: 1, name: 'Dhwani Joshi', birthdate: '1996-03-14', anniversary: '', gender: 'Female', street: 'Premchand Nagar, Vastrapur', city: 'Ahmedabad', state: 'Gujarat' , pinCode: '380054' }
    ];
    return { articles: articleDetails };
  }
}
