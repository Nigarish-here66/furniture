import React from "react";
import {View,Text,TouchableOpacity} from "react-native";

const Summary = ({ monthlyTotal, deliveryFee, rentalPeriod, subtotal, handleCheckout }) => {
  return (
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
  );
};

const styles = {
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
};

export default Summary;
