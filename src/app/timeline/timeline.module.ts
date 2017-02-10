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
import { TimelineFilterComponent } from './timeline-filter/timeline-filter.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    TimelineComponent,
    TimelineXaxisDirective,
    TimelinePathDirective,
    TimelineShapeDirective,
    TimelineMessageComponent,
    TimelineFilterComponent
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
