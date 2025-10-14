import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly _authService= inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError:string ="";
    LgoinForm:FormGroup = this._formBuilder.group({
      email : [null,[Validators.email ,Validators.required]],
      password : [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    });
  LgoinFormSubmit():void {
    if(this.LgoinForm.valid){
      this._authService.setLgoinForm(this.LgoinForm.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            localStorage.setItem("UserToken",res.token)
            this._authService.saveUserData()
            this._router.navigate(['/home'])
        
          }
        
          console.log(res);
        },
        error:(err )=>{
          this.msgError = err.error.message 
          console.log(err);
          
        }
      })
    }    
  }
}
