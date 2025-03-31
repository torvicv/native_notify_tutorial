'use client'

import { useState, useEffect } from "react";

export default function AddBonos({ setValue, addDetalle }) {
    

  const [lineas, setLineas] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [bonos, setBonos] = useState([]);
  const [esArticuloOServicioOBono, setEsArticuloOServicioOBono] = useState([]);

  useEffect(() => {
    fetch('/api/admin/articulos')
     .then((res) => {
       if (!res.ok) {
        throw new Error('Error fetching artículos');
      }
      const response = res.json().then((data) => {
        console.log(data);
        setArticulos(data);
      });
      
    }).catch((error) => {
      console.error('Error:', error);
    });
    
    fetch('/api/admin/servicios')
     .then((res) => {
       if (!res.ok) {
        throw new Error('Error fetching servicios');
      }
      const response = res.json().then((data) => {
        console.log(data);
        setServicios(data);
      });
      
    }).catch((error) => {
      console.error('Error:', error);
    });
    
    fetch('/api/admin/bonos')
     .then((res) => {
       if (!res.ok) {
        throw new Error('Error fetching bonos');
      }
      const response = res.json().then((data) => {
        console.log(data);
        setBonos(data);
      });
      
    }).catch((error) => {
      console.error('Error:', error);
    });
  }, []);
    
  // Actualizar el valor del formulario cuando cambian las líneas
  useEffect(() => {
    const detallesFormateados = lineas
      .filter(linea => linea.articuloId || linea.servicioId || linea.bonoId)
      .map(linea => ({ 
        articuloId: linea.articuloId,
        servicioId: linea.servicioId,
        bonoId: linea.bonoId,
        cantidad: linea.cantidad,
      }));
    
    setValue("detalles", detallesFormateados);
  }, [lineas, setValue]);

  const handleArticuloChange = (index, articuloId) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index].articuloId = articuloId;
    setLineas(nuevasLineas);
  };
  
  const handleServicioChange = (index, servicioId) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index].servicioId = servicioId;
    setLineas(nuevasLineas);
  };
  
  const handleBonoChange = (index, bonoId) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index].bonoId = bonoId;
    setLineas(nuevasLineas);
  };

  const handleCantidadChange = (index, cantidad) => {
    const nuevasLineas = [...lineas];
    if (!isNaN(cantidad))
      nuevasLineas[index].cantidad = parseInt(cantidad);
    setLineas(nuevasLineas);
  };

  const agregarLinea = (e) => {
    setLineas([...lineas, { articuloId: '', cantidad: 1, servicioId: '', bonoId: '' }]);
    setEsArticuloOServicioOBono([...esArticuloOServicioOBono, e.target.value]);
  };

  const eliminarLinea = (index) => {
    if (lineas.length > 1) {
      const nuevasLineas = lineas.filter((_, i) => i !== index);
      setLineas(nuevasLineas);
      const nuevasArtSerBon = lineas.filter((_, i) => i !== index);
      setEsArticuloOServicioOBono(nuevasArtSerBon);
    } else {
      setLineas([]);
      setValue('detalles', []);
      setEsArticuloOServicioOBono([]);
    }
  };

  return (
    <div>
      <h3>Detalles del bono</h3>

      <select
            value={''}
            onChange={(e) => {
              agregarLinea(e);
            }}
          >
            <option value="">Seleccionar</option>
            <option value="articulo">Artículo</option>
            <option value="servicio">Servicio</option>
            <option value="bono">Bono</option>
          </select>

      {lineas.map((linea, index) => (
        (esArticuloOServicioOBono[index] == 'articulo' && (
        <div key={index} className="grid grid-cols-6 gap-3">
          <select
            className="col-span-4"
            value={linea.articuloId}
            onChange={(e) => handleArticuloChange(index, e.target.value)}
          >
            <option value="">Seleccionar artículo</option>
            {articulos.map((articulo) => (
              <option key={articulo.id} value={articulo.id}>
                {articulo.nombre}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min="1"
            value={linea.cantidad === 0 ? '' : linea.cantidad}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "") {
                handleCantidadChange(index, 0); // Dejarlo vacío sin actualizarlo con un número
              } else {
                handleCantidadChange(index, Number(newValue)); // Solo actualizar si es número válido
              }
            }}
            style={{ width: '80px' }}
          />
          
          <button 
            type="button" 
            onClick={() => eliminarLinea(index)}
            disabled={lineas.length < 0}
          >
            Eliminar
          </button>
        </div>
      )) || 
      (esArticuloOServicioOBono[index] == 'servicio' && (
        <div key={index} className="grid grid-cols-6 gap-3">
          <select
            className="col-span-4"
            value={linea.servicioId}
            onChange={(e) => handleServicioChange(index, e.target.value)}
          >
            <option value="">Seleccionar servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min="1"
            value={linea.cantidad === 0 ? '' : linea.cantidad}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "") {
                handleCantidadChange(index, 0); // Dejarlo vacío sin actualizarlo con un número
              } else {
                handleCantidadChange(index, Number(newValue)); // Solo actualizar si es número válido
              }
            }}
            style={{ width: '80px' }}
          />
          
          <button 
            type="button" 
            onClick={() => eliminarLinea(index)}
            disabled={lineas.length < 0}
          >
            Eliminar
          </button>
        </div>
      )) || 
      (esArticuloOServicioOBono[index] == 'bono' && (
        <div key={index} className="grid grid-cols-6 gap-3">
          <select
            className="col-span-4"
            value={linea.servicioId}
            onChange={(e) => handleBonoChange(index, e.target.value)}
          >
            <option value="">Seleccionar bono</option>
            {bonos.map((bono) => (
              <option key={bono.id} value={bono.id}>
                {bono.nombre}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min="1"
            value={linea.cantidad === 0 ? '' : linea.cantidad}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "") {
                handleCantidadChange(index, 0); // Dejarlo vacío sin actualizarlo con un número
              } else {
                handleCantidadChange(index, Number(newValue)); // Solo actualizar si es número válido
              }
            }}
            style={{ width: '80px' }}
          />
          
          <button 
            type="button" 
            onClick={() => eliminarLinea(index)}
            disabled={lineas.length < 0}
          >
            Eliminar
          </button>
        </div>
      ))
      ))}
      
      {/*<button type="button" onClick={agregarLinea} style={{ marginTop: '1rem' }}>
        Añadir otro detalle
      </button>*/}
      
      <h4>Resumen:</h4>
      <ul>
        {lineas
          .filter(linea => linea.articuloId || linea.servicioId || linea.bonoId)
          .map((linea, index) => {
            console.log(linea);
            let detalle;
            if (linea.articuloId) {
              detalle = articulos.find(a => a.id == linea.articuloId);
            } else if (linea.servicioId) {
              detalle = servicios.find(s => s.id == linea.servicioId);
            } else if (linea.bonoId) {
              detalle = bonos.find(s => s.id == linea.bonoId);
            }
            return (
              <li key={index}>
                {detalle?.nombre} - Cantidad: {linea.cantidad}
              </li>
            );
          })}
      </ul>
    </div>
  )
}
