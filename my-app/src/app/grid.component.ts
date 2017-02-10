import {Component} from '@angular/core';


@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
})
export class GridComponent {
  images: [
    '../assets/boringer.png',
    '../assets/stoejkort.png',
    '../assets/drikkevandinteresser.png',
    '../assets/skovrejsningsomraade.png'
  ];
}
