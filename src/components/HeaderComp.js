import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const HeaderComp = ({ firstName, lastName, image,navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>{firstName} {lastName}</Text>
            </View>

            {image && (
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <Image
                        source={{ uri: image }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default HeaderComp;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: "#eee"
    }
});
