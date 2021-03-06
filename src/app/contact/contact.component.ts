import { Component, OnInit, OnDestroy, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { contactConfig } from './contact.config';
import { ContactService } from './contact.service';

import {
    EmitterService,
    validateEmail
} from '../shared/index';

import * as RX from 'rxjs/Rx';

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
export class ContactComponent implements OnInit, OnDestroy {

    public fromUser: FormGroup;

    @ViewChildren('parallex')
    parallex: any;

    private activeFormControl: any = {};
    private imgLoaded: Boolean[] =[];
    private observable: any;
    private payload: any;
    private sections = contactConfig.sections;
    private sentSuccess: Boolean = false;

    constructor(
        private contactService: ContactService
    ) {
        // preload images
        for(let i in this.sections) {
            this.imgLoaded.push(false);
            if(this.sections[i].hasOwnProperty('img')) {
                let image = new Image();
                image.onload = () =>  {this.imgLoaded[i] = true}
                image.src = this.sections[i]['img']['src'];
            } 
        }
    } 

    ngOnInit(): void {
        window.scrollTo(0,0);
        this.buildForm();

        this.observable = RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => { this.updateImageDims() });
    }

    ngOnDestroy(): void {
        window.scrollTo(0,0);
        this.observable.unsubscribe();
    }

    onSubmit() {
        if(this.fromUser.valid){
            this.payload = JSON.stringify(this.fromUser.value);
            this.sendMessage();
        }
        return false;
    }
    
    private buildForm(): void {
        this.fromUser = new FormGroup({
            name: new FormControl('', Validators.required ),
            message: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, validateEmail])
        });
        this.activeFormControl.name = false;
        this.activeFormControl.message = false;
        this.activeFormControl.email = false;
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
                //console.log(err);
                // @todo fix sendmail. Just reponde with true, and check the mail spool for messages

                this.sentSuccess = true;
                this.buildForm();
            });
    }

    private hasEmailError(): boolean {
        let control: any = this.fromUser.get('email');
        if(!this.activeFormControl.email && control.touched && control.hasError('validateEmail')) {
            return true;
        }
        return false;
    }

    private updateImageDims() {
        this.parallex.forEach((e, i) => {e.updateImageDims()});
    }


    setStyle(styles: any): any {
        return styles;
    }

}
