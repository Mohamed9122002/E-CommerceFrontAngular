import { Component, computed, inject, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../Core/Services/auth.service';
import { CartService } from '../../Core/Services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  private readonly _auth = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  CountNumber: Signal<number> = computed(() => this._CartService.cartNumber())
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._CartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this._CartService.cartNumber.set(res.numOfCartItems)
        }
      })
    }
  }
  SignOut(): void {
    this._auth.logOut();
  }
}
