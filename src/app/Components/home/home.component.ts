import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from '../../Core/Interface/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/Services/categories.service';
import { ICategorie } from '../../Core/Interface/icategorie';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { PipesSearchPipe } from '../../Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ,FormsModule,PipesSearchPipe, RouterLink ,CurrencyPipe,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{
  private readonly _productService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  text:string  = ""
    customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:4000,
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
  productList:IProduct[] = []
  getAllProductSub!:Subscription 
  CatergoriesList:ICategorie[] = []
  getAllCategorieSub!:Subscription 
  ngOnInit(): void {
   this.getAllCategorieSub =  this._categoriesService.getAllCategories().subscribe({
          next: (res) => {
            this.CatergoriesList = res.data
        // console.log(res.data);
      },
      error:(err)=>{
        // console.log(err);
      }
    })
    this.getAllProductSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.productList = res.data
      },
      error:(err)=>{
        // console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    this.getAllCategorieSub?.unsubscribe()
  }
}
