export class Article {
  id: number;
  name: string;
  birthdate: Date;
  anniversary: Date;
  gender: string;
  address: {
    street: string;
    city: string;
    pinCode: number;
    state: string;
  };
}
