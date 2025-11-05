import 'react-native-gesture-handler';
import {StackNavigaror} from './presentation/navigator/StackNavigaror';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigaror />
      </ThemeContextProvider>
    </QueryClientProvider>
    // <PaperProvider>
    //   <NavigationContainer>
    //   </NavigationContainer>
    // </PaperProvider>
  );
};
