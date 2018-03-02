import {AbstractControl} from "@angular/forms";

export class SystemValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
  }
  static CheckPassword(AC: AbstractControl) {
    const checkIfPresent = function (sent: string, array: string[]) {
      if (!sent) {return false; }
      const strarr = sent.split('');
      for (let i = 0; i < array.length; i++) {
        if (strarr.indexOf(array[i]) !== -1) {
          return true;
        }
      }
      return false;
    };
    const password = AC.get('password').value; // to get value in input tag
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const syms = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '[', ']', '-', '_', '+', '=', '/', '|', '.', ','];

    if (!password || password.length < 7) {
      AC.get('password').setErrors( {
        Invalid: true,
        Message: 'Length should be at least 7 characters'
      } );
    }
    else {
      if (!checkIfPresent(password, numbers) && !checkIfPresent(password, syms)) {
        AC.get('password').setErrors({
          Invalid: true,
          Message: 'Password is too weak. Try to use numbers or special symbols'
        });
      }
      else {
        return null;
      }
    }
  }
  static checkEmail(AC: AbstractControl){
    const email = AC.get('email').value;

    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      AC.get('email').setErrors( {
        Invalid: true,
        Message: 'Invalid e-mail'
      } );
    }
  }
}
