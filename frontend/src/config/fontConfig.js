// Importação dos hooks e fontes necessárias do pacote 'expo-google-fonts/poppins'
import { useFonts } from '@expo-google-fonts/poppins';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

/**
 * Função `fontConfig` para carregar fontes personalizadas de forma assíncrona.
 * 
 * A função utiliza o hook `useFonts` para carregar as fontes Poppins com diferentes pesos:
 * @returns {boolean} `fontsLoaded` - Retorna `true` se as fontes foram carregadas corretamente, 
 * e `false` caso contrário.
 */
const fontConfig = () => {
  // O hook `useFonts` retorna um array com o estado do carregamento das fontes.
  // O valor 'fontsLoaded' será 'true' quando as fontes estiverem prontas para uso.
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, // Fonte regular com peso 400
    Poppins_500Medium,  // Fonte com peso médio 500
    Poppins_700Bold,    // Fonte com peso negrito 700
  });

  // Retorna o valor 'fontsLoaded' indicando se as fontes foram carregadas
  return fontsLoaded;
};

// Exportação da função para ser usada em outros componentes
export default fontConfig;
