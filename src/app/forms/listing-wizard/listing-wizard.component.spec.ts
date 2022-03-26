import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingWizardComponent } from './listing-wizard.component';

describe('ListingWizardComponent', () => {
  let component: ListingWizardComponent;
  let fixture: ComponentFixture<ListingWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
