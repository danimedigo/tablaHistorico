import { IPaginacion } from '../../../core/models/IPaginacion';

export function TablaSolicitudesCalificacionDirective(): angular.IDirective {
  return {
      restrict: 'E',
      scope:{},
      templateUrl: 'app/caso/components/tabla_solicitudes_calificacion/tablaSolicitudesCalificacion.html',
      controller: TablaSolicitudesCalificacionController,
      controllerAs: 'vm',
      bindToController: true
  };  
};

/** @ngInject */
export function TablaSolicitudesCalificacionController($scope,$uibModal, sitHistoricoCalificacionService,toastr){
    var vm = this;
    vm.listaSolicitudes = [];
	vm.detalleSolicitudSit = [];	
    vm.identificacion = {};
    //paginacion
	vm.itemsPerPage = 5;
	vm.totalItems = 0;
	vm.currentPage = 1;
    
	vm.pageChanged = function(){
		console.log("mi pagina es: ", vm.currentPage);
		//se activa el $watch, sobre la variable vm.currentPage
		
	}
	
    $scope.$on('UPDATE_TABLA_SOLICITUDES_CALIFICACION_CHILD', function(event, identificacion) {        
        vm.identificacion = angular.copy(identificacion);
        vm.updateTablaHistoricoSolicitudes(vm.identificacion);
     }); 
	 //paginacion
	  $scope.$watch('vm.currentPage', function(newValue, oldValue) {
		if (newValue === oldValue) return;
		vm.updateTablaHistoricoSolicitudes(vm.identificacion);
  	});
	  
	  
	   //paginacion tablas modal 
	
	//paginación incapacidad---------------
	vm.itemsPerPageIncapacidad = 5;
	vm.totalItemsIncapacidad = 0;
	vm.currentPageIncapacidad = 1;	
	
	$scope.$watch('vm.currentPageIncapacidad', function(newValue, oldValue) {
		if (newValue === oldValue) return;
		vm.updateTablaHistoricoRelacionIncapacidad(vm.identificacion);				
  	});
	  
	//paginación Pagos nómina-----------------
	vm.itemsPerPagePagoNomina = 5;
	vm.totalItemsPagoNomina = 0;
	vm.currentPagePagoNomina = 1;
	
	  
	$scope.$watch('vm.currentPagePagoNomina', function(newValue, oldValue) {
		if (newValue === oldValue) return;
		vm.updateTablaPagosIncapacidad(vm.identificacion);
  	});
     
    
    

	vm.updateTablaHistoricoSolicitudes = function(identificacion) {			
		var params = {
		'tipoAfiliado': identificacion.tipoIdentificacion,
		'idAfiliado': identificacion.numeroIdentificacion,
		'init': vm.itemsPerPage * (vm.currentPage - 1),
      	'limit': vm.itemsPerPage       
		};
		sitHistoricoCalificacionService.getSitHistoricoResumenByTipoyDNIPaginadas(params).then(function(response) {
			switch (response.status) {
				case 200: 
				var data = response.data;  
				var paginacion = <IPaginacion>data.paginacion;
				vm.totalItems = paginacion.size;
				vm.listaSolicitudes = data.solicitudesHistorico;  
				console.log("Resultado de JSON",response);      
				break;
				default:
				console.log("response status:" + response.status);
				toastr.error("Ocurrio un error consultando SIT historico calificación");
				break;
			}
		
		}, function(reason) {
			console.log("Fallo al conectar con el servicio");
			
  		});
  }
  
    
    
  //inicio open modal 2,  con paginacion de tablas
  
   vm.openModal = function(afiliadoIdentificacion, solicitudId) {
	   vm.solicitudId = solicitudId;
	   console.log("voy a conosultar detalle");
    var modalInstance = $uibModal.open({ 
		
      animation: 'true',
      templateUrl: 'app/solicitud/components/root_sit_historico/modals/modalSitHistoricoDetalle.html',
      controller: function($scope, $uibModalInstance, servicioSitHistoricoCalificacion) {   
		$scope.close = function() {
          $uibModalInstance.close();
        };
		
		$scope.detalleSolicitudSit = vm.detalleSolicitudSit;
		//paginado de tabla histórico relación incapacidades -- incapacidad
			$scope.itemsPerPageIncapacidad = vm.itemsPerPageIncapacidad;
			$scope.currentPageIncapacidad = vm.currentPageIncapacidad;
			$scope.totalItemsIncapacidad = vm.totalItemsIncapacidad;
				
			$scope.pageChangedIncapacidad = function() {
				//hace el cambio de número de página			
				vm.currentPageIncapacidad = $scope.currentPageIncapacidad; 
				//se activa $watch   		 
			};
		  
		//Paginado de tabla pagos de incapacidad -- pagoNomina
			$scope.itemsPerPagePagoNomina = vm.itemsPerPagePagoNomina;
			$scope.currentPagePagoNomina = vm.currentPagePagoNomina;
			$scope.totalItemsPagoNomina = vm.totalItemsPagoNomina;
			
			$scope.pageChangedPagoNomina = function() {
				//hace el cambio de número de página				
				vm.currentPagePagoNomina = $scope.currentPagePagoNomina;  
				//se activa $watch 		 
			};
		
			       
      },
	  resolve : {
		  servicioSitHistoricoCalificacion : function(){
		  //llamada servicio		
		var params = {
		'solicitudId': solicitudId,
		'afiliadoId': afiliadoIdentificacion,
		'init':	{'initIncapacidad'  : vm.itemsPerPageIncapacidad * (vm.currentPageIncapacidad - 1), 
				 'initPagoNomina' : vm.itemsPerPagePagoNomina * (vm.currentPagePagoNomina - 1)
				}					
		,
		'limit':	{'limitIncapacidad': vm.itemsPerPageIncapacidad, 
					'limitPagosNomina': vm.itemsPerPagePagoNomina 								 
				}				 
		};
		return sitHistoricoCalificacionService.getSitHistoricoDetalleByIdSITyDNIPaginadas(params).then(function(response) {
					switch (response.status) {
						case 200:
						var data = response.data; 
						console.log("data es:", data);
						//paginación incapacidad------------------
						var pagIncapacidad = <IPaginacion>data.pagIncapacidad;
						vm.totalItemsIncapacidad = pagIncapacidad.size;
						//paginación pagos nómina-----------------
						var pagPagoNomina = <IPaginacion>data.pagPagoNomina;
						vm.totalItemsPagoNomina = pagPagoNomina.size;
						//detalle
						vm.detalleSolicitudSit = data.detalleCalificacion; 						   				
						
						console.log("Resultado de JSON",response);      
						break;
						default:
						console.log("response status detalle:" + response.status);
						toastr.error("Ocurrio un error consultando SIT historico calificación");
						break;
					}
				
				}, function(reason) {
					console.log("Fallo consulta detalle");
					toastr.error("Ocurrio un error consultando SIT historico calificación");
				});
		//fin llamada servicio
		  
	  } 
		  
	  }
	   
    });
  } 	
  //fin open modal 2 con paginación de tablas
  
   //actualiza datos tabla segun paginación
  vm.updateTablaHistoricoRelacionIncapacidad = function(identificacion) {
		var params = {
		'idAfiliado': identificacion.numeroIdentificacion,
		'init': vm.itemsPerPageIncapacidad * (vm.currentPageIncapacidad - 1),
      	'limit': vm.itemsPerPageIncapacidad    
		};
		sitHistoricoCalificacionService.getIncapacidadByDNIPaginadas(params).then(function(response) {
			switch (response.status) {
				case 200: 
				var data = response.data;  
				var paginacion = <IPaginacion>data.pagIncapacidad;
				vm.totalItemsIncapacidad = paginacion.size;				 ;
				vm.detalleSolicitudSit.detalleIncapacidad = data.detalleIncapacidad;
				console.log("Resultado de JSON incapacidad",response);      
				break;
				default:
				console.log("response status:" + response.status);
				toastr.error("Ocurrio un error consultando SIT historico calificación");
				break;
			}
		
		}, function(reason) {
			console.log("Fallo al conectar con el servicio");
			toastr.error("Ocurrio un error conectando con el servicio");
		});
  }
  
  //actualiza datos tabla segun paginación -- pagos nomina
  vm.updateTablaPagosIncapacidad = function(identificacion) {
		var params = {
		'idAfiliado': identificacion.numeroIdentificacion,
		'init': vm.itemsPerPagePagoNomina * (vm.currentPagePagoNomina- 1),
      	'limit': vm.itemsPerPagePagoNomina    
		};
		sitHistoricoCalificacionService.getPagoNominaByDNIPaginadas(params).then(function(response) {
			switch (response.status) {
				case 200: 
				var data = response.data;  
				var paginacion = <IPaginacion>data.pagPagoNomina;
				vm.totalItemsIncapacidad = paginacion.size;				 ;
				vm.detalleSolicitudSit.detallePagoNomina = data.detallePagoNomina;
				console.log("Resultado de JSON Pago nomina",response);      
				break;
				default:
				console.log("response status:" + response.status);
				toastr.error("Ocurrio un error consultando SIT historico calificación");
				break;
			}
		
		}, function(reason) {
			console.log("Fallo al conectar con el servicio");
			toastr.error("Ocurrio un error conectando con el servicio");
		});
  }
  
      
    
};


