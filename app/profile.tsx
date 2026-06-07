import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ProfileScreen } from '../components/ProfileScreen'
import { useProfile } from '../hooks/useProfile'

//uses the useProfile hook to load the user's profile and displays a loading indicator while fetching. 
// Once loaded, it renders the ProfileScreen with the profile data.
export default function ProfileRoute() {
  const { profile, isLoading } = useProfile()

  if (isLoading || !profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return <ProfileScreen profile={profile} />
}
