import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FabLoveComponent } from './fab-love.component';

describe('FabLoveComponent', () => {
  let component: FabLoveComponent;
  let fixture: ComponentFixture<FabLoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FabLoveComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FabLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
