import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import { Home } from "../screens/home";
import { Habit } from "../screens/habit";
import { New } from "../screens/new";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="habit" component={Habit} />
      <Screen name="new" component={New} />
    </Navigator>
  );
}
