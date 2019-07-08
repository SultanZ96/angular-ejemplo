import { Component, OnInit,ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { ListarService } from './listar.service';
import { reporteRRHH } from './reporteRRHH';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('ComisionesRRHHGrid', { static: false }) ComisionesRRHHGrid: jqxGridComponent;
  reportes: Array<reporteRRHH>;
  data:any[] = [];
  validador:number =1;
  constructor( private listarService:ListarService) {  }
  ngOnInit() {
    this.listarService.getColumnMarcasList().subscribe(data =>{
      var datos = data;
      datos.forEach(element => {
        this.columnsComisionesRRHH.push({ text: element , datafield: element , align: 'center', cellsalign: 'center', width: 130, cellsformat: 'c2' });
        this.sourceComisionesRRHH.datafields.push({ name: element , type: 'number'});
      });
      this.reloadData();
    });
  }

  reloadData() {
    this.ComisionesRRHHGrid.showloadelement();
    this.getData();
  }


  getData() {
    this.listarService.getReporteComisionesRRHHH(2, 1).subscribe(data => {
      this.reportes = data;
      for(let i = 0; i< this.reportes.length; i++){
        let row ={};
        row['reponedor'] = this.reportes[i].reponedor;
        row['rut'] = this.reportes[i].rut;
        row['totalGeneral'] = this.reportes[i].totalGeneral;

        for(let j = 0; j <this.reportes[i].marcas.length; j++){
          row[this.reportes[i].marcas[j].nombreMarca] = this.reportes[i].marcas[j].valor;
        }
        this.data[i] = row;
      }
      console.log(this.columnsComisionesRRHH);
      this.sourceComisionesRRHH.localdata = this.data;
      console.log(this.sourceComisionesRRHH.localdata);
      this.ComisionesRRHHGrid.updatebounddata();
      this.validador++;
    });
  };

  sourceComisionesRRHH: any =
    {
      localdata: null,
      datafields:
        [

          { name: 'reponedor', type: 'string' },
          { name: 'rut', type: 'string' },
          { name: 'totalGeneral', type: 'number' }
        ],
      datatype: "json",
      async: false
    };

  dataComisionesRRHH: any = new jqx.dataAdapter(this.sourceComisionesRRHH);
  columnsComisionesRRHH: any[] =
    [
      { text: 'Reponedor', pinned: true, datafield: 'reponedor', width: 250 },
      { text: 'Rut', pinned: true, datafield: 'rut', width: 100 },
      { text: 'Total General', pinned: true, datafield: 'totalGeneral',aggregates: ['sum'], width: 120, align: 'center', cellsalign: 'center', columntype: 'numberinput', cellsformat: 'c2',
      cellsrenderer: (row, column, value, defaultRender, rowData) => {
        if (value.toString().indexOf('Sum') >= 0) {
            return defaultRender.replace('Sum', 'Total');
        } 
      },
      aggregatesrenderer: (aggregates, column, element) => {
        let renderstring = '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: center; overflow: hidden;">' + 'Total' + ': ' + aggregates.sum + '</div>';
        return renderstring;
      }
    }
  ];
}
