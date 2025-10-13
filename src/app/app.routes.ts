import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CartComponent } from './Components/cart/cart.component';
export const routes: Routes = [
    {path:"",component:AuthLayoutComponent,children:[
        {path:"",redirectTo:'login',pathMatch:"full"},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent}
    ]},
    {path:"",component:BlankLayoutComponent,children:[
        {path:"",redirectTo:'home',pathMatch:"full"},
        {path:"home",component:HomeComponent},
        {path:"products",component:ProductComponent},
        {path:"brands",component:BrandsComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"cart",component:CartComponent},
    ]},
    {path:"**",component:NotFoundComponent}
]
