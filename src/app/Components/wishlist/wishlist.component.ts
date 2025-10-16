import { Component, inject, PLATFORM_ID } from '@angular/core';
import { WishListService } from '../../Core/Services/wish-list.service';
import { IWishList } from '../../Core/Interface/iwish-list';
import { CurrencyPipe, isPlatformBrowser, NgIf } from '@angular/common';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  WishList: IWishList[] = []
  private readonly _Tost = inject(ToastrService)
  private _PLATFORM_ID = inject(PLATFORM_ID)
  constructor(private _WishListService: WishListService, private _CartService: CartService) {
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._WishListService.getWishlist().subscribe({
        next: (res) => {
          this.WishList = res.data
        }

      })
    }
  }
  AddToCart(id: string): void {
    this._CartService.addProducToCart(id).subscribe({
      next: (res) => {
        this._Tost.success(res.message)
      }
    })
  }
  RemoveToWishlist(id: string): void {
    this._WishListService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.WishList = this.WishList.filter(item => item._id !== id);
        this._Tost.success('Removed from wishlist');
        this._WishListService.WishListLength.set(res.data.length)
      }
    })
  }
}
