import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerhtmlPipe } from "./innerhtml.pipe";
import { DivExpandDirective } from './div-expand.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ InnerhtmlPipe, DivExpandDirective ],
    exports: [
        CommonModule,
        DivExpandDirective,
        InnerhtmlPipe
    ]
})
export class SharedModule { }
