import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MakeProvider } from 'src/app/utils/custom-ngmodel';
@Component({
  selector: 'mizik-fab-love',
  templateUrl: './fab-love.component.html',
  styleUrls: ['./fab-love.component.scss'],
  providers: [MakeProvider(FabLoveComponent)]
})
export class FabLoveComponent {
  @Input() activated = false;
  @Input() icon: string;
  @Input() closeIcon: string;
  @Input() color: string;

  @Output() tap = new EventEmitter();

  constructor() {}

  onTap() {
    this.tap.emit();
  }
}
