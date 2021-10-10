import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationServiceService } from 'src/app/Servicios/locationService/location-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombreUsuario:string = "";
  registrarNombre!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router,private location: LocationServiceService) { 
    this.location.getPosition().then(pos=>{
      sessionStorage.setItem('longitud',pos.lng);
      sessionStorage.setItem('latitude',pos.lat);
    });
  }

  ngOnInit(): void {
    this.registrarNombre = this.formBuilder.group({
      nombre:['',Validators.required]
    });
  }
  get nombre(){return this.registrarNombre.controls;}

  submit(){
    this.nombreUsuario = this.nombre.nombre.value;
    if(this.nombreUsuario == "" || this.nombreUsuario == null || this.nombreUsuario == undefined){
      alert("ALERT: You have to write your name");
      return;
    }else{
      sessionStorage.setItem("nombre",this.nombreUsuario);
      this.router.navigate(['chatPrincipal']);
    }
  }
  
}
