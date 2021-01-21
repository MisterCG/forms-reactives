import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ExisteUser {
    [s:string]: boolean  
}

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  noLastName(control: FormControl): ExisteUser {
    if ( control.value?.toLowerCase() === 'Galeano'  ){
      return {
        noLastName: false
      }
    }

    return null;

  }

  usuarioExiste(control: FormControl): Promise<ExisteUser> | Observable<ExisteUser> {
    return new Promise( (resolve, reject) =>{
        setTimeout(() => {
          if ( control.value === 'MisterCG' ) {
            resolve({ siExiste: true });
          } else {
            resolve( null );
          }
        }, 3500)
    })
  }


  samePassword(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      let pass1 = formGroup.controls[pass1Name]; 
      let pass2 = formGroup.controls[pass2Name];

      if ( pass1.value === pass2.value ) {
        return pass2.setErrors(null);
      } else {
        return pass2.setErrors({ noCoincide: false });
      }

    }
  }

}
