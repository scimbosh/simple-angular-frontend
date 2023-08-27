import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSandboxComponent } from './test-sandbox.component';

describe('TestSandboxComponent', () => {
  let component: TestSandboxComponent;
  let fixture: ComponentFixture<TestSandboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSandboxComponent]
    });
    fixture = TestBed.createComponent(TestSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
