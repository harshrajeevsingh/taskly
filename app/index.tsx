import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";
import ShoppingList from "../components/ShoppingList";
import { useState } from "react";

type ShoppinglListItemType = {
  id: string;
  name: string;
};

const shoppingList: ShoppinglListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Biscuit" },
];
export default function App() {
  const [lists, setLists] = useState(shoppingList);
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    if (value.trim()) {
      const newShoppingList = [
        { id: new Date().toISOString(), name: value },
        ...lists,
      ];
      setLists(newShoppingList);
    }
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Eg, Coffee"
        style={styles.textInput}
        returnKeyType="done"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
      />
      {lists.map(({ id, name }) => (
        <ShoppingList key={id} name={name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 50,
    fontSize: 18,
  },
});
