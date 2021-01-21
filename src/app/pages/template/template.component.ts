import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  }

  pais: any[] = [];

  constructor( private paisS: PaisService ) { }

  ngOnInit() {
   
    this.paisS.getPaises().subscribe( res => {
      this.pais = res;
      this.pais.unshift({
        name: '[Selecione un país]',
        codigo: ''
      });
    });
    
  }

  saveInfo( form: NgForm ) {
    console.log( form );

    if ( form.invalid ) {
      Object.values( form.controls ).forEach( control =>{
        control.markAsTouched();
      });
      return;
    }
    console.log( form.value );
  }

}
