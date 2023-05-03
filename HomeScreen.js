import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import NavOption from '../components/NavOption';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className='bg-white h-full'>
        <View className='p-5' >
            <Image source={require('../assets/spotify.png')}
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
            />

            <GooglePlacesAutocomplete 
                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                fetchDetails={true}
                placeholder='Where from?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                minLength={2}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                onPress={(data, details = null) => {
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    dispatch(setDestination(null))
                }}
            />

            <NavOption />
            <NavFavorites />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen