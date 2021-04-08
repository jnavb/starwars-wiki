import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardFlipComponent } from './card-flip.component';

describe('CardFlipComponent', () => {
  let component: CardFlipComponent;
  let fixture: ComponentFixture<CardFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardFlipComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
