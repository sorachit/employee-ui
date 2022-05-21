import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  @Input()
  name: string = 'sunny';

  @Output()
  valueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onInput(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.name);
  }

}
