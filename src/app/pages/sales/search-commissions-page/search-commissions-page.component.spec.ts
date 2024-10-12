import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommissionsPageComponent } from './search-commissions-page.component';

describe('SearchCommissionsPageComponent', () => {
  let component: SearchCommissionsPageComponent;
  let fixture: ComponentFixture<SearchCommissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCommissionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCommissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
