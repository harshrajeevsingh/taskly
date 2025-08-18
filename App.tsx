import { StyleSheet, View } from "react-native";
import { theme } from "./theme";
import ShoppingList from "./components/ShoppingList";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingList name={"Coffee"} />
      <ShoppingList name={"Tea"} />
      <ShoppingList name={"Biscuit"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
});
