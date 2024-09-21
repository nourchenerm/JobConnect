import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importez Router ici

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit{
  logForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Ajoutez Router ici
  ) {}
  ngOnInit(): void {
    this.logForm = this.fb.group({  
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],   
    });
  }


  onSubmit(): void {
    if (this.logForm.valid) {
      const password = this.logForm.get('password')?.value;
      const email = this.logForm.get('email')?.value;
      
    }
  }
  
}
