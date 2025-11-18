import { Pressable, Text } from "react-native";
import { CustomButton } from "./CustomButton";

type Props = {
  name: string;
  price: number;
  Image: string;
  onAddToCard: () => void;
}

export function CustomBotton({ name, price, Image, onAddToCard}: Props) {
  return (
    <view>
      <Text><{name}/Text>
      <Text><{price}/Text>
      <CustomButton label=''></CustomButton>
    </view>
  );
}