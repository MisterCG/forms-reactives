import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidacionesService }  from '../../services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;

  constructor(  private fb: FormBuilder,
                private validaciones: ValidacionesService) { 
    this.form();
    this.cargarDataForm();
  }

  ngOnInit(): void {
  }

  // get para emitir el error al html

  get pasatiempos() {
    return this.formReactive.get('pasatiempos') as FormArray;
  }

  get nombreError(){
    return this.formReactive.get('nombre').invalid && this.formReactive.get('nombre').touched;
  }

  get apellidoError(){
    return this.formReactive.get('apellido').invalid && this.formReactive.get('apellido').touched;
  }

  get correoError(){
    return this.formReactive.get('correo').invalid && this.formReactive.get('correo').touched;
  }

  get userError() {
    return this.formReactive.get('usuario').invalid && this.formReactive.get('usuario').touched;
  }

  get pass1Error() {
    return this.formReactive.get('pass1').invalid && this.formReactive.get('pass1').touched;
  }

  get pass2Error() {
    const pass1 = this.formReactive.get('pass1').value;
    const pass2 = this.formReactive.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;

  }

  get distritoError() {
    return this.formReactive.get('direccion.distrito').invalid && this.formReactive.get('direccion.distrito').touched;
  }

  get ciudadError() {
    return this.formReactive.get('direccion.ciudad').invalid && this.formReactive.get('direccion.ciudad').touched;
  }

  form() {
    this.formReactive = this.fb.group({
      nombre    : ['', [ Validators.required, Validators.minLength(5) ]],
      apellido  : ['', [ Validators.required, Validators.minLength(5), this.validaciones.noLastName ]],
      correo    : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario   : ['', [ Validators.required , this.validaciones.usuarioExiste ]],
      pass1     : ['', Validators.required],
      pass2     : ['', Validators.required],
      direccion : this.fb.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validaciones.samePassword('pass1', 'pass2')
    });
  }

  cargarDataForm() {
    // this.formReactive.setValue({
    this.formReactive.reset({
      nombre: 'Carlos',
      apellido: 'Galeano',
      correo: 'galeanocarlosd@gmail.com',
        direccion: {
        distrito: 'Caricauo',
        ciudad: 'DC'
      }
    })
  }

  agregarElemento() {
    this.pasatiempos.push( this.fb.control('') );
    console.log(this.pasatiempos);
  }

  borrarElemento(i: number){
    this.pasatiempos.removeAt(i);
  }

  save() {

    if( this.formReactive.invalid ) {
      return Object.values( this.formReactive.controls).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => {
            control.markAsTouched();
          });
        }
        control.markAsTouched();
      });
    }

    this.formReactive.reset();

  }

}
