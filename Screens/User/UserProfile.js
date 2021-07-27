import React , {useContext , useState , useCallback, useEffect } from 'react';
import { View , Text , ScrollView , StyleSheet,Button } from 'react-native';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
 
  const context = useContext(AuthGlobal)
  const [userProfile , setUserProfile] = useState()

  useEffect(() => {
    if (
    context.stateUser.isAuthenticated === false ||
    context.stateUser.isAuthenticated === null 
   ) {
    props.navigation.navigate("Login")
  }

  AsyncStorage.getItem("jwt")
    .then((res) => {
      axios 
        .get(`${baseURL}users/${context.stateUser.user.sub}` , {
          headers:{Authorization:`Bearer${res}` },
        })
        .then((user) => setUserProfile(user.data))
    })
    .catch(function (error) {
      console.log(JSON.stringify(error))
    });

    return() => {
      setUserProfile();
    }
  },[context.stateUser.isAuthenticated])

/*
 .catch((reason: AxiosError) => {
    if (reason.response!.status === 400) {
      // Handle 400
    } else {
      // Handle else
    }
    console.log(reason.message)
  })
*/

  return (
   <Container style={styles.container}>
     <ScrollView contentContainerStyle={styles.subContainer}>
       <Text style={{fontSize: 30}}>
        {userProfile ? userProfile.name : "" }
       </Text>
       <View style={{marginTop:20}}>
        <Text style={{margin:10 , color:"red"}}>
          Email:{userProfile ? userProfile.email : ""}
        </Text>
        <Text style={{margin:10}}>
          Phone:{userProfile ? userProfile.phone : ""}
        </Text>
       </View>
       <View style={{marginTop:80}}>
        <Button title={"SignOut"} onPress={() =>[
          AsyncStorage.removeItem("jwt"),
          logoutUser(context.dispatch) 
        ]} />
       </View>
     </ScrollView>
   </Container>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center"
  },
  subContainer:{
    alignItems: 'center',
    marginTop:60
  }
});

export default UserProfile;