# Tabla histórico calificación
Tabla donde se visualizan las SIT del histórico IT/Calificación. Esta debe ser incluida dentro del módulo casos de la App.
A contnuación se especifica la configuración contemplada para su inclución dentro del módulo caso.

## Tabla de contenido
* [Configuración en frontend, módulo caso](#frontend-módulo-caso)
* [Configuración Microservicio](#configuración-microservicio-sithistorico)


## frontend, módulo caso
Teniendo en cuenta la estructura de la App como se encuentra en el repositorio "frontend", a continuación se indica como debería ser la inclusión de los presentes archivos para el funcionammiento y visualización de la tabla de historico de solicitudes IT/Calificación.

* En carpeta "components" del módulo caso:
    * Agregar la carpeta "tabla_solicitudes_calificacion":
    
      Esta contiene los archivos de la directiva y el .html de la vista de las solicitudes, así como una carpeta con los archivos del modal, el cual muestra el detalle de la solicitud.
    
    * En la carpeta root_caso del módulo caso:
        * En el archivo rootCaso.html, agregar la directiva etiqueta `<tabla-solicitud-calificacion></tabla-solicitud-calificacion>`.
        * En el archivo "rootCaso.directive", agregar al $scope.on('UPDATE_TABLA_HISTORICO_CONCEPTOS'...
          el broadcast:
          `$scope.broadcast("UPDATE_TABLA_SOLICITUDES_CALIFICACION_CHILD", identificacion);`
         
* En la carpeta "services" del módulo caso:
  Agregar el archivo "sitHistoricoCalificacion.service", el cuál contiene las llamadas al servicio.
  
* En el archivo "caso.module":
    * Importar la directiva "TablaSolicitudesCalificacionDirective":
    
        `import { TablaSolicitudesCalificacionDirective } from './components/tabla_solicitudes_calificacion/tablaSolicitudesCalificacion.directive';`  
        
    * Importar el servicio "SitHistoricoCalificacionService":
    
        `import { SitHistoricoCalificacionService }  from  './services/sitHistoricoCalificacion.service';`
        
    * Agregar el servicio y la directiva:
    
         `.service('sitHistoricoCalificacionService',SitHistoricoCalificacionService)`
         `.directive('tablaSolicitudesCalificacion',TablaSolicitudesCalificacionDirective)`
    
## Configuración Microservicio sitHistorico
* El servicio cuenta con la siguiente configuración de persistencia en la clase "DefaultDBI".
    * Nombre JNDI= `jdbc/oracleSitHistorico`, el dataSource debe ser configurado en el archivo "server.xml" del servidor wlp. 

