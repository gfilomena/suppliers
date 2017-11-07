import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticSearchComponent } from './semantic-search.component';

describe('SemanticSearchComponent', () => {
  let component: SemanticSearchComponent;
  let fixture: ComponentFixture<SemanticSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
