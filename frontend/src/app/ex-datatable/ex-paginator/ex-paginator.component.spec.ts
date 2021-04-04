import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExPaginatorComponent } from './ex-paginator.component';

describe('ExPaginatorComponent', () => {
  let component: ExPaginatorComponent;
  let fixture: ComponentFixture<ExPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExPaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
