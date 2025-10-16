import { Component } from '@angular/core';
import { CategoriesService } from '../../Core/Services/categories.service';
import { ActivatedRoute } from '@angular/router';

import { Icategory } from '../../Core/Interface/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})
export class CategorydetailsComponent {
  constructor(private _CategoriesService:CategoriesService,private readonly _ActivatedRoute:ActivatedRoute){}
  Category:Icategory | null = null 
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let CategoryId = params.get('id') 
        this._CategoriesService.getsPecificCategory(CategoryId).subscribe({
          next:(res)=>{
            this.Category = res.data
          }
        })
      }
    })
  }
}
