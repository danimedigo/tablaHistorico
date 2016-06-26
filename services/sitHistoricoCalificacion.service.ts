class URL{
    public static get SIT_HISTORICO_RESUMEN(): string { return "sitHistorico/sit/sit-historico/resumen"; }
    public static get SIT_HISTORICO_DETALLE(): string { return "sitHistorico/sit/sit-historico/detalle";}
    public static get SIT_HISTORICO_RESUMEN_PAGINADAS(): string { return "sitHistorico/sit/sit-historico/resumen/paginadas";}
    public static get SIT_HISTORICO_DETALLE_PAGINADAS(): string { return "sitHistorico/sit/sit-historico/detalle/paginadas";}
    public static get INCAPACIDAD_PAGINADAS(): string { return "sitHistorico/sit/sit-historico/incapacidad/paginadas"; }
    public static get PAGO_NOMINA_PAGINADAS(): string { return "sitHistorico/sit/sit-historico/pago-nomina/paginadas"; }
}

export class SitHistoricoCalificacionService{
    advanceApi:any;
    advanceEnviroment: any;
    
    
    /** @ngInject */
    constructor(advanceApi, advanceEnviroment){
        this.advanceApi = advanceApi;
        this.advanceEnviroment = advanceEnviroment;
        
    }
    
    public getSitHistoricoResumenByTipoyDNI(params): angular.IPromise<any> {
         var url: string =  this.advanceEnviroment.url + "/"  + URL.SIT_HISTORICO_RESUMEN;        
        return this.advanceApi.get(url, params);
  }
  
   public getSitHistoricoResumenByTipoyDNIPaginadas(params): angular.IPromise<any> {
         var url: string =  this.advanceEnviroment.url + "/"  + URL.SIT_HISTORICO_RESUMEN_PAGINADAS;        
        return this.advanceApi.get(url, params);
  }
  
  public getSitHistoricoDetalleByIdSITyDNI(params) : angular.IPromise<any> {
      var url: string = this.advanceEnviroment.url + "/" + URL.SIT_HISTORICO_DETALLE;
      return this.advanceApi.get(url, params);
  }
  
   public getSitHistoricoDetalleByIdSITyDNIPaginadas(params) : angular.IPromise<any> {
      var url: string = this.advanceEnviroment.url + "/" + URL.SIT_HISTORICO_DETALLE_PAGINADAS;
      return this.advanceApi.get(url, params);
  }
  
   public getIncapacidadByDNIPaginadas(params): angular.IPromise<any> {
         var url: string =  this.advanceEnviroment.url + "/"  + URL.INCAPACIDAD_PAGINADAS;        
        return this.advanceApi.get(url, params);
  }
  
  public getPagoNominaByDNIPaginadas(params): angular.IPromise<any> {
         var url: string =  this.advanceEnviroment.url + "/"  + URL.PAGO_NOMINA_PAGINADAS;        
        return this.advanceApi.get(url, params);
  }

}
