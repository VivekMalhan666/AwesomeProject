import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [entries, setEntries] = useState([
    {
      description: "Edulyx",
      amount: 35000,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {}, [entries]);

  useEffect(() => {
    setTotal(
      entries.reduce((total, entries) => {
        return total + Number(entries.amount);
      }, 0)
    );
  }, [entries]);

  const addGigs = () => {
    setEntries([
      ...entries,
      {
        description: description,
        amount: amount,
        timestamp: new Date(),
      },
    ]);
    setDescription("");
    setAmount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Let's get things done🚀🚀</Text>
      </View>
      <Text style={styles.text}>Total Income: ₹{total} </Text>
      <View>
        <LineChart
          data={{
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
            datasets: [
              {
                data: [entries[0].amount, Math.random() * 100],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <TextInput
        value={description}
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter a Description"
        placeholderTextColor="#f3f3f3"
      />
      <TextInput
        value={amount}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter the amount"
        placeholderTextColor="#f3f3f3"
        onChangeText={(text) => setAmount(text)}
      />
      <Button
        disabled={!amount && !description}
        title="Add Your Gig"
        onPress={addGigs}
      />
      {entries.map((entry) => (
        <ScrollView>
          <Text style={styles.text}>{entry.description}</Text>
          <Text style={styles.text}>{entry.amount}</Text>
        </ScrollView>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    height: 40,
    marginTop: 20,
    fontSize: 35,
    marginBottom: 5,
  },
  text: {
    color: "white",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
});
