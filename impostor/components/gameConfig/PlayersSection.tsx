import { Pressable, View } from "react-native";
import Section from "../Section";
import CustomText from "../CustomText";
import { useCurrentGameStore } from "@/stores/currentGame";
import PlayerCard from "./PlayerCard";
import CountControl from "./CountControl";
import { PlusIcon } from "../Icons";

export default function PlayersSection() {
  const players = useCurrentGameStore((state) => state.players);
  const setPlayers = useCurrentGameStore((state) => state.setPlayers);

  const handleAddPlayer = () => {
    const newPlayer = {
      id: Date.now().toString(),
      name: `Jugador ${players.length + 1}`,
    };
    setPlayers([...players, newPlayer]);
  };
  const handleRemoveLastPlayer = () => {
    setPlayers(players.slice(0, -1));
  };
  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
  };
  const handleEditPlayerName = (id: string, name: string) => {
    setPlayers(
      players.map((player) =>
        player.id === id ? { ...player, name } : player,
      ),
    );
  };

  return (
    <Section>
      <View className="flex-row justify-between">
        <CustomText className="text-2xl font-medium">Jugadores:</CustomText>
      </View>
      <CountControl
        count={players.length}
        onAdd={handleAddPlayer}
        onRemove={handleRemoveLastPlayer}
      />
      <View className="flex-col gap-2">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onRemove={() => handleRemovePlayer(player.id)}
            onEdit={(text) => handleEditPlayerName(player.id, text)}
          />
        ))}
        <Pressable
          onPress={handleAddPlayer}
          className="rounded-lg border-2 border-onBackground-accent p-2 items-center justify-center"
        >
          <PlusIcon className="text-onBackground-primary" />
        </Pressable>
      </View>
    </Section>
  );
}
