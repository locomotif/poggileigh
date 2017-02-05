/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimelineConfigService } from './timeline-config.service';

describe('TimelineConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimelineConfigService]
    });
  });

  it('should ...', inject([TimelineConfigService], (service: TimelineConfigService) => {
    expect(service).toBeTruthy();
  }));
});
