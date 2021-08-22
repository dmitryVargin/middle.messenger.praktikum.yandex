const letters = /^[a-z]+$/i;
const numbers = /^\d+$/;
const phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const email = /^\S+@\S+\.\S+$/;
const lettersOrNumbers = /^[a-z0-9]+$/ && /[a-z]/ && /[0-9]/;

class Validation {
  isValid = true;

  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  email(): this {
    this.isValid = email.test(this.value) && this.isValid;
    return this;
  }

  required(): this {
    this.isValid = !!this.value.length && this.isValid;
    return this;
  }

  maxLength(length: number): this {
    this.isValid = this.value.length <= length && this.isValid;
    return this;
  }

  minLength(length: number): this {
    this.isValid = this.value.length >= length && this.isValid;
    return this;
  }

  onlyLetters(): this {
    this.isValid = letters.test(this.value) && this.isValid;
    return this;
  }

  onlyNumbers(): this {
    this.isValid = numbers.test(this.value) && this.isValid;
    return this;
  }

  phone(): this {
    this.isValid = phone.test(this.value) && this.isValid;
    return this;
  }

  lettersOrNumbers(): this {
    this.isValid = lettersOrNumbers.test(this.value) && this.isValid;
    return this;
  }
}

export function checkValidationByTemplate(
  template: string,
  value: string,
): boolean {
  const validation = new Validation(value);
  let isValid;
  switch (template) {
    case 'email':
      isValid = validation.email().isValid;
      break;
    case 'login':
      isValid = validation.minLength(4).lettersOrNumbers().isValid;
      break;
    case 'first_name':
      isValid = validation.minLength(2).onlyLetters().isValid;
      break;
    case 'second_name':
      isValid = validation.minLength(2).onlyLetters().isValid;
      break;
    case 'phone':
      isValid = validation.phone().isValid;
      break;
    case 'password':
      isValid = validation.minLength(6).lettersOrNumbers().isValid;
      break;
    default:
      isValid = false;
  }
  return isValid;
}

export default Validation;
