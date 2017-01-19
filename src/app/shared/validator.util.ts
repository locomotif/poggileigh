import { FormControl } from '@angular/forms';

export function validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (isEmptyInputValue(c.value)) {
        return null; // don't validate empty values to allow optional controls
    }

    return EMAIL_REGEXP.test(c.value) ? null : {
        validateEmail: {
            valid: false
        }
    };

    function isEmptyInputValue(value: any): any {
        return value == null || typeof value === 'string' && value.length === 0;
    }
}
