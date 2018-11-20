import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
//
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  //Variables a utilizar 
  //Variable booleana para mostrar la introduccion de datos
  valido: Boolean = false;
  //Array donde iran los datos
  dat: any = {};
  probs: any = {};
  //Cantidad de años que el usuario evaluara
	years: number;
  yrs: any;
  //Array donde iran los PIBs
  pibs: any;
  //Objeto que almacenara la respuesta del servidor
  response: any;
  //Objeto JSON que se enviara con los datos al servidor
  json: any = '{"data": [';
  //Response para la proxima implementacion de la grafica
  res: any;
  //Constructor de la clase
  constructor(public navCtrl: NavController, public altCtrl: AlertController, public restProvider: RestProvider) {
  
  }
  //Funcion que se ejecuta para mandar los datos al servidor
  datos(pibs:Array<number>){
    try{
      this.pibs = pibs;
      //Se guardan los datos en strings que se forman en base a objetos JSON
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
      //Se instancia el provedor REST para enviar los datos al
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
    }catch(e){
      console.log("Verificar que se hallan introducido todos los datos");
    }
  }

  yearS(no: number){
    this.yrs = new Array(no);
    for (var i = 0; i < no; ++i) {
      this.yrs[i] = i;
    }
    this.pibs = new Array(no);
  }
  //Funcion que valida la cantidad de años introducidos
  generarEntradas(years){
  	try{
  		if (years >= 1) {
        this.valido = true;
        this.years = years;
        this.yearS(years);
        const btn1 = document.querySelector('#btn1');
        btn1.innerHTML = "Modificar";
  		}
  		else{
  			let alert = this.altCtrl.create({
  				title: "Error",
  				subTitle: "Escribe un numero de años valido",
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
  //Funcion que muestra la respuesta por parte del servidor una vez realizada la comunicacion
  mostrar(respuesta){
    this.response = JSON.parse(respuesta);
    console.log(this.response.datos.url);
    //console.log(this.response.datos.predicciones);
    //console.log(this.response.datos.probabilidades);
    this.restProvider.traerDatos().then((result) =>{
      const img = document.querySelector("#analysis");
      this.res = JSON.stringify(result);
      img.setAttribute("src", this.res);
      console.log(this.res);
    },(err) => {
      console.log(err);
    });
  }

}