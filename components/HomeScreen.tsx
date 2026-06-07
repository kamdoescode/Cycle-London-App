import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { useRouter } from 'expo-router'
import { UserProfile } from '../types/index'
import { Ionicons } from '@expo/vector-icons'

// The HomeScreen component displays a welcome message, a map with an unlocked zone, and a button to access the profile. It receives the user's profile as a prop.
type Props = {
  profile: UserProfile
}

export function HomeScreen({ profile }: Props) {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {profile.name}!</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person" size={20} color="1a1a1a" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subheading}>Ready to ride?</Text>

      <View style={styles.mapContainer}>
        <ScrollView
          style={styles.mapContainer}
          contentContainerStyle={styles.mapContent}
          maximumZoomScale={4}
          minimumZoomScale={1}
          bouncesZoom={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
      >
      <Image
        source={require('../assets/images/london-map.png')}
        style={styles.mapImage}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.hackneyZone}
        onPress={() => router.push('/scenario')}
      >
        <Text style={styles.zoneLabel}>Hackney</Text>
        <Text style={styles.zoneSubLabel}>Zone 1 — Tap to start</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>

      <Text style={styles.hint}>
        Tap the unlocked zone on the map to begin
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#E0DAD0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subheading: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  mapContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: '75%',
    backgroundColor: '#0069B8',
  },
  mapContent: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  hackneyZone: {
    position: 'absolute',
    top: 180,
    left: '40%',
    width: 80,
    height: 40,
    backgroundColor: 'rgba(74, 222, 128, 0.75)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  zoneLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#14532d',
  },
  zoneSubLabel: {
    fontSize: 10,
    color: '#14532d',
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
    fontSize: 13,
    color: '#aaa',
    marginTop: 16,
    paddingHorizontal: 20,
  },
})
