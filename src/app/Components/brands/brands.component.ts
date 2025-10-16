import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrandService } from '../../Core/Services/brand.service';
import { IBrand } from '../../Core/Interface/ibrand';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  AllBrands: IBrand[] = []
  geAllBrandsSub!: Subscription
  constructor(private _BrandService: BrandService) {
  }
  ngOnInit(): void {
    this._BrandService.GetAllBrands().subscribe({
      next: (res) => {
        this.AllBrands = res.data
      }
    })
  }
  ngOnDestroy(): void {
    this.geAllBrandsSub?.unsubscribe()

  }
}
