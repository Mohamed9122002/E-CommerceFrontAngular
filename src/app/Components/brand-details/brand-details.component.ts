import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../Core/Services/brand.service';
import { IBrand } from '../../Core/Interface/ibrand';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent {
  constructor(private _BrandService:BrandService,private readonly _ActivatedRoute:ActivatedRoute){}
  brand:IBrand | null = null 
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let BrandId = params.get('id') 
        this._BrandService.GetSpecificBrand(BrandId).subscribe({
          next:(res)=>{
            this.brand = res.data
            console.log(this.brand)
          }
        })
      }
    })
  }
}
