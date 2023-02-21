import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, {
  RotateInDownRight,
  RotateInUpLeft,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ checked = true, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center mb-2"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="items-center justify-center w-8 h-8 bg-green-500 rounded-lg"
          entering={RotateInUpLeft}
          exiting={RotateInDownRight}
        >
        <Feather name="check" size={20} color={colors.white}/>
        </Animated.View>
      ) : (
        <View className="w-8 h-8 rounded-lg bg-zinc-900 " />
      )}

      <Text className="ml-3 text-base font-semibold text-white">{title} </Text>
    </TouchableOpacity>
  );
}
