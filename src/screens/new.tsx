import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../components/backButton";
import { CheckBox } from "../components/checkBox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";
const avaliableWeekDays = [
  "Domingo",
  "Segunda",
  "Terça-Feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo Hábito",
          "Informe o nome do hábito e escolha a periodicidade."
        );
      }
      await api.post("/habits", { title, weekDays });
      setTitle("");
      setWeekDays([]);
      Alert.alert(
        "Novo Hábito",
        "Hábito criado com sucesso!"
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possivel criar novo hábito");
    }
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-3xl font-extrabold text-white">
          Criar hábito
        </Text>

        <Text className="mt-6 text-base font-semibold text-white">
          Qual seu comprometimento ?
        </Text>

        <TextInput
          className="h-12 pl-4 mt-3 text-white border-2 rounded-lg border-zinc-800 bg-zinc-900 focus:border-green-600 "
          placeholder="exercicio, dormir etc.."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        ></TextInput>

        <Text className="mt-4 mb-3 text-base font-semibold text-white">
          Qual a recorrência ?
        </Text>
        {avaliableWeekDays.map((weekDay, index) => {
          return (
            <CheckBox
              key={weekDay}
              title={`${weekDay}  ${index} ${weekDays.includes(index)}`}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          );
        })}

        <TouchableOpacity
          className="flex-row items-center justify-center w-full mt-6 bg-green-600 rounded-md h-14"
          onPress={handleCreateHabit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="ml-2 text-base font-semibold text-white">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
