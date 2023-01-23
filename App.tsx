import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from "./src/shared/splash_screen";
import { Router } from './src/shared/routes';



export default function App(){
  return(
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  )
}