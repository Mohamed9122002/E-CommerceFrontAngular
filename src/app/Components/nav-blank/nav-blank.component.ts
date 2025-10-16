import { Component, computed, inject, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../Core/Services/auth.service';
import { CartService } from '../../Core/Services/cart.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { WishListService } from '../../Core/Services/wish-list.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  private readonly _auth = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly  _WishListService = inject(WishListService);
  CountNumber: Signal<number> = computed(() => this._CartService.cartNumber())
  WishListNumber: Signal<number> = computed(() => this._WishListService.WishListLength())
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._CartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this._CartService.cartNumber.set(res.numOfCartItems)
        }
      })
      this._WishListService.getWishlist().subscribe({
        next:(res)=>{          
          this._WishListService.WishListLength.set(res.data.length)
        }
      })
    }
  }
  SignOut(): void {
    this._auth.logOut();
  }
}
