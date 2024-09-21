import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importez Router ici


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup; // Utilisation du modificateur '!' pour indiquer que la propriété sera initialisée plus tard
  
  alertMessage: string | null = null;
  alertType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Ajoutez Router ici
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      role: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.signUpForm.valid) {
      const password = this.signUpForm.get('password')?.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
      const email = this.signUpForm.get('email')?.value;
      
      // Vérifiez si les mots de passe correspondent
      if (password !== confirmPassword) {
        this.alertMessage = 'Passwords do not match';
        this.alertType = 'error';
        return;
      }
  
      // Vérifiez si l'email existe déjà
      console.log('Checking email existence for:', email); // Debug log
      this.authService.checkEmailExists(email).subscribe({
        next: (response) => {
          console.log('Email exists response:', response); // Debug log
          if (response.exists) {
            this.alertMessage = 'Email already exists';
            this.alertType = 'error';
          } else {
            // Si l'email n'existe pas, procédez à l'inscription
            console.log('Email does not exist. Proceeding to sign up.'); // Debug log
            this.authService.signUp(this.signUpForm.value).subscribe({
              next: (response) => {
                console.log('Registration response:', response); // Debug log
                this.alertMessage = 'Registration successful';
                this.alertType = 'success';
                setTimeout(() => this.router.navigate(['/log']), 4000);
              },
              error: (error) => {
                console.error('Error registering user:', error); // Debug log
                this.alertMessage = 'Error registering user';
                this.alertType = 'error';
              }
            });
          }
        },
        error: (error) => {
          console.error('Error checking email existence:', error); // Debug log
          this.alertMessage = 'Error checking email existence';
          this.alertType = 'error';
        }
      });
    } else {
      this.alertMessage = 'Please fill out the form correctly';
      this.alertType = 'error';
    }
  }
}