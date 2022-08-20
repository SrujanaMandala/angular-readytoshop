import { FormControl, ValidationErrors } from "@angular/forms";

export class Ready2ShopValidators {

    //whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {

        if ((control.value != null) && (control.value.trim().length === 0)) {
            //invalid return error object
            return { 'notOnlyWhiteSpace': true };
        } else {
            //pass when no validation errors
            return null as any;
        }
    }
}
