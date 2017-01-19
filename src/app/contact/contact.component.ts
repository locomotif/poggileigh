import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { contactConfig } from './contact.config';
import { ContactService } from './contact.service';

import {
    EmitterService,
    validateEmail
} from '../shared/index';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: [
        '../dashboard/dashboard.component.scss',
        './contact.component.scss'
    ],
    host: {'(input-blur)':'onInputBlur($event)', '(input-focus)':'onInputFocus($event)'},
    providers: [  ContactService ],
})
export class ContactComponent implements OnInit {

    public fromUser: FormGroup;


    private sections = contactConfig.sections;
    private activeFormControl: any = {};
    private payload: any;

    constructor(
        private contactService: ContactService
    ) { } 

    ngOnInit () {
        window.scrollTo(0,0);
        this.fromUser = new FormGroup({
            name: new FormControl('', Validators.required ),
            message: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, validateEmail])
        });
        this.activeFormControl.name = false;
        this.activeFormControl.message = false;
        this.activeFormControl.email = false;
    }

    onSubmit() {
        if(this.fromUser.valid){
            this.payload = JSON.stringify(this.fromUser.value);
            this.sendMessage();
        }
        return false;
    }

    private onInputBlur(event) {
        let targetName: string = event.target.getAttribute('formcontrolname');
        if(typeof this.activeFormControl[targetName] !== 'undefined' ){
            this.activeFormControl[targetName] = false;
        }
    }

    private onInputFocus(event) {
        let targetName: string = event.target.getAttribute('formcontrolname');
        if(typeof this.activeFormControl[targetName] !== 'undefined' ){
            this.activeFormControl[targetName] = true;
        }
    }

    private sendMessage() {
        let test = this.contactService.sendMessage(this.payload);
        test.subscribe(
            err => {
                console.log(err);
            });
    }

    private hasEmailError(): boolean {
        let control: any = this.fromUser.get('email');
        if(!this.activeFormControl.email && control.touched && control.hasError('validateEmail')) {
            return true;
        }
        return false;
    }

    setStyle(styles: any): any {
        return styles;
    }

}
