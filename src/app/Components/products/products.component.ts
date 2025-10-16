import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/Services/cart.service';
import { ProductsService } from '../../Core/Services/products.service';
import { WishListService } from '../../Core/Services/wish-list.service';
import { IProduct } from '../../Core/Interface/iproduct';
import { Subscription } from 'rxjs';
import { PipesSearchPipe } from '../../Core/Pipes/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PipesSearchPipe,CurrencyPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
private readonly _productService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _Tost = inject(ToastrService)
  private readonly _WishListService = inject(WishListService);
  text: string = ""
  productList: IProduct[] = []
  getAllProductSub!: Subscription
  AddToCartSub!:Subscription 
  AddToWishlistSub!:Subscription
  ngOnInit(): void {

    this.getAllProductSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data
      }
    });

  }
  AddToCart(id: string): void {
    this._CartService.addProducToCart(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._Tost.success(res.message, "FreshCart")
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }
  addToWishlist(idProduct: string): void {
    this._WishListService.addProductToWishlist(idProduct).subscribe({
      next: (res) => {
        console.log(res);
        this._Tost.success(res.message)
        this._WishListService.WishListLength.set(res.data.length)
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    this.AddToCartSub?.unsubscribe()
    this.AddToWishlistSub?.unsubscribe()
  }
}
