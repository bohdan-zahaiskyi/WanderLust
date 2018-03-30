export class User {
  constructor() {
    this.phone = [];
    this.phone.push('');
    this.phone.push('');
    this.confirmed = false;
    this.email = '';
  }

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  personCompany: string;
  phone: string[];
  country: string;
  state: string;
  city: string;
  confirmed: boolean;
  friends: any[];
}
