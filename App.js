import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert} from "react-native";
import { ref, set, push } from "firebase/database";
import database from "./firebaseConfig"; 
import items from "./items"; 

const CheckoutScreen = () => {
  const [quantities, setQuantities] = useState({
    florence: 0,
    hewitt: 0,
    harper: 0,
  });

  const handleQuantityChange = (key, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const monthlyTotal = items.reduce(
    (total, item) => total + quantities[item.key] * item.monthly,
    0
  );

  const rentalPeriod = 2;
  const deliveryFee = 199;
  const subtotal = monthlyTotal * rentalPeriod + deliveryFee;

  const handleCheckout = async () => {
    const checkoutData = items
      .filter((item) => quantities[item.key] > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        monthly: item.monthly,
        quantity: quantities[item.key],
        totalMonthlyCost: item.monthly * quantities[item.key],
      }));

    const orderData = {
      items: checkoutData,
      monthlyTotal,
      rentalPeriod,
      deliveryFee,
      subtotal,
      timestamp: new Date().toISOString(),
    };

    try {
      const ordersRef = ref(database, "orders");
      await push(ordersRef, orderData);

      Alert.alert("Success", "Your order has been placed!");
    } catch (error) {
      console.error("Error saving order: ", error);
      Alert.alert("Error", "Failed to place your order. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      {items.map((item) => (
        <View key={item.key} style={styles.itemRow}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Text style={styles.itemMonthly}>${item.monthly}/mo</Text>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => handleQuantityChange(item.key, -1)}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantities[item.key]}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => handleQuantityChange(item.key, 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.summary}>
        <Text style={styles.summaryHeader}>Order summary</Text>
        <View style={styles.summaryRow}>
          <Text>Monthly furniture total:</Text>
          <Text>${monthlyTotal}/mo</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Delivery and assembly:</Text>
          <Text>${deliveryFee}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Rental period:</Text>
          <Text>{rentalPeriod} month</Text>
        </View>
        <View style={styles.subtotal}>
          <Text>Subtotal:</Text>
          <Text>${subtotal}</Text>
        </View>
        <TouchableOpacity style={styles.rentButton} onPress={handleCheckout}>
          <Text style={styles.rentButtonText}>Rent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, 
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 70,
  },
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
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%", 
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 16,
  },
  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  rentButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  rentButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CheckoutScreen;
