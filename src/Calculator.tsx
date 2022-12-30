import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Button type: 'reset' | 'operator' | 'number'
const Button = ({
    text,
    onPress,
    flex,
    type,
    isSelected,
}: {
    text: string;
    onPress?: (event: GestureResponderEvent) => void;
    flex?: number;
    type: 'reset' | 'operator' | 'number';
    isSelected?: boolean;
}) => {
    const backgroundColor =
        type === 'reset'
            ? COLOR.RESET
            : type === 'operator'
            ? COLOR.OPERATOR
            : type === 'number'
            ? COLOR.NUMBER
            : 'transparent';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex,
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderColor: 'black',
                borderWidth: isSelected ? 1 : 0.2,
            }}>
            <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
        </TouchableOpacity>
    );
};

const COLOR = {
    RESULT: '#4e4c51',
    RESET: '#5f5e62',
    OPERATOR: '#f39c29',
    NUMBER: '#5c5674',
};

const Calculator = () => {
    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState<string | null>(null);
    const [result, setResult] = useState<number>(0);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);

    const onPressNumber = (number: number) => {
        if (currentOperator) {
            setResult(input);
            setInput(number);
        } else {
            const newInput = Number(input.toString() + number.toString());
            setInput(newInput);
        }
    };

    const onPressOperator = (operator: string) => {
        if (operator !== '=') {
            setCurrentOperator(operator);
        } else {
            let finalResult = result;
            switch (currentOperator) {
                case '+':
                    finalResult = result + input;
                    break;
                case '-':
                    finalResult = result - input;
                    break;
                case '*':
                    finalResult = result * input;
                    break;
                case '/':
                    finalResult = result / input;
                    break;
                default:
                    break;
            }
            setResult(finalResult);
            setInput(finalResult);
        }
    };

    const onPressReset = () => {
        setInput(0);
        setCurrentOperator(null);
        setResult(0);
        setTempInput(null);
        setTempOperator(null);
    };

    return (
        <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
            {/* 결과 */}
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
            </View>
            {/* [AC ~ /] */}
            <View style={styles.buttonContainer}>
                <Button type="reset" text="AC" onPress={() => onPressReset()} flex={3} />
                <Button
                    type="operator"
                    text="/"
                    onPress={() => onPressOperator('/')}
                    flex={1}
                    isSelected={currentOperator === '/'}
                />
            </View>
            {/* [7 ~ x] */}
            <View style={styles.buttonContainer}>
                {[7, 8, 9].map(value => (
                    <Button
                        key={'number-' + value.toString()}
                        type="number"
                        text={value.toString()}
                        onPress={() => onPressNumber(value)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="*"
                    onPress={() => onPressOperator('*')}
                    flex={1}
                    isSelected={currentOperator === '*'}
                />
            </View>
            {/* [4 ~ -] */}
            <View style={styles.buttonContainer}>
                {[4, 5, 6].map(value => (
                    <Button
                        key={'number-' + value.toString()}
                        type="number"
                        text={value.toString()}
                        onPress={() => onPressNumber(value)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="-"
                    onPress={() => onPressOperator('-')}
                    flex={1}
                    isSelected={currentOperator === '-'}
                />
            </View>
            {/* [1 ~ +] */}
            <View style={styles.buttonContainer}>
                {[1, 2, 3].map(value => (
                    <Button
                        key={'number-' + value.toString()}
                        type="number"
                        text={value.toString()}
                        onPress={() => onPressNumber(value)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="+"
                    onPress={() => onPressOperator('+')}
                    flex={1}
                    isSelected={currentOperator === '+'}
                />
            </View>
            {/* [0 ~ =] */}
            <View style={styles.buttonContainer}>
                <Button type="number" text="0" onPress={() => onPressNumber(0)} flex={3} />
                <Button type="operator" text="=" onPress={() => onPressOperator('=')} flex={1} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    inputContainer: {
        backgroundColor: COLOR.RESULT,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});

export default Calculator;
