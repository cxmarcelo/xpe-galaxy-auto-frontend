import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarsPageComponent } from './search-cars-page.component';

describe('SearchCarsPageComponent', () => {
  let component: SearchCarsPageComponent;
  let fixture: ComponentFixture<SearchCarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCarsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
