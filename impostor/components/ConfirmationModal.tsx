import { Modal, ModalProps, Pressable, View } from "react-native";
import { CrossIcon } from "./Icons";
import Title from "./Title";
import CustomText from "./CustomText";
import Button from "./Button";
import TextButton from "./TextButton";

interface Props extends ModalProps {
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description: string;
}
export default function ConfirmationModal({
  onConfirm,
  onClose,
  title,
  description,
  ...props
}: Props) {
  return (
    <Modal backdropColor={"transparent"} onRequestClose={onClose} {...props}>
      <View className="bg-background-primary rounded-lg mx-4 my-auto p-4 py-8 gap-6">
        <Pressable
          className="absolute right-3 top-3 p-2 z-50"
          onPress={onClose}
        >
          <CrossIcon className="text-onBackground-primary" />
        </Pressable>
        <Title className="text-center">{title}</Title>
        <CustomText
          className={
            "text-onBackground-secondary " +
            (description.length < 100 ? "text-center" : "")
          }
        >
          {description}
        </CustomText>
        <View className="flex-row justify-between mt-2">
          <Button onPress={onClose} className="bg-app-secondary min-w-0">
            <TextButton className="text-2xl">Cancelar</TextButton>
          </Button>
          <Button onPress={onConfirm} className="min-w-0">
            <TextButton className="text-2xl">Confirmar</TextButton>
          </Button>
        </View>
      </View>
    </Modal>
  );
}
