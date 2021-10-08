import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatPrincipalComponent } from './Componentes/chat-principal/chat-principal.component';
import { LoginComponent } from './Componentes/login/login.component';
import { SideChatComponent } from './Componentes/side-chat/side-chat.component';
import { ListaContactosComponent } from './Componentes/lista-contactos/lista-contactos.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatPrincipalComponent,
    LoginComponent,
    SideChatComponent,
    ListaContactosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
