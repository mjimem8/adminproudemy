import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    
    let url = URL_SERVICES + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    let es_imagen_google = img.indexOf('https') >= 0;
    if (es_imagen_google) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
         url += '/usuarios/' + img;
      break;

      case 'medico':
         url += '/medicos/' + img;
      break;

      case 'hospital':
         url += '/hospitales/' + img;
      break;

      default:
        url+= '/usuarios/xxx';

    }

    return url;
  }

}
