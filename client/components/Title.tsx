import { type TextProps } from "react-native";
import CustomText from "./CustomText";

export default function Title(props: TextProps) {
  return (
    <CustomText
      {...props}
      className={"text-3xl font-bold " + (props.className || "")}
    >
      {props.children}
    </CustomText>
  );
}
