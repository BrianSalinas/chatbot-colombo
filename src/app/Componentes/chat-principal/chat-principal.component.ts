import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { modeloApi } from 'src/app/Modelos/modeloApi';
import { modeloMensajeriaBot } from 'src/app/Modelos/modeloMensajeriaBot';
import { preguntaRespuesta } from 'src/app/Modelos/preguntaRespuesta';
import { LocationServiceService } from 'src/app/Servicios/locationService/location-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
  imagenTemporal:string;
  linkTemporal:string;
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
    this.respuestasBot.push({pregunta:"Can you give me the number of my classmates?",
    respuesta:"Of course I can look : \nLiss +573147175913\nSandra +573164549353\nDouglas: +573108971328\nMile: +573216971363\nNata: +573137315855\nDany: +573195629418\nRoss: +573154084911 \nAngie: +573127730676"});
    this.respuestasBot.push({pregunta:"Do you have the number of Liss?",respuesta:"Of course I can look: +573147175913"});
    this.respuestasBot.push({pregunta:"Do you have the number of Sandra?",respuesta:"Of course I can look: +573164549353"});
    this.respuestasBot.push({pregunta:"Do you have the number of Douglas?",respuesta:"Of course I can look: +573108971328"});
    this.respuestasBot.push({pregunta:"Do you have the number of Mile?",respuesta:"Of course I can look: +573216971363"});
    this.respuestasBot.push({pregunta:"Do you have the number of Nata?",respuesta:"Of course I can look: +573137315855"});
    this.respuestasBot.push({pregunta:"Do you have the number of Dany?",respuesta:"Of course I can look: +573195629418"});
    this.respuestasBot.push({pregunta:"Do you have the number of Ross?",respuesta:"Of course I can look: +573154084911"});
    this.respuestasBot.push({pregunta:"Do you have the number of Ross?",respuesta:"Of course I can look: +573127730676"});
    
    //=================================PREGUNTAS DE UBICACION=============================================
    this.respuestasBot.push({pregunta:"Do you know a mall near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a car wash near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a restaurant near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a gas station near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a police station near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a pharmacy near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a money transfer location near to my position?",respuesta:"location"});
    //this.respuestasBot.push({pregunta:"Do you know a ecological centers near to my position?",respuesta:"location"});//por completar
    //this.respuestasBot.push({pregunta:"Do you know a donate second-hand clothes near to my position?",respuesta:"location"});//por completar
    //this.respuestasBot.push({pregunta:"Do you know a apostares centers near to my position?",respuesta:"location"});//por completar
    //this.respuestasBot.push({pregunta:"Do you know a susuerte near to my position?",respuesta:"location"});//por completar
    this.respuestasBot.push({pregunta:"Do you know a wester union near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a efecty near to my position?",respuesta:"location"});
    this.respuestasBot.push({pregunta:"Do you know a claro near to my position?",respuesta:"location"});
    //=================================PREGUNTAS GENERALES=============================================
    this.respuestasBot.push({pregunta:"Does the cats like to be on the tree?",respuesta:"Yes, they likes to be on the tree."});
    this.respuestasBot.push({pregunta:"Hola",respuesta:"Pendejo, no me hables en español"});
    this.respuestasBot.push({pregunta:"Hello",respuesta:this.mensaje_de_Bienvenida});
    this.respuestasBot.push({pregunta:"",respuesta:"Please, write your message correctly."});
    //=================================OPINIONES=============================================
    this.respuestasBot.push({pregunta:"What do you think about Angie?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"What do you think about Douglas?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"Do you know teacher Natalia botero Rojas?",respuesta:"Yes i do, she is a teacher of the American Colombian and teaches several students within the institution."});
    this.respuestasBot.push({pregunta:"What do you think of the teacher Natalia?",respuesta:"She is a good teacher she hardly uses Spanish in her classes, but it is understandable for low English skill of students, too she is intelligent and has very beautiful hair."});
    this.respuestasBot.push({pregunta:"What do you think about Natalia?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"What do you think about liss?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"What do you think about Sandra?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"what do you think about Milena?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"What do you think about Ross?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"what do you think about Dany?",respuesta:"imagen"});
    //=================================DINERO IMAGENES=============================================
    this.respuestasBot.push({pregunta:"How much is the baht value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the dollar value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the euro value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the franc value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the krone value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the peso value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the pound value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the ringgit value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the ruble value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the rupiah value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the won value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the yen value today?",respuesta:"imagen"});
    this.respuestasBot.push({pregunta:"How much is the yuan value today?",respuesta:"imagen"});
    //=================================LINKS=============================================
    this.respuestasBot.push({pregunta:"How can I use the do and does?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"How can I use the can and can’t?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"How can I use the have and has?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"How can I use the connectors and, but, Because, of?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"Do you know how to cook spaghettis?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"Do you know how to cook spaghettis?",respuesta:"link"});
    this.respuestasBot.push({pregunta:"What can i do in Pereira today?",respuesta:"link"});
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
    this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:"",link:""});
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
    this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:"",link:""});
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
        }else if(res[0].pregunta.includes("Do you know a police station near to my position?")){
          this.variable = "police+station";
          this.componerMensaje = "Yes i do, There are some police stations near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a pharmacy near to my position?")){
          this.variable = "pharmacy";
          this.componerMensaje = "Yes i do, There are some pharmacy near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a money transfer location near to my position?")){
          this.variable = "money+transfer";
          this.componerMensaje = "Yes i do, There are some money transfer locations near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a wester union near to my position?")){
          this.variable = "wester union";
          this.componerMensaje = "Yes i do, There are some wester union near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a efecty near to my position?")){
          this.variable = "efecty";
          this.componerMensaje = "Yes i do, There are some efecty near you, this is a list of them:\n";
        }else if(res[0].pregunta.includes("Do you know a claro near to my position?")){
          this.variable = "claro";
          this.componerMensaje = "Yes i do, There are some claro near you, this is a list of them:\n";
        }
        
        this.location.getLocationInfo(this.variable).subscribe(result =>{
          this.resultJSON = result;
          for(var i = 0;i<this.resultJSON.items.length;i++){
            this.componerMensaje = this.componerMensaje +(i+1) 
            +".Address: "+this.resultJSON.items[i].address.label
            +" (Distance: "+this.resultJSON.items[i].distance+")\n";
          }
          this.pregu.mensaje = this.componerMensaje;
          this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:"",link:""});
        });

        
      }else if(res[0].respuesta == "imagen"){
        this.pregu.mensaje = "";
        if(res[0].pregunta.includes("How much is the baht value today?")){
          this.componerMensaje = "/assets/images/baht.png";
        }else if(res[0].pregunta.includes("How much is the dollar value today?")){
          this.componerMensaje = "/assets/images/dollar.png";
        }else if(res[0].pregunta.includes("How much is the euro value today?")){
          this.componerMensaje = "/assets/images/euro.png";
        }else if(res[0].pregunta.includes("How much is the franc value today?")){
          this.componerMensaje = "/assets/images/franc.png";
        }else if(res[0].pregunta.includes("How much is the krone value today?")){
          this.componerMensaje = "/assets/images/krone.png";
        }else if(res[0].pregunta.includes("How much is the peso value today?")){
          this.componerMensaje = "/assets/images/peso.png";
        }else if(res[0].pregunta.includes("How much is the pound value today?")){
          this.componerMensaje = "/assets/images/pound.png";
        }else if(res[0].pregunta.includes("How much is the ringgit value today?")){
          this.componerMensaje = "/assets/images/ringgit.png";
        }else if(res[0].pregunta.includes("How much is the ruble value today?")){
          this.componerMensaje = "/assets/images/ruble.png";
        }else if(res[0].pregunta.includes("How much is the rupiah value today?")){
          this.componerMensaje = "/assets/images/rupiah.png";
        }else if(res[0].pregunta.includes("How much is the won value today?")){
          this.componerMensaje = "/assets/images/won.png";
        }else if(res[0].pregunta.includes("How much is the yen value today?")){
          this.componerMensaje = "/assets/images/yen.png";
        }else if(res[0].pregunta.includes("How much is the yuan value today?")){
          this.componerMensaje = "/assets/images/yuan.png";
        }else if(res[0].pregunta.includes("What do you think about Angie?")){
          this.pregu.mensaje = "She is beautiful and fantastic!";
          this.componerMensaje = "/assets/images/angie.jpeg";
        }else if(res[0].pregunta.includes("What do you think about Douglas?")){
          this.pregu.mensaje = "He is a handsome guy and intelligent!";
          this.componerMensaje = "/assets/images/douglas.jpeg";
        }else if(res[0].pregunta.includes("What do you think about Natalia?")){
          this.pregu.mensaje = "She is a very intelligent student and very pretty, she is also very kind to people.";
          this.componerMensaje = "/assets/images/natalia.jpeg";
        }else if(res[0].pregunta.includes("What do you think about liss?")){
          this.pregu.mensaje = "Liss is a good student and also very competitive, who always seeks the victory apart, she is very funny and will surely tell you a very interesting story.";
          this.componerMensaje = "/assets/images/liss.jpeg";
        }else if(res[0].pregunta.includes("What do you think about Sandra?")){
          this.pregu.mensaje = "I think that she is a kind person and of few words but she is also collaborative and helps her classmates.";
          this.componerMensaje = "/assets/images/sandra.jpeg";
        }else if(res[0].pregunta.includes("what do you think about Milena?")){
          this.pregu.mensaje = "Milena is a responsible person, cooperative with a good heart and the most probable thing is that she will surprise you with an unexpected detail.";
          this.componerMensaje = "/assets/images/milena.jpeg";
        }else if(res[0].pregunta.includes("What do you think about Ross?")){
          this.pregu.mensaje = "She is a very creative, kind and cheerful person, she is very pretty with very beautiful hair, if you sit next to her, she will explain you, if you didn't understand. you won't get bored.";
          this.componerMensaje = "/assets/images/ross.jpeg";
        }else if(res[0].pregunta.includes("what do you think about Dany?")){
          this.pregu.mensaje = "He is a charismatic person, cheerful and funny, good friend and companion";
          this.componerMensaje = "/assets/images/danny.jpeg";
        }
        //this.pregu.mensaje = this.componerMensaje;
          this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:this.componerMensaje,link:""});
      }else if(res[0].respuesta == "link"){
        this.imagenTemporal = ""
        this.pregu.link = "";
        if(res[0].pregunta == "Do you know how to cook spaghettis?"){
          this.pregu.mensaje = "No, I don’t, but I have database with cooking recipes.\nHere is the link:";
          this.pregu.link = "https://www.allrecipes.com/recipe/158140/spaghetti-sauce-with-ground-beef/";
        }else if(res[0].pregunta == "How can I use the do and does?"){
          this.pregu.mensaje = "Watch this video it can help you\nAnd if you need an English tutor, here are the data of the best 3 teachers near you:\nDiana castaño +573103886495\nRodrigo Gómez +573153869746\nLuis García +573161758994";
          this.pregu.link = "https://www.youtube.com/watch?v=o24tpCah7Q4";
        }else if(res[0].pregunta == "How can I use the can and can’t?"){
          this.pregu.mensaje = "Watch this video it can help you:";
          this.pregu.link = "https://www.youtube.com/watch?v=_ulG6fKv85g";
        }else if(res[0].pregunta == "How can I use the have and has?"){
          this.pregu.mensaje = "Watch this video it can help you:";
          this.pregu.link = "https://www.youtube.com/watch?v=XoiYTzyVy-s";
        }else if(res[0].pregunta == "How can I use the connectors and, but, Because, of?"){
          this.pregu.mensaje = "Watch this video it can help you:";
          this.pregu.link = "https://www.youtube.com/watch?v=rne5VwOH538";
        }else if(res[0].pregunta == "What can i do in Pereira today?"){
          this.pregu.mensaje = "There are a lot of things to do today, i recomend you a creamy icecream in Hamsi\nLocated in Av. La Pradera/Street 21 #19-73 DosQuebradas\nBut if you want to eat something we have La Azotea Rooftop, they have the best hamburgers in the city\nFor more information about what to do in Pereira, go ahead and check this instagram account.";
          this.imagenTemporal = "/assets/images/mix.png"
          this.pregu.link = "https://www.instagram.com/quehacerenpereira_/?hl=es-la#:~:text=QUE%20HACER%20EN%20PEREIRA%20(%40quehacerenpereira_)%20%E2%80%A2%20Instagram%20photos%20and%20videos";
        }
        this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:this.imagenTemporal,link:this.pregu.link});
      }else{
        this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:"",link:""});
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
      this.preguntasChat.push({id:this.pregu.id,fecha:this.pregu.fecha,hora:this.pregu.hora,responsable:this.pregu.responsable,mensaje:this.pregu.mensaje,imagen:"",link:""});
      /*
      console.log("========================PREGUNTA FILTRADA DEL BANCO==========================");
      console.log(res);
      console.log("========================PREGUNTAS CHAT=======================================");
      console.log(this.preguntasChat);
      */
    }

  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 
  private scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

}
