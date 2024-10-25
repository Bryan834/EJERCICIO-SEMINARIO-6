import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrige el nombre a "styleUrls"
})
export class HomeComponent {}
