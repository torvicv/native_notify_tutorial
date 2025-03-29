export async function serializeBigIntToInt(obj) {
    if (typeof obj === 'bigint') {
      // Convertir BigInt a int (número)
      return Number(obj); 
    }
  
    if (Array.isArray(obj)) {
      return obj.map(serializeBigIntToInt);
    }
  
    if (obj !== null && typeof obj === 'object') {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = serializeBigIntToInt(obj[key]);
        }
      }
      return newObj;
    }
  
    return obj;
  }