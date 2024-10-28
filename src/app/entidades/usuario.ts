export class Usuario {
	about_me: string = '';
	age: number = -1;
	email: string = '';
	first_name: string = '';
	gender: string = '';
	id: string = '';
	last_name: string = '';
	location: string = '';
	username: string = '';
	password: string = '';
	is_author: boolean = false;
	profile_picture: string = "";

	constructor(usuario: Partial<Usuario>) {
		Object.assign(this, usuario)
	}
}

export class UsuarioRegister extends Usuario {
	id_register: string = '';
	constructor(usuario: Partial<UsuarioRegister>) {
		super(usuario);
		Object.assign(this, usuario);

	}
}
