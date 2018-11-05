import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  num: any = [8,7,6,5,4,3,2,1];
  dat: any = {};
	years: number;
  yrs: any;
  pibs: any;
  response: any;
  json: any = '{"data": [';
  res: any;
  constructor(public navCtrl: NavController, public altCtrl: AlertController, public restProvider: RestProvider) {
  
  }

  datos(pibs:Array<number>){
    this.pibs = pibs;
    for (var i = 0; i < this.years; ++i) {
      this.dat.year =  i;
      this.dat.pib = pibs[i];
      this.json = this.json + JSON.stringify(this.dat);
      if (i != (this.years-1)) {
        this.json = this.json + ",";
      }
    }   
    this.json = this.json + "]}";
    console.log(this.json);
      this.restProvider.sendDatos(this.json).then((result)=>{
        this.mostrar(result);
      }, (err) => {
        console.log(err);
        let alert = this.altCtrl.create({
          title: "Error",
          subTitle: "No se pudo establecer la conexion, reintentalo",
          buttons: ['OK']
        });
        alert.present();
      });
    this.json = '{"data": [';
  }

  yearS(no: number){
    this.yrs = new Array(no);
    for (var i = 0; i < no; ++i) {
      this.yrs[i] = i;
    }
    this.pibs = new Array(no);
  }

  generarEntradas(years){
  	try{
  		if (years >= 1) {
        this.years=years;
        this.yearS(years);
        const btn1 = document.querySelector('#btn1');
        btn1.innerHTML = "Modificar";
  		}
  		else{
  			let alert = this.altCtrl.create({
  				title: "Error",
  				subTitle: "Escribe un numero de anhios valido",
  				buttons: ['Ok']
  			});
  		  	alert.present();
  		}
  	}catch(e){
  			let alert = this.altCtrl.create({
  				title: "Error",
  				subTitle: "Ocurrio un error, reintentalo",
  				buttons: ['Ok']
  			});
  			alert.present();
  	}
  }

  mostrar(respuesta){
    this.response = JSON.parse(respuesta);
    console.log(this.response.predicciones);
    this.restProvider.traerDatos().then((result) =>{
      const img = document.querySelector("#analysis");
      this.res = JSON.stringify(result);
      img.setAttribute("src", this.res);
      console.log(this.res);
    },(err) => {
      console.log(err);
    });
  }
  contdr(){
    return this.num.pop();
  }

}
