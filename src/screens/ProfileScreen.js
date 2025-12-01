import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import HeaderComp from '../components/HeaderComp'
import { useDispatch, useSelector } from 'react-redux';
import ButtonComp from '../components/ButtonComp';
import { logout } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
 const userData = useSelector((state) => state.auth.user);
  console.log("Profile Screen",userData)

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel" },
        {
          text: "Logout",
          onPress: async () => {
            // REMOVE TOKEN
            await AsyncStorage.removeItem("token");

            // RESET REDUX USER
            dispatch(logout());

            // redirect to login
            navigation.replace("Login");
          }
        }
      ]
    );
  };
  return (
    <View style={{flex:1,justifyContent: "space-between",}}>
      <View>
          <HeaderComp
        firstName={userData?.firstName}
        lastName={userData?.lastName}
        image={userData?.image}
        // navigation={navigation}
      />
      </View>
     
        <View>
          <ButtonComp style={styles.btn} title={'Logout'} onPress={handleLogout} />
        </View>
    
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  btn:{
    width:'90%',
    alignSelf:'center',
    marginBottom:100,
  }
})