import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Entries = ({ gigs }) => {
  return (
    <>
      {gigs.map((entry) => (
        <View style={styles.Entries}>
          <Text style={styles.text}>{entry.description}</Text>
          <Text style={styles.text}>{entry.amount}</Text>
        </View>
      ))}
    </>
  );
};

export default Entries;

const styles = StyleSheet.create({
  text: {
    color: "white",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
  },
  Entries: {
    borderColor: "red",
    borderWidth: 1,
    margin: 5,
    padding: 1,
  },
});
