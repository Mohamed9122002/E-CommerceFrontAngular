import { Component } from '@angular/core';
import { NavBlankComponent } from "../../Components/nav-blank/nav-blank.component";
import { NavAuthComponent } from "../../Components/nav-auth/nav-auth.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [ NavAuthComponent,RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
