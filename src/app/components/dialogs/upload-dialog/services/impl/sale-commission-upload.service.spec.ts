import { TestBed } from '@angular/core/testing';

import { SaleCommissionUploadService } from './sale-commission-upload.service';

describe('SaleCommissionUploadService', () => {
  let service: SaleCommissionUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleCommissionUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
