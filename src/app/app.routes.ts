import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { authGuard } from './Core/Guards/auth.guard';
import { logedGuard } from './Core/Guards/loged.guard';
import { DetailsComponent } from './Components/details/details.component';
import { ForogotPasswordComponent } from './Components/forogot-password/forogot-password.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { OrderComponent } from './Components/order/order.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, canActivate: [logedGuard], children: [
            { path: "", redirectTo: 'login', pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "forogotpassword", component: ForogotPasswordComponent }
        ]
    },
    {
        path: "", component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: "", redirectTo: 'home', pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "products", component: ProductComponent },
            { path: "brands", loadComponent: () => import('./Components/brands/brands.component').then((c) => c.BrandsComponent) },
            { path: "categories", loadComponent: () => import('./Components/categories/categories.component').then((c) => c.CategoriesComponent) },
            { path: "cart", component: CartComponent },
            { path: "details/:id", component: DetailsComponent },
            { path: "orders/:id", component: OrderComponent },
            { path: "allorders", component: AllordersComponent },
            { path: "wishlist", component: WishlistComponent },
        ]
    },
    { path: "**", component: NotFoundComponent }
]
