import { useFonts } from '@expo-google-fonts/poppins';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const fontConfig = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return fontsLoaded;
};

export default fontConfig;

