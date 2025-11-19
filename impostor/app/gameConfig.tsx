import CategoriesSection from "@/components/gameConfig/CategoriesSection";
import PlayersSection from "@/components/gameConfig/PlayersSection";
import SpyCountSection from "@/components/gameConfig/SpyCountSection";
import MainView from "@/components/MainView";
import { FlatList } from "react-native";

interface SectionType {
  key: string;
  component: React.ReactNode;
}

export default function GameConfig() {
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
  ];
  return (
    <MainView>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <>{item.component}</>}
        className="p-4"
        contentContainerClassName="gap-4"
      />
    </MainView>
  );
}
