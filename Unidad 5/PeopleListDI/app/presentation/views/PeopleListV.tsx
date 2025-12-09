import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";

const PeopleList = observer(() => {
  const vmRef = useRef<PeopleListVM | null>(null);

  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }

  const viewModel = vmRef.current;

  const renderItem = ({ item }: { item: Persona }) => {
    const isSelected =
      viewModel.personaSeleccionada?.id === item.id;

    return (
      <Pressable
        onPress={() => (viewModel.personaSeleccionada = item)}
        style={({ pressed }) => [
          styles.card,
          isSelected && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.nombre.charAt(0)}
          </Text>
        </View>

        <Text style={styles.cardName}>
          {item.nombre} {item.apellido}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>✨ Personas ✨</Text>

      <View style={styles.selectedBox}>
        <Text style={styles.selectedLabel}>Seleccionada</Text>
        <Text style={styles.selectedName}>
          {viewModel.personaSeleccionada
            ? `${viewModel.personaSeleccionada.nombre} ${viewModel.personaSeleccionada.apellido}`
            : "Ninguna"}
        </Text>
      </View>

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No hay personas 🌧️
          </Text>
        )}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F8",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
    color: "#DB2777",
  },

  selectedBox: {
    backgroundColor: "#FFE4E6",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  selectedLabel: {
    fontSize: 13,
    color: "#9D174D",
  },

  selectedName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#BE185D",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  cardSelected: {
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F472B6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  cardName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },

  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 16,
  },
});

export default PeopleList;
