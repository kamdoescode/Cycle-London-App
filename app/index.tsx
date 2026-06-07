import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { HomeScreen } from '../components/HomeScreen'
import { OnboardingModal } from '../components/OnboardingModal'
import { useProfile } from '../hooks/useProfile'
import { ConfidenceLevel } from '../types/index'

// Main entry point of the app. It manages the onboarding flow and displays the home screen once the profile is set up.
export default function Index() {
  const { profile, isLoading, hasCompletedOnboarding, saveProfile } = useProfile()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  async function handleOnboardingComplete(
    name: string,
    confidenceLevel: ConfidenceLevel
  ): Promise<void> {
    await saveProfile(name, confidenceLevel)
  }

  return (
    <>
      <OnboardingModal
        visible={!hasCompletedOnboarding}
        onComplete={handleOnboardingComplete}
      />
      {profile && <HomeScreen profile={profile} />}
    </>
  )
}
