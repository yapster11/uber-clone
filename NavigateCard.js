import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from './NavFavorites'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
   const dispatch = useDispatch();
   const navigation = useNavigation();

  return (
    <SafeAreaView
        edges={['bottom', 'left', 'right']}
        className='bg-white flex-1'
    >
        <Text className='py-5 text-center text-xl'>Good morning!</Text>
      <View className='border-t border-gray-200 flex-shrink'>
        <View>
            <GooglePlacesAutocomplete 
                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                fetchDetails={true}
                placeholder='Where to?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                minLength={2}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        flex: 0,
                        paddingTop: 20,
                        backgroundColor: 'white'
                    },
                    textInput: {
                        fontSize: 18,
                        backgroundColor: '#DDDDDF',
                        borderRadius: 0,

                    },
                    textInputContainer: {
                        paddingHorizontal: 20,
                        paddingBottom: 0
                    }
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    navigation.navigate('RideOptionsCard')
                }}
            />
        </View>
        <NavFavorites />
      </View>

      <View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'>
        <TouchableOpacity className='flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full'
            onPress={() => navigation.navigate('RideOptionsCard')}
        >
            <Icon name='car' type='font-awesome' color='white' size={16} />
            <Text className='text-white text-center'>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex flex-row justify-between w-24 px-4 py-3 rounded-full'>
            <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
            <Text className='text-center'>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard