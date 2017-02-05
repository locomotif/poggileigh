import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/index';

import { 
    TimelineComponent, 
    TimelineXaxisDirective,
    TimelinePathDirective,
    TimelineShapeDirective,
} from './index';
import { TimelineMessageComponent } from './timeline-message/timeline-message.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TimelineComponent,
    TimelineXaxisDirective,
    TimelinePathDirective,
    TimelineShapeDirective,
    TimelineMessageComponent
  ],
  providers: [],
  exports: [
    TimelineComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: []
})
export class TimelineModule { }
