import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interface/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService)
  detailsProduct :IProduct | null = null
   ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(parmater)=>{
        let ProductId= parmater.get('id')
        this._ProductsService.getSpecificProducts(ProductId).subscribe({
          next:(res)=>{
            this.detailsProduct = res.data
          console.log(res.data);
          
          },
          error:(err) =>{
            console.log(err);
            
          }
        })
      }
     })
   }
}
