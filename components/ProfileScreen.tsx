import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { UserProfile, ConfidenceLevel } from '../types/index'


type Props = {
  profile: UserProfile
}

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  never_cycled:    "Never cycled on a road",
  ridden_before:   "Ridden before, not in London",
  cycle_sometimes: "Cycle occasionally",
  cycle_regularly: "Cycle regularly",
}

export function ProfileScreen({ profile }: Props) {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Profile</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Name</Text>
          <Text style={styles.rowValue}>{profile.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Confidence level</Text>
          <Text style={styles.rowValue}>
            {CONFIDENCE_LABELS[profile.confidenceLevel]}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Zone unlocked</Text>
          <Text style={styles.rowValue}>Zone 1 — Hackney</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 15,
    color: '#555',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 28,
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
})
