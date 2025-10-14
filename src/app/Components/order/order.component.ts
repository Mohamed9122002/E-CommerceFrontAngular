import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Core/Services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
 private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
 cartId:string|null = "" 
 Orders:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get("id")
        console.log(this.cartId);
        
      }
    })
  }
  OrdersSubmit():void{
    this._OrdersService.CheckOut(this.cartId,this.Orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === "success"){
          res.session.url;
          window.open(res.session.url,'-')
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
