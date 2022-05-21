import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  name: string = 'sunny';

  constructor() { }

  ngOnInit(): void {
  }

  onInput(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

}
