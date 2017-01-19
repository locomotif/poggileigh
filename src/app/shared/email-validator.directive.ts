/**
 * @see http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html 
 * @see @angular/forms/src/directives/validator.d.ts
 * An interface that can be implemented by classes that can act as validators.
 *
 * ## Usage
 *
 * ```typescript
 * @Directive({
 *   selector: '[custom-validator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(c: Control): {[key: string]: any} {
 *     return {"custom": true};
 *   }
 * }
 * ```
 *
 * @stable
 */
import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { validateEmail } from './validator.util';

@Directive({
    selector: '[appEmailValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: validateEmail, multi: true}]
})
export class EmailValidatorDirective {

    constructor() { }

}
