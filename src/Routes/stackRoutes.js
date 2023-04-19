import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../Pages/Home";
import { Detail } from "../Pages/Detail";
import { Search } from "../Pages/Search";

const Stack = createNativeStackNavigator();

export function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Detail" component={Detail} options={{title: "Detalhes da Receita"}}/>
            <Stack.Screen name="Search" component={Search} options={{ title: "Veja o que encontramos" }} />
            
        </Stack.Navigator>
    )
}