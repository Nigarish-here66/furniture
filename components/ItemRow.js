import React from "react";
import {View,Text,TouchableOpacity,Image} from "react-native";

const ItemRow = ({item,quantities,updateQuantity })=>{
  return (
    <View style={styles.itemRow}>

      <Image source={item.image} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemMonthly}>${item.monthly}/mo</Text>
      </View>

      <View style={styles.counter}>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateQuantity(item.key, -1)}  >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantities[item.key]}</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateQuantity(item.key, 1)} >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
  },
  itemMonthly: {
    fontSize: 14,
    marginTop: 10,
    color: "#007BFF",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 25,
    height: 25,
    borderRadius: 16,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  counterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ItemRow;
