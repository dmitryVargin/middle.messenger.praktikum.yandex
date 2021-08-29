declare class Validation {
    isValid: boolean;
    private readonly value;
    constructor(value: string);
    email(): this;
    required(): this;
    maxLength(length: number): this;
    minLength(length: number): this;
    onlyLetters(): this;
    onlyNumbers(): this;
    phone(): this;
    lettersOrNumbers(): this;
}
export declare function checkValidationByTemplate(template: string, value: string): boolean;
export default Validation;
