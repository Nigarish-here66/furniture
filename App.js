import React, {useState} from "react";
import {ScrollView,Text,Alert,StyleSheet} from "react-native";
import {ref,push} from "firebase/database";
import database from "./firebaseConfig"; 
import ItemRow from "./components/ItemRow"; 
import Summary from "./components/Summary"; 
import items from "./components/items";

const CheckoutScreen =()=>{
  const [quantities,setQuantities] = useState({florence:0, hewitt:0, harper:0});

  const updateQuantity = (itemKey, change) =>{
    let currentQuantity = quantities[itemKey];
    let newQuantity = currentQuantity+change;
  
    if (newQuantity<0){
      newQuantity=0;
    }
  
    setQuantities({
      ...quantities,
      [itemKey]:newQuantity,
    });
  };
  
  const calculateMonthlyTotal =()=>{
    let total=0;
    for (const item of items){
      const quantity = quantities[item.key] || 0;
      total += quantity * item.monthly;
    } return total;
  };

  const monthlyTotal = calculateMonthlyTotal();
  const rentalPeriod = 2;
  const deliveryFee = 199;
  const subtotal = monthlyTotal * rentalPeriod + deliveryFee;

  const handleCheckout = async ()=>{
    const checkoutItems = [];
    for (const item of items){
      const quantity = quantities[item.key] || 0;
      if (quantity>0){
        checkoutItems.push({
          name:item.name,
          price:item.price,
          monthly:item.monthly,
          quantity,
          totalMonthlyCost:item.monthly * quantity,
        });
      }
    }

    const orderDetails ={
      items:checkoutItems,
      monthlyTotal,
      rentalPeriod,
      deliveryFee,
      subtotal,
    };

    try{
      const ordersRef = ref(database, "orders");
      await push(ordersRef, orderDetails);
      Alert.alert("Success", "Your order has been placed!");
    }catch (error){
      console.error("Error saving order: ", error);
      Alert.alert("Error", "Failed to place your order. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      {items.map((item) =>(
        <ItemRow 
          key={item.key} 
          item={item} 
          quantities={quantities} 
          updateQuantity={updateQuantity} />
      ))}
      <Summary 
        monthlyTotal={monthlyTotal} 
        deliveryFee={deliveryFee} 
        rentalPeriod={rentalPeriod} 
        subtotal={subtotal} 
        handleCheckout={handleCheckout} />
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
});

export default CheckoutScreen;
