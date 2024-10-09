import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSalesPageComponent } from './search-sales-page.component';

describe('SearchSalesPageComponent', () => {
  let component: SearchSalesPageComponent;
  let fixture: ComponentFixture<SearchSalesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSalesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
