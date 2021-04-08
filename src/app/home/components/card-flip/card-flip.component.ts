import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'mizik-card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.scss']
})
export class CardFlipComponent {
  @Input() view: {
    question: string;
    answer: string;
  };
  @Input() set discover(discover: boolean) {
    this._discover = discover;
    if (discover) {
      this.runConfettionClick();
    }
  }
  @Output() front = new EventEmitter();
  @Output() repeat = new EventEmitter();
  @ViewChild('confettiCanvas') confettiCanvas: ElementRef;

  _discover = false;

  constructor() {}

  onFlipAgain() {
    this.repeat.emit();
  }

  onFront() {
    this.front.emit();
  }

  private runConfettionClick() {
    confetti.create(this.confettiCanvas.nativeElement, {
      resize: true,
      useWorker: true
    })({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
      scalar: 0.3
    });
  }
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
