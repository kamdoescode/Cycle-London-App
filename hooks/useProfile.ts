import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProfile, ConfidenceLevel } from '../types/index'

const STORAGE_KEY = 'user_profile'

// Custom hook to manage user profile state, including loading/saving from AsyncStorage and onboarding completion status.
type UseProfileReturn = {
  profile: UserProfile | null
  isLoading: boolean
  hasCompletedOnboarding: boolean
  saveProfile: (name: string, confidenceLevel: ConfidenceLevel) => Promise<void>
}

// Manages user profile state, including loading/saving from AsyncStorage and onboarding completion status.
export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Load profile from AsyncStorage on mount and update loading state accordingly.
  useEffect(() => {
    async function loadProfile(): Promise<void> {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          setProfile(JSON.parse(stored))
        }
      } catch (e) {
        console.error('Failed to load profile', e)
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [])


  async function saveProfile(
    name: string,
    confidenceLevel: ConfidenceLevel
  ): Promise<void> {
    const newProfile: UserProfile = { name, confidenceLevel }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile))
      setProfile(newProfile)
    } catch (e) {
      console.error('Failed to save profile', e)
    }
  }

  return {
    profile,
    isLoading,
    hasCompletedOnboarding: profile !== null,
    saveProfile,
  }
}
