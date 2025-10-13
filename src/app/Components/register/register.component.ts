import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Certificate } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService= inject(AuthService)
  msgError:string ="";
  isLoading:boolean = false;

  registerForm:FormGroup =  new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    email:new FormControl(null,[Validators.email ,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.confirmPassword);
  registerFormSubmit():void {
    this.isLoading = true;
    if(this.registerForm.valid){
      this._authService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError = err.error.message 
          console.log(err);
          
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
