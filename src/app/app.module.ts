import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormErrorDirective, OverlayDirective, ParallexDirective, EmailValidatorDirective, FormControlBlurDirective, FormControlFocusDirective} from './shared/';
import { SoftwareEngineerComponent } from './software-engineer/software-engineer.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        DashboardComponent,
        OverlayDirective,
        ParallexDirective,
        EmailValidatorDirective,
        FormControlBlurDirective,
        FormControlFocusDirective,
        FormErrorDirective,
        SoftwareEngineerComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
