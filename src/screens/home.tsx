import { Text, View, ScrollView, Alert } from "react-native";
import { Header } from "../components/header";
import { HabitDay, day_size } from "../components/habitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/loading";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const dayYearsFill = 365 - datesFromYearStart.length;

type SummaryType = Array<{
  amount: number;
  completed: number;
  date: Date;
}>;
export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryType | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      console.log(response.data);
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar hábitos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <Header />

      <View className="flex-row mt-6 mb-2 ">
        {weekDays.map((weekDay, i) => {
          return (
            <Text
              key={i}
              className="mx-1 text-xl font-bold text-center text-zinc-400 "
              style={{ width: day_size, height: day_size }}
            >
              {weekDay}
            </Text>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {summary && (
          <View className="flex-row flex-wrap mt-6 ">
            {datesFromYearStart.map((date, i) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });
              console.log(dayWithHabits?.amount, dayWithHabits?.completed);
              return (
                <HabitDay
                  key={i}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                />
              );
            })}

            {dayYearsFill > 0 &&
              Array.from({ length: dayYearsFill }).map((date, i) => {
                return (
                  <View
                    key={i}
                    className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40"
                    style={{ width: day_size, height: day_size }}
                  ></View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
