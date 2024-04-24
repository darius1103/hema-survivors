import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameWindowComponent } from './components/game-window/game-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hema-survivors';
}
