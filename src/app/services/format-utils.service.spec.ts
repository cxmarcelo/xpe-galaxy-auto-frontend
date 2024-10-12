import { TestBed } from '@angular/core/testing';

import { FormatUtilsService } from './format-utils.service';

describe('FormatUtilsService', () => {
  let service: FormatUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
