import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.text}>HEADER</Text>
      </View>

      <view style={styles.content}>

      </view>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "aqua",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "pink",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarLeft: {
    width: 50,
    backgroundColor: "blue",
  },
  sidebarRight: {
    width: 50,
    backgroundColor: "green",
  },
  content: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "purple",
    fontWeight: "bold",
  },
});

