import { useState, useEffect } from "react";

export default function AddArticles({ setValue, addArticulo }) {
    

  const [lineas, setLineas] = useState([{ articuloId: '', cantidad: 1 }]);
  const [articulos, setArticulos] = useState([]);

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
      
  })
     .catch((error) => {
        console.error('Error:', error);
      });
      console.log(articulos);
      
  }, []);
    
  // Actualizar el valor del formulario cuando cambian las líneas
  useEffect(() => {
    const articulosFormateados = lineas
      .filter(linea => linea.articuloId)
      .map(linea => ({ id: Number(linea.articuloId), cantidad: linea.cantidad }));
    
    setValue("articulos", articulosFormateados);
  }, [lineas, setValue]);

  const handleArticuloChange = (index, articuloId) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index].articuloId = articuloId;
    setLineas(nuevasLineas);
  };

  const handleCantidadChange = (index, cantidad) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index].cantidad = parseInt(cantidad);
    setLineas(nuevasLineas);
  };

  const agregarLinea = () => {
    setLineas([...lineas, { articuloId: '', cantidad: 1 }]);
  };

  const eliminarLinea = (index) => {
    if (lineas.length > 1) {
      const nuevasLineas = lineas.filter((_, i) => i !== index);
      setLineas(nuevasLineas);
    } else {
      setLineas([{ articuloId: '', cantidad: 1 }]);
    }
  };

  return (
    <div>
      <h3>Artículos</h3>
      
      {lineas.map((linea, index) => (
        <div key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <select
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
            value={linea.cantidad}
            onChange={(e) => handleCantidadChange(index, e.target.value)}
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
      ))}
      
      <button type="button" onClick={agregarLinea} style={{ marginTop: '1rem' }}>
        Añadir otro artículo
      </button>
      
      <h4>Resumen:</h4>
      <ul>
        {lineas
          .filter(linea => linea.articuloId)
          .map((linea, index) => {
            console.log(linea);
            
            const articulo = articulos.find(a => a.id == linea.articuloId);
            return (
              <li key={index}>
                {articulo?.nombre} - Cantidad: {linea.cantidad}
              </li>
            );
          })}
      </ul>
    </div>
  )
}
