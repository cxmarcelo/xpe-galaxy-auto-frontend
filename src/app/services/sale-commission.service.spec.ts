import { TestBed } from '@angular/core/testing';

import { SaleCommissionService } from './sale-commission.service';

describe('SaleCommissionService', () => {
  let service: SaleCommissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleCommissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
