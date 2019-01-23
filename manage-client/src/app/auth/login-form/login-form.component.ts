import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() doToggleForm = new EventEmitter();
  @Output() doLogin = new EventEmitter();

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      remember: ['true'],
    });
  }

  ngOnInit() {
  }

  toggleCard(){
    this.doToggleForm.emit();
  }

  login(){
    this.doLogin.emit(this.loginForm.value);
  }

}
