import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Catalog from './views/Catalog';
import Preloader from './views/Preloader';
import ProductsList from './views/ProductsList';
import ProductDetails from './views/ProductDetails';



const Stack = createNativeStackNavigator();

export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Loading"
            component={Preloader}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Catalog" component={Catalog} />
        <Stack.Screen name="Products List" component={ProductsList} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}


