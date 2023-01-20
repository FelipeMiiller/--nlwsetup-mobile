import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import { HabitDay, day_size } from "../components/habitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();

const dayYearsFill = 365 - datesFromYearStart.length;

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2 ">
        {weekDays.map((weekDay, i) => {
          return (
            <Text
              key={i}
              className="text-zinc-400 text-xl font-bold text-center mx-1 "
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
        <View className="flex-row flex-wrap  mt-6 ">
          {datesFromYearStart.map((date, i) => {
            return <HabitDay key={date.toISOString()} />;
          })}

          {dayYearsFill > 0 &&
            Array.from({ length: dayYearsFill }).map((date, i) => {
              return (
                <View
                  key={i}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: day_size, height: day_size }}
                ></View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
