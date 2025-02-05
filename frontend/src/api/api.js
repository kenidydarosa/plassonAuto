// Função para gerar a URL da imagem com base no imgKey do veículo
export const getImageUrl = (imgKey) => {
  // A chave do arquivo já vem sem o 'o/' (prefixo do Firebase Storage)
  return `https://firebasestorage.googleapis.com/v0/b/plassonauto-7e0c1.firebasestorage.app/o/images%2F${imgKey}?alt=media`;
};

// export const API_URL = 'http://192.168.1.5:3000';
export const API_URL = 'http://10.17.30.51:3000';

// Api google Maps
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBJRznxD-rFUrYg-Dii_ST9_GbybmYGlEA';

// // Função para buscar locais na API do Google Places
// export const fetchPlaces = async (text) => {
//   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`;

//   try {
//     // const response = await fetch(url);
//     const json = await response.json();

//     if (json.predictions) {
//       return json.predictions;
//     }
//   } catch (error) {
//     console.error('Erro ao buscar locais:', error);
//   }
// };

let controller; // Variável global para armazenar o AbortController

export const fetchPlaces = async (text) => {
  if (!text) return [];

  const apiKey = '03329b41f5b34586a963370f30588058';
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&limit=10&apiKey=${apiKey}&lang=pt&filter=countrycode:br`;

  // Se houver uma requisição anterior, cancela antes de iniciar uma nova
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.features || [];
  } catch (error) {
    if (error.name === 'AbortError') {
      // console.log('Requisição cancelada');
    } else {
      console.error('Erro ao buscar locais:', error);
    }
    return [];
  }
};

// export const fetchPlaces = async (text) => {
//   const apiKey = '03329b41f5b34586a963370f30588058';
//   const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&limit=20&apiKey=${apiKey}&lang=pt&filter=countrycode:br`;
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
//     }

//     const json = await response.json();
//     // console.log(JSON.stringify(json.features, null, 2))
//     return json.features || [];

//   } catch (error) {
//     console.error('Erro ao buscar locais:', error);
//     return [];
//   }
// };


//Api do google
// export const fetchPlaceDetails = async (placeId) => {
//   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`;
//   try {
//     // const response = await fetch(url);
//     const response = [];
//     const json = await response.json();

//     if (json.result && json.result.geometry) {
//       const { lat, lng } = json.result.geometry.location;

//       return { latitude: lat, longitude: lng };
//     }
//   } catch (error) {
//     console.error('Erro ao buscar detalhes do local:', error);
//   }
//   return null;
// };

export const fetchPlaceDetails = async (placeId, housenumber) => {
  
  const apiKey = '03329b41f5b34586a963370f30588058';
  const url = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${apiKey}&lang=pt&filter=housenumber:${housenumber}`;
  
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.result && json.result.geometry) {
      
      const { lat, lng } = json.result.geometry.location;

      return { latitude: lat, longitude: lng };
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do local:', error);
  }
  return null;
};

// Api google maps funcionando
// // Função para obter o endereço completo a partir das coordenadas
// export const getAddressFromCoordinates = async (latitude, longitude) => {
//   try {
//     if (!latitude || !longitude) return;

//     // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
//   const response = []

//     const data = await response.json();

//     if (data.status === 'OK') {
//       return data?.results[0]?.formatted_address;
//     } else {
//       throw new Error('Não foi possível obter o endereço');
//     }
//   } catch (error) {
//     console.log(error);
//     return 'Endereço não encontrado';
//   }
// };

//Nominatim
// export const getAddressFromCoordinates = async (latitude, longitude) => {
//   try {
//     if (!latitude || !longitude) return;

//     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
//     const data = await response.json();

//     if (data) {
//       const { address = {}, name, road } = data || {};

//       const addressInfo = {
//         neighborhood: address.neighbourhood || address.suburb || address.hamlet || '',
//         city: address.city || address.town || '',
//         country: address.country || '',
//         local: name || road || address.neighbourhood || address.suburb || address.hamlet || '',
//         cep: address.postcode
//       };

//       return addressInfo;
//     } else {
//       throw new Error('Não foi possível obter o endereço');
//     }
//   } catch (error) {
//     console.log(error);
//     return 'Endereço não encontrado';
//   }
// };

// Usado no modalSheetButtom para mostra o endereço conforme selecionado no mapa.
export const getAddressFromCoordinates = async (latitude, longitude, housenumber = '') => {
  try {
    if (!latitude || !longitude) return;

    const apiKey = '03329b41f5b34586a963370f30588058';
    const strFilter = housenumber ? `&filter=house_number:${housenumber}` : ''
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}&lang=pt${strFilter}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const properties = data.features[0].properties;

      const addressInfo = {
        local: properties.address_line1 || '',
        localDetails: properties.address_line2 || '',
      };

      return addressInfo;
    } else {
      throw new Error('Não foi possível obter o endereço');
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return 'Endereço não encontrado';
  }
};

export const fetchPlaceName = async ({ latitude, longitude }) => {
  const apiKey = '03329b41f5b34586a963370f30588058';

  const url = `https://api.geoapify.com/v2/places?lat=${latitude}&lon=${longitude}&radius=10&categories=amenity,building,catering,commercial,education,religion&limit=1&apiKey=${apiKey}`;
  //categories=amenity,building,catering,commercial,education,religion
  try {
    if (!latitude || !longitude) return;

    // Realizando a requisição à API Geoapify
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const place = data.features[0]; // Pegando o primeiro local encontrado
      return place.properties.name;
    } else {
      return 'Nenhum local encontrado';
    }
  } catch (error) {
    console.log('Erro ao buscar nome do local:', error);
    return 'Erro ao buscar local';
  }
};

