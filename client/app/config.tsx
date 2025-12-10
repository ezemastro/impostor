import { View, Linking } from "react-native";
import MainView from "@/components/MainView";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import TextButton from "@/components/TextButton";
import CustomText from "@/components/CustomText";
import { nativeBuildVersion } from "expo-application";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useCategoriesStore } from "@/stores/categories";
import * as MailComposer from "expo-mail-composer";
import { CONTACT_EMAIL } from "@/constants/contact";
import { useCurrentGameStore } from "@/stores/currentGame";
import { showNativeToast } from "@/utils/showNativeToast";

export default function ConfigPage() {
  const insets = useSafeAreaInsets();
  const resetCategories = useCategoriesStore((state) => state.resetCategories);
  const resetSpecialRounds = useCurrentGameStore(
    (state) => state.resetSpecialRounds,
  );
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isMailModalVisible, setIsMailModalVisible] = useState(false);
  const [isMailAvailable, setIsMailAvailable] = useState(false);

  useEffect(() => {
    MailComposer.isAvailableAsync().then((isAvailable) => {
      setIsMailAvailable(isAvailable);
    });
  }, []);

  const handleMailPress = () => {
    if (isMailAvailable) {
      MailComposer.composeAsync({
        subject: "Impostor - Reporte de bug / Sugerencia",
        recipients: [CONTACT_EMAIL],
      });
    } else {
      Linking.openURL(`mailto:${CONTACT_EMAIL}`);
    }
    setIsMailModalVisible(false);
  };

  const handleResetSpecialRounds = () => {
    resetSpecialRounds();
    showNativeToast("Rondas especiales restablecidas");
  };

  const handleResetCategories = () => {
    resetCategories();
    setIsCategoryModalVisible(false);
    showNativeToast("Categorías restablecidas");
  };

  return (
    <>
      <Stack.Screen options={{ headerRight: undefined }} />
      <ConfirmationModal
        visible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        onConfirm={handleResetCategories}
        title="Restablecer categorías"
        description="¿Estás seguro de que deseas restablecer las categorías a sus valores predeterminados? Se perderán las categorías que hayas creado o modificado."
      />
      <ConfirmationModal
        visible={isMailModalVisible}
        onClose={() => setIsMailModalVisible(false)}
        onConfirm={handleMailPress}
        title="Enviar correo"
        description={`Se abrirá tu aplicación de correo predeterminada para enviar un mensaje a ${CONTACT_EMAIL}.`}
      />
      <MainView>
        <View className="flex-1 p-4 pt-8 gap-8">
          <View className="gap-2">
            <CustomText className="text-onBackground-secondary font-medium text-lg">
              DATOS DEL JUEGO
            </CustomText>
            <Button className="bg-app-secondary">
              <TextButton onPress={() => setIsCategoryModalVisible(true)}>
                Restablecer categorías
              </TextButton>
            </Button>
            <Button className="bg-app-secondary">
              <TextButton onPress={handleResetSpecialRounds}>
                Restablecer rondas especiales
              </TextButton>
            </Button>
          </View>
          <View className="gap-2">
            <CustomText className="text-onBackground-secondary font-medium text-lg">
              SOPORTE Y COMUNIDAD
            </CustomText>
            <Button className="bg-app-secondary">
              <TextButton onPress={() => setIsMailModalVisible(true)}>
                Reportar bug / Sugerencia
              </TextButton>
            </Button>
            <CustomText className="text-onBackground-secondary mt-2">
              Esta app es gratis y sin anuncios. Si te gusta, considera
              apoyarnos dejando una reseña positiva o compartiéndola con tus
              amigos.
            </CustomText>
            <View className="mt-2">
              <CustomText className="text-onBackground-secondary">
                App de código abierto. Puedes ver el código fuente en{" "}
              </CustomText>

              <CustomText
                className="text-app-primary"
                onPress={() =>
                  Linking.openURL("https://github.com/ezemastro/impostor")
                }
              >
                https://github.com/ezemastro/impostor
              </CustomText>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: insets.bottom, marginLeft: insets.left }}>
          <CustomText className="text-onBackground-secondary/60 text-sm px-4">
            Versión {nativeBuildVersion}
          </CustomText>
        </View>
      </MainView>
    </>
  );
}
