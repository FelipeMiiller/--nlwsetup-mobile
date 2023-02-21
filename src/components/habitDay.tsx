import dayjs from "dayjs";
import { Text } from "react-native";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";

const weeek_days = 7;
const screen_horizontal_padding = (32 * 2) / 5;

export const day_margin_between = 10;
export const day_size =
  Dimensions.get("screen").width / weeek_days - (screen_horizontal_padding + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  date,
  amountCompleted = 0,
  amountOfHabits = 0,
  ...rest
}: Props) {

   console.log(amountOfHabits,amountCompleted)






  
  const parsedDate = dayjs(date);
  const dayAndMonth = parsedDate.format("DD/MM");
  const toDay = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(toDay);
  const amountAccomplishedPercentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits,amountCompleted )
      : 0;

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        "rounded-lg border-2 m-1  flex items-center justify-center ",
        {
          "bg-zinc-900 border-zinc-800 ": amountAccomplishedPercentage === 0,
          "bg-violet-900 border-violet-700":
            amountAccomplishedPercentage > 0 &&
            amountAccomplishedPercentage < 20,
          "bg-violet-800 border-violet-600":
            amountAccomplishedPercentage >= 20 &&
            amountAccomplishedPercentage < 40,
          "bg-violet-700 border-violet-500":
            amountAccomplishedPercentage >= 40 &&
            amountAccomplishedPercentage < 60,
          "bg-violet-600 border-violet-500":
            amountAccomplishedPercentage >= 60 &&
            amountAccomplishedPercentage < 80,
          "bg-violet-500 border-violet-500": amountAccomplishedPercentage >= 80,
          "border-white border-1": isCurrentDay,
        }
      )}
      style={{ width: day_size, height: day_size }}
      activeOpacity={0.7}
    >
      <Text className="items-center text-xs text-white">
        {amountOfHabits ? dayAndMonth : ""}
      </Text>
    </TouchableOpacity>
  );
}
