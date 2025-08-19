import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { useState } from "react";

import { theme } from "../theme";
import ShoppingList from "../components/ShoppingList";

type ShoppinglListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [lists, setLists] = useState<ShoppinglListItemType[]>([]);
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    if (value.trim()) {
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...lists,
      ];
      setLists(newShoppingList);
    }
    setValue("");
  };

  const handleDelete = (id: string) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = lists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      } else {
        return item;
      }
    });

    setLists(newShoppingList);
  };

  function orderShoppingList(shoppingList: ShoppinglListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(lists)}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your Shopping list is empty</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ShoppingList
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimestamp)}
        />
      )}
      ListHeaderComponent={
        <TextInput
          placeholder="E.g. Coffee"
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
    paddingVertical: 12,
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
