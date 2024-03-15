import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: ['usuario@gmail.com', [Validators.required, Validators.email]],
    name: ['usuario', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  register() {

    let registerUser = this.myForm.value as RegisterUser

    this.authService.register(registerUser).subscribe({
      next: () => {
         this.messageSuccess()
        this.router.navigateByUrl('/dashboard')
      },
      error: (message) => {
        console.log({message});
        Swal.fire('Error', message, 'error')
      }
    })

  }

  messageSuccess(){
    
    Swal.fire({
      title: "¡Registro exitoso!",
      html: `¡Bienvenido, a Cineverse! <br> Serás redirigido al dashboard.`,
      icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500, 
      timerProgressBar: true, 
      allowEscapeKey: false, 
      allowOutsideClick: false 
    });

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 1500);
  }
  
}
