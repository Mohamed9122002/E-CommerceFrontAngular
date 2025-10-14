import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { CartService } from '../../Core/Services/cart.service';
import { ICart } from '../../Core/Interface/icart';
import { CurrencyPipe } from '@angular/common';
import { rmSync } from 'node:fs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartDetails : ICart = {} as ICart
ngOnInit(): void {
  this._CartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cartDetails=res.data      
    },
    error:(err)=>{
      console.log(err);
    }
  })
  
}
RemoveItem(id:string):void 
{
  this._CartService.DeletCartItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails=res.data 
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
UpdatedCount(id:string,count:number):void{
  if(count>0){
    this._CartService.UpdateCartProductQuantity(id,count).subscribe({
  next:(res)=>{
    // console.log(res);
          this.cartDetails=res.data 
  },
  error:(err)=>{
    console.log(err);
  }
})
  }else{
    this.RemoveItem(id)
  }
}
ClearCart():void{

 this._CartService.ClearCartItem().subscribe({
  next:(res)=>{
    // console.log(res);
    if (res.message==="success"){
            this.cartDetails= {} as ICart
          } 
  },
  error:(err)=>{
    console.log(err);
  }
})
}
}

