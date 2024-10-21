import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestetPasswordDialogComponent } from './restet-password-dialog.component';

describe('RestetPasswordDialogComponent', () => {
  let component: RestetPasswordDialogComponent;
  let fixture: ComponentFixture<RestetPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestetPasswordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestetPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
