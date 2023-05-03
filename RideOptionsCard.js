import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: require('../assets/UberX.png')
  },
  {
    id: 'Uber-XL-456',
    title: 'UberXL',
    multiplier: 1.2,
    image: require('../assets/UberXL.png')
  },{
    id: 'Uber-Lux-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: require('../assets/Lux.png')
  },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      className='bg-white flex-grow'
    >
      <View >
        <TouchableOpacity 
        onPress={() => navigation.navigate('NavigateCard')}
        className='absolute top-3 left-5 z-50 p-3 rounded-full'
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text className='text-center py-5 text-xl'>Select a ride - {travelTimeInformation?.distance.text}</Text>
      </View>

      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={ ({item: {title, image, id, multiplier}, item}) => (
          <TouchableOpacity 
          onPress={()=> setSelected(item)}
          className={`flex-row items-center justify-between px-10 ${id===selected?.id && 'bg-gray-200'}`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={image}
            />
            <View className='-ml-6'>
              <Text className='text-xl font-semibold'>{title}</Text>
              <Text>{travelTimeInformation?.duration.value} Travel Time</Text>
            </View>
            <Text className='text-xl'>
              
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
              )
              }

            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity disabled={!selected} className={`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text className='text-center text-white text-xl' >Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard