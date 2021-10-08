import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombreUsuario:string = "";
  registrarNombre!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrarNombre = this.formBuilder.group({
      nombre:['',Validators.required]
    });
  }
  get nombre(){return this.registrarNombre.controls;}

  submit(){
    this.nombreUsuario = this.nombre.nombre.value;
    sessionStorage.setItem("nombre",this.nombreUsuario)
  }
  
}
