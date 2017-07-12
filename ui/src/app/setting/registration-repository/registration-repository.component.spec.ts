import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRepositoryComponent } from './registration-repository.component';

describe('RegistrationRepositoryComponent', () => {
  let component: RegistrationRepositoryComponent;
  let fixture: ComponentFixture<RegistrationRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
