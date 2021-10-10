import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { modeloApi } from 'src/app/Modelos/modeloApi';
import { modeloMensajeriaBot } from 'src/app/Modelos/modeloMensajeriaBot';
import { preguntaRespuesta } from 'src/app/Modelos/preguntaRespuesta';
import { LocationServiceService } from 'src/app/Servicios/locationService/location-service.service';

@Component({
  selector: 'app-chat-principal',
  templateUrl: './chat-principal.component.html',
  styleUrls: ['./chat-principal.component.css']
})
export class ChatPrincipalComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  preguntasChat:modeloMensajeriaBot[] = [];
  respuestasBot:preguntaRespuesta[] = [];
  mensaje_de_Bienvenida:String;
  nombreUsuario:any;
  horaActual:String;
  fechaActual:String;
  usuario:String = "usuario";
  bot:String = "bot";
  idActual = "0";
  mensajeEscribiendo: String;
  pregu = new modeloMensajeriaBot();
  longitud: any;
  latitud: any;
  variable: string;
  arrayLocation = [];
  componerMensaje:string;
  jsonApi:string;
  jsonApiFormatted: JSON;
  resultJSON:modeloApi;
  constructor(private location: LocationServiceService) { 
    //cargar preguntas
    this.nombreUsuario = sessionStorage.getItem('nombre');
    this.latitud = sessionStorage.getItem('latitude');
    this.longitud = sessionStorage.getItem('longitud');
    
    this.mensaje_de_Bienvenida = "Hello, welcome "+this.nombreUsuario+", I am your trusted robot, ask me what you want. Enter the command /menu to give you the options";
    //=================================NUMEROS DE TELEFONO=============================================
    this.respuestasBot.push({pregunta:"What is the police’s number?",respuesta:"You can call to 112 to contact with the police!"});
    this.respuestasBot.push({pregunta:"What is the emergency number?",respuesta:"You can call to 123 number for emergencies!"});
    this.respuestasBot.push({pregunta:"What is the number of the rehabilitation center?",respuesta:"You can call to (+57) 317 3713401 for rehabilitation center."});
    this.respuestasBot.push({pregunta:"Do you know what the number of the traffic police is?",respuesta:"You can call to 123 to contact with the traffic police."});//transito
    this.respuestasBot.push({pregunta:"What is the firefighter’s number?",respuesta:"You can call to 119 number for a fire emergency."});
    this.respuestasBot.push({pregunta:"Do you know what the Cruz Roja number is?",respuesta:"The telephone numer of the Cruz Roja is: 132"});
    //numero de farmacia
    //=================================PREGUNTAS DE UBICACION=============================================
    this.respuestasBot.push({pregunta:"Do you know a mall near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a car wash near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a restaurant near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a gas station near to my position?",respuesta:"location"});//por completar
    //=================================PREGUNTAS GENERALES=============================================
    this.respuestasBot.push({pregunta:"Do you know how to cook spaghettis?",respuesta:"No, I don’t, but I have database with cooking recipes"});
    this.respuestasBot.push({pregunta:"Does the cats like to be on the tree?",respuesta:"Yes, they likes to be on the tree"});
    this.respuestasBot.push({pregunta:"Hola",respuesta:"Pendejo, no me hables en español"});
    this.respuestasBot.push({pregunta:"Hello",respuesta:this.mensaje_de_Bienvenida});
    this.respuestasBot.push({pregunta:"What do you think about angie?",respuesta:"She is beautiful and fantastic!"});
    this.respuestasBot.push({pregunta:"What do you think about douglas?",respuesta:"He is a handsome guy and intelligent)!"});
    this.respuestasBot.push({pregunta:"",respuesta:"Please, write your message correctly."});
  }

  ngOnInit(): void {
    
    //realizar la primera pregunta
    this.pregu = new modeloMensajeriaBot();
    let date: Date = new Date();
    this.fechaActual = date.toDateString();
    this.horaActual = String(date.getHours()).padStart(2, '0')+":"+String(date.getMinutes()).padStart(2, '0');
    this.pregu.id = this.idActual;
    this.pregu.mensaje = this.mensaje_de_Bienvenida;
    this.pregu.hora = this.horaActual;
    this.pregu.fecha = this.fechaActual;
    this.pregu.responsable = this.bot;
    this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje});
  }

  enviar(){
    //guardar en preguntasChat
    //===================VACIAR VARIABLES=========================
    this.pregu.fecha="";
    this.pregu.hora ="";
    this.pregu.id = "";
    this.pregu.mensaje ="";
    this.pregu.responsable = "";
    //===================VACIAR VARIABLES=========================

    let date: Date = new Date();
    this.fechaActual = date.toDateString();
    this.horaActual = String(date.getHours()).padStart(2, '0')+":"+String(date.getMinutes()).padStart(2, '0');
    var temp = parseInt(this.idActual)+1;
    this.idActual = temp.toString();
    this.pregu.id = this.idActual;
    this.pregu.mensaje = this.mensajeEscribiendo;
    let mensajeUsuario = this.pregu.mensaje;
    this.pregu.hora = this.horaActual;
    this.pregu.fecha = this.fechaActual;
    this.pregu.responsable = this.usuario;
    this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje});
    this.motorDeInferencia(mensajeUsuario);
    this.mensajeEscribiendo = "";

  }

  motorDeInferencia(mensajeUsuario: String){
    //===================VACIAR VARIABLES=========================
    this.pregu.fecha="";
    this.pregu.hora ="";
    this.pregu.id = "";
    this.pregu.mensaje ="";
    this.pregu.responsable = "";
    //===================VACIAR VARIABLES=========================
    
    let res = this.respuestasBot.filter(obj => obj.pregunta == mensajeUsuario);

    try{
      let date: Date = new Date();
      this.fechaActual = date.toDateString();
      this.horaActual = String(date.getHours()).padStart(2, '0')+":"+String(date.getMinutes()).padStart(2, '0');
      var temp = parseInt(this.idActual)+1;
      this.idActual = temp.toString();
      this.pregu.id = this.idActual;
      this.pregu.mensaje = res[0].respuesta;
      this.pregu.hora = this.horaActual;
      this.pregu.fecha = this.fechaActual;
      this.pregu.responsable = this.bot;

      if(res[0].respuesta == "location"){
        if(res[0].pregunta.includes("Do you know a gas station near to my position?")){
          this.variable = "petrol+station";
          this.componerMensaje = "Yes i do, There are some gas station near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a restaurant near to my position?")){
          this.variable = "restaurants";
          this.componerMensaje = "Yes i do, There are some restaurants near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a hospital near to my position?")){
          this.variable = "hospital";
          this.componerMensaje = "Yes i do, There are some hospitals near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a mall near to my position?")){
          this.variable = "mall";
          this.componerMensaje = "Yes i do, There are some malls near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a car wash near to my position?")){
          this.variable = "car+wash";
          this.componerMensaje = "Yes i do, There are some car washes near you, this is a list of them:\n";
        }
        
        this.location.getLocationInfo(this.variable).subscribe(result =>{
          this.resultJSON = result;
          for(var i = 0;i<5;i++){
            this.componerMensaje = this.componerMensaje +(i+1) 
            +".Address: "+this.resultJSON.items[i].address.label
            +" (Distance: "+this.resultJSON.items[i].distance+")\n";
          }
          this.pregu.mensaje = this.componerMensaje;
          this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje});
        });

        
      }else{
        if(res[0].pregunta == "Do you know how to cook spaghettis?"){
          this.pregu.mensaje = this.pregu.mensaje + "\nHere is the link: https://www.allrecipes.com/recipe/158140/spaghetti-sauce-with-ground-beef/";
        }
        this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje});
      }
      /*
      console.log("========================PREGUNTA FILTRADA DEL BANCO==========================");
      console.log(res);
      console.log("========================PREGUNTAS CHAT=======================================");
      console.log(this.preguntasChat);
      */
    }catch{
      let date: Date = new Date();
      this.fechaActual = date.toDateString();
      this.horaActual = String(date.getHours()).padStart(2, '0')+":"+String(date.getMinutes()).padStart(2, '0');
      var temp = parseInt(this.idActual)+1;
      this.idActual = temp.toString();
      this.pregu.id = this.idActual;
      this.pregu.mensaje = "Please, write your message correctly.";
      this.pregu.hora = this.horaActual;
      this.pregu.fecha = this.fechaActual;
      this.pregu.responsable = this.bot;
      this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje});
      console.log("========================PREGUNTA FILTRADA DEL BANCO==========================");
      console.log(res);
      console.log("========================PREGUNTAS CHAT=======================================");
      console.log(this.preguntasChat);
      
    }

  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 
  private scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

}
