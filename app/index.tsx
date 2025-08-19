import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
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
  const [lists, setLists] = useState<ShoppinglListItemType[]>(shoppingList);
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
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={lists}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your Shopping list is empty</Text>
        </View>
      }
      renderItem={({ item }) => <ShoppingList name={item.name} />}
      ListHeaderComponent={
        <TextInput
          placeholder="Eg, Coffee"
          style={styles.textInput}
          returnKeyType="done"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderWidth: 2,
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorLightGrey,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 50,
    fontSize: 18,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
