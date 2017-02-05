import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { AppRoutingModule } from './app-routing/app-routing.module';

/* Routing Module */
import { TimelineModule } from './timeline/timeline.module';

import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// shared
import { 
    FormErrorDirective, 
    OverlayDirective, 
    ParallexDirective, 
    EmailValidatorDirective, 
    FormControlBlurDirective, 
    FormControlFocusDirective,
    TimelineConfigService,
} from './shared/index';

import { SoftwareEngineerComponent } from './software-engineer/software-engineer.component';

@NgModule({
    bootstrap: [AppComponent],
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
        SoftwareEngineerComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        TimelineModule,
    ],
    exports: [
    ],
    providers: [
        TimelineConfigService
    ]
})
export class AppModule { }
