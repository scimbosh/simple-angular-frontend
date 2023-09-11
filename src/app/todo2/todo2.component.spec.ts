import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo2Component } from './todo2.component';

describe('Todo2Component', () => {
  let component: Todo2Component;
  let fixture: ComponentFixture<Todo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Todo2Component]
    });
    fixture = TestBed.createComponent(Todo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
