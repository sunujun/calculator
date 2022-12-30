import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    /** 맨 위에 보이는 숫자 */
    const [input, setInput] = useState(0);
    /** 현재 눌러져 있는 연산자 */
    const [currentOperator, setCurrentOperator] = useState<string | null>(null);
    /** 연산 결과값 */
    const [result, setResult] = useState(0);
    /** 임시 저장되어 있는 숫자 */
    const [tempInput, setTempInput] = useState(0);
    /** 임시 저장되어 있는 연산자 */
    const [tempOperator, setTempOperator] = useState<string | null>(null);
    /** +, -, *, / 눌려있는지 */
    const [isPressedOperator, setIsPressedOperator] = useState(false);
    /** 마지막으로 누른 버튼이 = 인지 */
    const [isPressedEqual, setIsPressedEqual] = useState(false);

    const hasInput = !!input;

    const onPressNumber = (number: number) => {
        if (isPressedEqual) {
            setInput(number);
            setIsPressedEqual(false);
        } else if (currentOperator && isPressedOperator) {
            setResult(input);
            setInput(number);
            setIsPressedOperator(false);
            setTempOperator(currentOperator);
        } else {
            const newInput = Number(input.toString() + number.toString());
            setInput(newInput);
        }
    };

    const onPressOperator = (operator: string) => {
        let finalResult;
        const finalInput = isPressedEqual || (currentOperator === null && tempOperator !== null) ? tempInput : input;
        const finalOperator =
            isPressedEqual || (currentOperator === null && tempOperator !== null) ? tempOperator : currentOperator;
        if (operator === '=') {
            switch (finalOperator) {
                case '+':
                    // ex) 15 + = 눌렀을 때, 15 + 15의 결과값이 나와야함
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput + finalInput;
                    }
                    // ex) 15 + 15 = 누른 후, 20 입력하고 = 눌렀을 때, 20 + 15의 결과값이 나와야함
                    else if (currentOperator === null) {
                        finalResult = input + finalInput;
                    }
                    // 일반적인 연산 결과
                    else {
                        finalResult = result + finalInput;
                    }
                    break;
                case '-':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput - finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input - finalInput;
                    } else {
                        finalResult = result - finalInput;
                    }
                    break;
                case '*':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput * finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input * finalInput;
                    } else {
                        finalResult = result * finalInput;
                    }
                    break;
                case '/':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput / finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input / finalInput;
                    } else {
                        finalResult = result / finalInput;
                    }
                    break;
                default:
                    // 15 = 눌렀을 때, 15가 나와야함
                    finalResult = finalInput;
                    break;
            }
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(null);
            setTempOperator(finalOperator);
            setIsPressedOperator(false);
            setIsPressedEqual(true);
        }
        // 연속된 연산을 위해 필요한 로직
        else if (currentOperator !== null && tempOperator === '+') {
            finalResult = result + finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '-') {
            finalResult = result - finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '*') {
            finalResult = result * finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '/') {
            finalResult = result / finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        }
        // 그 외, +, -, *, /를 눌렀을 때
        else {
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        }
    };

    const onPressReset = () => {
        if (hasInput) {
            setInput(0);
        } else {
            setInput(0);
            setCurrentOperator(null);
            setResult(0);
            setTempInput(0);
            setTempOperator(null);
            setIsPressedEqual(false);
            setIsPressedOperator(false);
        }
    };

    return (
        <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
            {/* 결과 */}
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
            </View>
            {/* [AC ~ /] */}
            <View style={styles.buttonContainer}>
                <Button type="reset" text={hasInput ? 'C' : 'AC'} onPress={() => onPressReset()} flex={3} />
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
