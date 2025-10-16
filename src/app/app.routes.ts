import { Routes } from '@angular/router';
import {
    AuthLayoutComponent,
    BlankLayoutComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DetailsComponent,
    ForogotPasswordComponent,
    AllordersComponent,
    OrderComponent,
    WishlistComponent,
    ProductsComponent,
} from './Core/imports';

import { authGuard } from './Core/Guards/auth.guard';
import { logedGuard } from './Core/Guards/loged.guard';


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
            { path: "products", component: ProductsComponent },
            { path: "brands", loadComponent: () => import('./Components/brands/brands.component').then((c) => c.BrandsComponent) },
            { path: "branddetails/:id", loadComponent: () => import('./Components/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent) },

            { path: "categories", loadComponent: () => import('./Components/categories/categories.component').then((c) => c.CategoriesComponent) },
            { path: "categorydetails/:id", loadComponent: () => import('./Components/categorydetails/categorydetails.component').then((c) => c.CategorydetailsComponent) },
            { path: "cart", loadComponent: () => import('./Components/cart/cart.component').then((c) => c.CartComponent) },
            { path: "details/:id", component: DetailsComponent },
            { path: "orders/:id", component: OrderComponent },
            { path: "allorders", component: AllordersComponent },
            { path: "wishlist", component: WishlistComponent },
        ]
    },
    { path: "**", component: NotFoundComponent }
]
