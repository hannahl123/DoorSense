import React from 'react';
import { View, Text } from 'react-native';
import { useTextStyles } from '@/constants/textStyles';

export default function About() {
    const styles = useTextStyles();

    return (
        <View style={styles.view}>
            <Text style={styles.title}>About DoorSense</Text>
            <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et sapien vel orci feugiat facilisis. Integer non nibh lobortis, consectetur velit vel, pellentesque quam. Nunc rhoncus accumsan orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sit amet urna sed sem eleifend convallis. Pellentesque lobortis nisl a feugiat semper. Nulla ac orci eu mi bibendum vehicula nec in nisi. Nullam ut faucibus arcu. Phasellus pellentesque purus viverra felis blandit, id venenatis justo condimentum. Aliquam fringilla tortor orci, eu condimentum mi sollicitudin ac. Sed eget massa vitae justo facilisis ullamcorper vitae in felis.
            </Text>
        </View>
    )
}