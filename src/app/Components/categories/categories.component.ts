import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Core/Services/categories.service';

import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';
import { Icategory } from '../../Core/Interface/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _HttpClient: HttpClient, private _CategoriesService: CategoriesService) {
  }
  categoryList: Icategory[] = []
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data
      }
    })
  }

}
