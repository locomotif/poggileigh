import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerhtmlPipe } from "./innerhtml.pipe";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ InnerhtmlPipe ],
    exports: [
        CommonModule,
        InnerhtmlPipe
    ]
})
export class SharedModule { }
