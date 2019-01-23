import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() doToggleForm = new EventEmitter();
  @Output() doRegister = new EventEmitter();

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: ['true'],
    })
  }

  ngOnInit() {
  }

  toggleCard(){
    this.doToggleForm.emit();
  }

  register(){
    this.doRegister.emit(this.registerForm.value);
  }
}
