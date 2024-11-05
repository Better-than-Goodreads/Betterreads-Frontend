import { Injectable } from '@angular/core';
import { Usuario, UsuarioRegister } from "../entidades/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {
  usuarioActual = new Usuario({});
  constructor() { }
}
