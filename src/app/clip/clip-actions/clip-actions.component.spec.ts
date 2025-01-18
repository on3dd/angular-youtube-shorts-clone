import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipActionsComponent } from './clip-actions.component';

describe('ClipActionsComponent', () => {
  let component: ClipActionsComponent;
  let fixture: ComponentFixture<ClipActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
