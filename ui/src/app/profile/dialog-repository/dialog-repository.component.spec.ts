import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRepositoryComponent } from './dialog-repository.component';

describe('DialogRepositoryComponent', () => {
  let component: DialogRepositoryComponent;
  let fixture: ComponentFixture<DialogRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
