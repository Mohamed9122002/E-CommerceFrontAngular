import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interface/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/Services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, NgClass } from '@angular/common';
import { PipesSearchPipe } from '../../Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../Core/Services/wish-list.service';
import { Icategory } from '../../Core/Interface/icategory';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, PipesSearchPipe, RouterLink, CurrencyPipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _productService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _Tost = inject(ToastrService)
  private readonly _WishListService = inject(WishListService);
  text: string = ""
  productList: IProduct[] = []
  getAllProductSub!: Subscription
  CatergoriesList: Icategory[] = []
  getAllCategorieSub!: Subscription
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getAllCategorieSub = this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.CatergoriesList = res.data
      }
    })
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

    this.getAllCategorieSub?.unsubscribe()
  }
}
