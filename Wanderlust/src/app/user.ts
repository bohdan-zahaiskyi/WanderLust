export class User {
  constructor() {
    this.phone = {
      code: undefined,
      number: undefined
    };
  }
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  personCompany: string;
  phone: {
    code: string,
    number: string
  };
  country: string;
  state: string;
  city: string;
}
