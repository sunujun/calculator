import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const App = () => {
    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);

    return <View />;
};

const styles = StyleSheet.create({});

export default App;
