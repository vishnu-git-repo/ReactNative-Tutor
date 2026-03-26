import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Calculator() {
    const [input, setInput] = useState('');

    const handlePress = (value: string) => {
        if (value === 'C') {
            setInput('');
        } else if (value === '=') {
            try {
                setInput(eval(input).toString());
            } catch {
                setInput('Error');
            }
        } else {
            setInput(input + value);
        }
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        'C', '0', '=', '+'
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{input || '0'}</Text>

            <View style={styles.grid}>
                {buttons.map((btn) => (
                    <div>
                        <TouchableOpacity
                            key={btn}
                            style={styles.button}
                            onPress={() => handlePress(btn)}
                        >
                            <Text style={styles.text}>{btn}</Text>
                        </TouchableOpacity>
                    </div>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'flex-end',
        padding: 20,
    },
    display: {
        fontSize: 48,
        color: 'white',
        textAlign: 'right',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        width: '25%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323131'
    },
    text: {
        fontSize: 24,
        color: 'white',
    }
});