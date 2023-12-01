import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Pedometer } from 'expo-sensors';

const App = () => {
  const [pastStepCount, setPastStepCount] = useState(0);
  const [twoDaysAgoStepCount, setTwoDaysAgoStepCount] = useState(0);
  const [todayStepCount, setTodayStepCount] = useState(0);

  const handleRetrieveSteps = async () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    const result = await Pedometer.getStepCountAsync(start, end);
    setPastStepCount(result.steps);
  };

  const handleRetrieveStepsTwoDaysAgo = async () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 2);
    start.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() - 2);
    end.setHours(23, 59, 59, 999);

    const result = await Pedometer.getStepCountAsync(start, end);
    setTwoDaysAgoStepCount(result.steps);
  };

  const handleRetrieveTodaySteps = async () => {
    const now = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0); 
    const result = await Pedometer.getStepCountAsync(start, now);
    setTodayStepCount(result.steps);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Steps taken today: {todayStepCount}</Text>
      <Button title="Retrieve Today's Steps" onPress={handleRetrieveTodaySteps} />
      <Text>Steps taken yesterday: {pastStepCount}</Text>
      <Button title="Retrieve Yesterday's Steps" onPress={handleRetrieveSteps} />
      <Text>Steps taken two days ago: {twoDaysAgoStepCount}</Text>
      <Button title="Retrieve Steps from Two Days Ago" onPress={handleRetrieveStepsTwoDaysAgo} />
    </View>
  );
};

export default App;
