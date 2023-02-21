import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";

import dayjs from "dayjs";

import { BackButton } from "../components/backButton";
import { Loading } from "../components/loading";
import { api } from "../lib/axios";
import { ProgressBar } from "../components/progressBar";
import { CheckBox } from "../components/checkBox";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitEmpty } from "../components/habitEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}
interface DayInfoProps {
  competedHabits: string[];
  possibleHabits: { id: string; title: string }[];
}
export function Habit() {
  const [loaging, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      setCompletedHabits(response.data.completedHabits);
      setDayInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível as informações dos hábitos");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
       await api.patch(`/habits/${habitId}/toggle`)
      
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops','Não foi possivel atualizar o status do hábito.')
    }
   
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loaging) {
    return <Loading />;
  }
  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 font-semibold lowercase text-zinc-400 ">
          {dayOfWeek}
        </Text>
        <Text className="text-3xl font-extrabold text-white ">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitsProgress} />
        <View className={clsx("mt-6", { ["opacity-50"]: isDateInPast })}>
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                disabled={isDateInPast}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitEmpty />
          )}

          {isDateInPast && (
            <Text className="mt-10 text-center text-white">
              Você não pode editar hábitos de uma data passada.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
