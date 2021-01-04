import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	SafeAreaView,
	TextInput,
	Button,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";

const App = () => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([
		{ date: moment().format("LL"), amount: 2000 },
		{ date: moment().subtract(1, "days").format("LL"), amount: 2500 },
		{ date: moment().subtract(1, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(1, "days").format("LL"), amount: 2500 },
		{ date: moment().subtract(1, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(7, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(6, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(5, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(4, "days").format("LL"), amount: 3500 },
		{ date: moment().subtract(3, "days").format("LL"), amount: 4500 },
		{ date: moment().subtract(2, "days").format("LL"), amount: 5500 },
		{ date: moment().subtract(2, "days").format("LL"), amount: 5500 },
	]);
	const [transformedData, setTransformedData] = useState([]);

	useEffect(() => {
		setTransformedData(transformData(groupBy(data, "date")));
	}, [data]);
	const groupBy = (array, key) =>
		array.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});

	const [gigs, setGigs] = useState([
		{
			description: "Eduylx Stipend",
			amount: 35000,
			timestamp: new Date(),
		},
	]);

	const getDates = () => transformedData.map((pair) => pair.date);
	const getAmounts = () => transformedData.map((pair) => pair.amount);

	const transformData = (groupedData) => {
		const transformedArray = [];
		Object.entries(groupedData).forEach((entry) => {
			const total = entry[1].reduce((total, pair) => (total += pair.amount), 0);
			transformedArray.push({
				date: moment(entry[0]).format("MM/DD"),
				amount: total,
			});
		});

		const sortedArray = transformedArray.sort((a, b) =>
			moment(a["date"]).diff(b["date"])
		);

		return sortedArray;
	};

	console.log(data);
	console.log(getDates());
	console.log(getAmounts());
	console.log(Object.entries(groupBy(data, "date")));
	console.log(transformData(groupBy(data, "date")));

	useEffect(() => {
		setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
	}, [gigs]);

	const addGigs = () => {
		setGigs([
			...gigs,
			{
				description: description,
				amount: amount,
			},
		]);

		setData([
			...data,
			{
				date: moment().format("LL"),
				amount: Number(amount),
			},
		]);
		setDescription("");
		setAmount("");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.heading}>Let's Track Income🚀🚀</Text>
			</View>
			<View>
				<LineChart
					data={{
						labels: getDates(),
						datasets: [
							{
								data: getAmounts(),
							},
						],
					}}
					width={Dimensions.get("window").width} // from react-native
					height={220}
					yAxisLabel="₹"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						decimalPlaces: 2, // optional, defaults to 2dp
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

				<Text style={styles.text}>Total Income: ₹{total} </Text>
			</View>
			{gigs.map((gig) => (
				<View key={gig}>
					<Text style={styles.text}>{gig.description}</Text>
					<Text style={styles.text}>${gig.amount}</Text>
				</View>
			))}
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
		</SafeAreaView>
	);
};

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
		borderColor: "cyan",
		borderWidth: 1,
		color: "#fff",
	},
	container: {
		flex: 1,
		backgroundColor: "#333",
	},
});

export default App;
