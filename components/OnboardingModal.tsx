import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { ConfidenceLevel } from '../types/index'

type Props = {
  visible: boolean
  onComplete: (name: string, confidenceLevel: ConfidenceLevel) => void
}

type ConfidenceOption = {
  id: ConfidenceLevel
  label: string
}

const CONFIDENCE_OPTIONS: ConfidenceOption[] = [
  { id: 'never_cycled',     label: "I've never cycled on a road" },
  { id: 'ridden_before',    label: "I've ridden before but not in London" },
  { id: 'cycle_sometimes',  label: 'I cycle occasionally' },
  { id: 'cycle_regularly',  label: 'I cycle regularly' },
]


export function OnboardingModal({ visible, onComplete }: Props) {
  const [name, setName] = useState<string>('')
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel | null>(null)

  function handleSubmit(): void {
    if (!name.trim() || !selectedConfidence) return
    onComplete(name.trim(), selectedConfidence)
  }

  const canSubmit = name.trim().length > 0 && selectedConfidence !== null

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.subheading}>
            Let's set up your profile before we get started.
          </Text>

          {/* Name input */}
          <Text style={styles.label}>Your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="done"
          />

          {/* Confidence level */}
          <Text style={styles.label}>How confident are you on a bike?</Text>
          {CONFIDENCE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selectedConfidence === option.id && styles.optionSelected,
              ]}
              onPress={() => setSelectedConfidence(option.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedConfidence === option.id && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            <Text style={styles.buttonText}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 28,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: '#1a1a1a',
    backgroundColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  optionTextSelected: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
