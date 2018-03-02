export class Registration {
  constructor() {
    this.user = new User();
  }

  confpass: string;
  user: User;
  userFilled() {
    for (const key in this.user) {
      if (this.user[key] === undefined || this.user[key] === null || this.user[key] === '') {
        return false;
      }
    }
    return true;
  }

  passwordsMatch() {
    return this.confpass === this.user.password;
  }

  passwordLength() {
    return this.user.password.length >= 7;
  }

  emailValid() {
    return this.user.password.length >= 7;
  }
}
export class User {
  constructor() {
    this.phone = [];
    this.phone.push('');
    this.phone.push('');
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
}
