import CategoriesSection from "@/components/gameConfig/CategoriesSection";
import InitGameButton from "@/components/gameConfig/InitGameButton";
import PlayersSection from "@/components/gameConfig/PlayersSection";
import SpecialRoundSelection from "@/components/gameConfig/SpecialRoundsSection";
import SpyCountSection from "@/components/gameConfig/SpyCountSection";
import MainView from "@/components/MainView";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SectionType {
  key: string;
  component: React.ReactNode;
}

export default function GameConfig() {
  const insets = useSafeAreaInsets();

  const sections: SectionType[] = [
    {
      key: "players",
      component: <PlayersSection />,
    },
    {
      key: "spies",
      component: <SpyCountSection />,
    },
    {
      key: "categories",
      component: <CategoriesSection />,
    },
    {
      key: "specialRounds",
      component: <SpecialRoundSelection />,
    },
    {
      key: "submit",
      component: <InitGameButton />,
    },
  ];
  return (
    <MainView>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <FlatList
          data={sections}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <>{item.component}</>}
          className="p-4"
          contentContainerClassName="gap-4"
          contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        />
      </KeyboardAvoidingView>
    </MainView>
  );
}