// Função para obter o nome do local com base nas coordenadas usando a Places API
// Usado para mostrar o nome do local selecionado no markview
// export const fetchPlaceName = async ({ latitude, longitude }) => {
//   try {
//     if (!latitude || !longitude) return;

//     const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data && data.name) {
//       return data.name;
//     } else {
//       return 'Nenhum local encontrado';
//     }
//   } catch (error) {
//     console.log('Erro ao buscar nome do local:', error);
//     return 'Erro ao buscar local';
//   }
// };

// Api google maps funcionando
// export const fetchPlaceName = async ({ latitude, longitude }) => {
//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50&key=${GOOGLE_MAPS_API_KEY}`;
//   try {
//     if (!latitude || !longitude) return;

//     // const response = await fetch(url);
//     const response = [];
//     const data = await response?.json();

//     if (!data.results[1] || data.results[1]?.name === data.results[1]?.vicinity) {
//       place = data?.results[0];
//     } else {
//       place = data?.results[1];
//     }
//     return place?.name;
//   } catch (error) {
//     console.log('Erro ao buscar nome do local:', error);
//     return 'Erro ao buscar local';
//   }
// };

// Função para obter o nome do local com base nas coordenadas usando a Places API
// export const fetchPlaceName = async ({latitude, longitude}) => {
//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20&key=${GOOGLE_MAPS_API_KEY}`;

//   try {
//     if (!latitude || !longitude) return;

//     const response = await fetch(url);
//     const data = await response.json();

//     let place;

//     if(!data.results[1] || data.results[1]?.name === data.results[1]?.vicinity){
//         place = data.results[0]
//       }else{
//         place = data.results[1]
//       }
//       const name = place.name

//       const photoReference = place.photos ? place.photos[0].photo_reference : null;
//       const photos = data.results[1].photos || [];

//       const urlImag = photos.slice(0, 3).map((photo) =>
//         fetchPlacePhoto(photo.photo_reference)
//       );

//       return {name, urlImag};
//       return {name};

//   } catch (error) {
//     console.error('Erro ao buscar nome do local:', error);
//     return 'Erro ao buscar local';
//   }
// };

// // Função para buscar foto do local com base em photo_reference
// export const fetchPlacePhoto = (photoReference, maxWidth = 400) => {
//   if (!photoReference) return null;

//   const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
//   return url;
// };
