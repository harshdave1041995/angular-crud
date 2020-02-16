import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    const articleDetails = [
      // tslint:disable-next-line: max-line-length
      { id: 1, name: 'Dhwani Joshi', birthdate: '1996-03-14', anniversary: '', gender: 'Female', street: 'Premchand Nagar, Vastrapur', city: 'Ahmedabad', state: 'Gujarat' , pinCode: '380054' }
    ];
    return { articles: articleDetails };
  }
}
