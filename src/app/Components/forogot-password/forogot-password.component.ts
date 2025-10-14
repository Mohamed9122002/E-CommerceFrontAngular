import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forogot-password',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './forogot-password.component.html',
  styleUrl: './forogot-password.component.scss'
})
export class ForogotPasswordComponent {
  step:number = 1
  private readonly _AuthService = inject(AuthService)
  private readonly _Router =inject(Router)
  verifyEmail:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email])
  })
    verifycode:FormGroup = new FormGroup({
    resetCode : new FormControl(null,[Validators.required,Validators.pattern(/^[0-6]{6}$/)])
  })
    resetPassword:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    newPassword : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })
  verifyEmailSubmit():void {
    this._AuthService.setEmailVervify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == "success"){
          this.step = 2
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
    verifyCodeSubmit():void {
    this._AuthService.setcodeVervify(this.verifycode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == "success"){
          this.step = 3
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
      resesPassworSubmit():void {
    this._AuthService.setresetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        localStorage.setItem('UserToken',res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
