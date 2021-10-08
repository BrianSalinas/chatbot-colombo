import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPrincipalComponent } from './Componentes/chat-principal/chat-principal.component';
import { ListaContactosComponent } from './Componentes/lista-contactos/lista-contactos.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "listaContactos",
    component: ListaContactosComponent
  },
  {
    path: "chatPrincipal",
    component: ChatPrincipalComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
