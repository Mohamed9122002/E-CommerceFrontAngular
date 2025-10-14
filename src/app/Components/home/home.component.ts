import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from '../../Core/Interface/iproduct';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _productService = inject(ProductsService);
  productList:IProduct[] = []

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
}
