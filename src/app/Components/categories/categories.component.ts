import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Core/Services/categories.service';
import { RouterLink } from "@angular/router";
import { Icategory } from '../../Core/Interface/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    getAllCategorieSub!: Subscription
  constructor( private _CategoriesService: CategoriesService) {
  }
  categoryList: Icategory[] = []
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllCategorieSub?.unsubscribe()    
  }
}
