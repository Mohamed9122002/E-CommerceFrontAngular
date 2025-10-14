import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Certificate } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService= inject(AuthService)
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError:string ="";
  isLoading:boolean = false;
    registerForm:FormGroup = this._formBuilder.group({
      name : [null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      email : [null,[Validators.email ,Validators.required]],
      password : [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
      rePassword : [null],
      phone: [null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    },{
      validators:[this.confirmPassword]
    });
  registerFormSubmit():void {
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.isLoading = true;
      this._authService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this._router.navigate(['/login'])
          }
                this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError = err.error.message 
          console.log(err);
           this.isLoading = false;
          
        }
      })
    }    
  }
  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }else{
      return {mismatch:true}
    }
  } 
  
}
