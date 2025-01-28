// Função para gerar a URL da imagem com base no imgKey do veículo
export const getImageUrl = (imgKey) => {
  // A chave do arquivo já vem sem o 'o/' (prefixo do Firebase Storage)
  return `https://firebasestorage.googleapis.com/v0/b/plassonauto-7e0c1.firebasestorage.app/o/images%2F${imgKey}?alt=media`;
};

// export const API_URL = 'http://192.168.1.5:3000';
export const API_URL = 'http://10.17.30.51:3000';

// Api google Maps
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBJRznxD-rFUrYg-Dii_ST9_GbybmYGlEA';

// Função para buscar locais na API do Google Places
export const fetchPlaces = async (text) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.predictions) {
      return json.predictions;
    }
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
  }
};

export const fetchPlaceDetails = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`;
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

// // Função para obter o endereço completo a partir das coordenadas
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    if (!latitude || !longitude) return;

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    if (data.status === 'OK') {
      return data?.results[0]?.formatted_address;
    } else {
      throw new Error('Não foi possível obter o endereço');
    }
  } catch (error) {
    console.log(error);
    return 'Endereço não encontrado';
  }
};

// // Função para obter o nome do local com base nas coordenadas usando a Places API
export const fetchPlaceName = async ({ latitude, longitude }) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    if (!latitude || !longitude) return;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results[1] || data.results[1]?.name === data.results[1]?.vicinity) {
      place = data?.results[0];
    } else {
      place = data?.results[1];
    }
    return place?.name;

  } catch (error) {
    console.log('Erro ao buscar nome do local:', error);
    return 'Erro ao buscar local';
  }
};

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
