/**
 * 
 */
import { 
    Component, 
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { TimelineConfigService } from '../../shared/index';
import * as RX from 'rxjs/Rx';

@Component({
  selector: 'app-timeline-filter',
  templateUrl: './timeline-filter.component.html',
  styleUrls: ['./timeline-filter.component.scss'],
  providers:[TimelineConfigService]
})
export class TimelineFilterComponent implements OnInit {

    private show: Boolean = false;
    private activeFilter: string[] = [];
    private checkboxState: any = {};
    private options: string[];
    private labels: any = {
        introduction: 'Intro',
        projects: "Projects",
        experience: 'Work Experience',
        education: 'Education',
    }

    public filterGroup: FormGroup;
    @Output("filterTimeline") applyFilter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(
      private config: TimelineConfigService
  ) { }

  ngOnInit() {
        let observer = {
            next: (x) => {this.updateTimeline(x) },
            error: (err) => console.log(err),
            complete: () => {console.log("complete notified");},
        };
      let group: any = {};
      this.options = this.config.getEventTypes();
      this.options.forEach((e, i) => {
          group[e] = new FormControl(false);
          this.checkboxState[e] = false;
      });
      this.filterGroup = new FormGroup(group);
      this.filterGroup.valueChanges
      .debounceTime(200)
      .subscribe(observer);

  }

  private toggleFilter(event, show: Boolean): void {
      this.show = show;
  }

  private updateTimeline(filter: any) {
      this.applyFilter.emit(this.activeFilter);
  }

  private toggleCheckbox(e, value) {
      e.stopPropagation();
      let c: any;

      for(let i in this.filterGroup.controls){
          if(i == value) {
            c = this.filterGroup.controls[i];
          }
      }
      if(this.checkboxState[value]) {
          this.removeFilter(value, c);
      } else {
          this.addFilter(value, c);
      }
  }

  private addFilter(item: string, c: any) {
      this.activeFilter.push(item);
      this.checkboxState[item] = true;
      c.setValue(true);
  }
  private removeFilter(item: string, c: any) {
      let index = this.activeFilter.indexOf(item);
      if(index >= 0) {
          this.activeFilter.splice(index, 1);
        this.checkboxState[item] = false;
            c.setValue(false);
      }
  }
}
