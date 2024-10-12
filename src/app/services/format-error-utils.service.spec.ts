import { TestBed } from '@angular/core/testing';

import { FormatErrorUtilsService } from './format-error-utils.service';

describe('FormatErrorUtilsService', () => {
  let service: FormatErrorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatErrorUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
