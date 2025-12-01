import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { use, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ButtonComp from '../components/ButtonComp'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState("emilys")
    const [password, setPassword] = useState("emilyspass")
    const [loading, setLoading] = useState(false)


    const handleLogin = () => {
        setLoading(true)
        dispatch(loginUser({ username, password }))
            .then((res) => {
                console.log("DISPATCH RESULT =>", res);
                setLoading(false)
                if (res.type === "auth/loginUser/fulfilled") {
                    Alert.alert(
                        "Success",
                        "Login successful!",
                        [{ text: "OK" }]
                    );
                    navigation.replace("Home")
                } else {
                    Alert.alert(
                        "Error",
                        "Invalid username or password",
                        [{ text: "Retry" }]
                    );
                }
            });
    }

    return (
        <View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: '700', color: '#3f8684ff' }}>Login_Screen</Text>
            </View>
            <View style={{ marginVertical: 50 }}>
                <Text style={styles.heading}>UserName</Text>
                <CustomInput placeholder={'Enter your email'} value={username} onChangeText={(text) => setUsername(text)} style={styles.input} />
                <Text style={styles.heading}>Password</Text>
                <CustomInput placeholder={'Enter your password'} secure value={password} onChangeText={(pass) => setPassword(pass)} style={styles.input} />


                <ButtonComp textStyle={styles.text} title="Login" style={styles.btn} onPress={() => handleLogin()} loading={loading} />

            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        color: "#0d5ee0ef",
        fontWeight: '700',
        padding: 20
    },
    input: {
        borderColor: '#d2176eff',
        width: '90%',
        alignSelf: 'center'
    },
    btn: {
        marginVertical: 25
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
    }
})