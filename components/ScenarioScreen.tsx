import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useScenario } from '../hooks/useScenario'
import { Option, OptionId } from '../types/index'

export function ScenarioScreen() {
  const router = useRouter()
  const {
    currentScenario,
    currentIndex,
    totalScenarios,
    answerState,
    selectedOption,
    isComplete,
    selectOption,
    nextScenario,
    reset,
  } = useScenario()

  // Animate options fading in after a short delay
  const optionsOpacity = new Animated.Value(0)

  useEffect(() => {
    optionsOpacity.setValue(0)
    const timer = setTimeout(() => {
      Animated.timing(optionsOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }, 800) // options appear 0.8s after scenario loads
    return () => clearTimeout(timer)
  }, [currentIndex])

  // When all scenarios are done, go back home
  useEffect(() => {
    if (isComplete) {
      reset()
      router.replace('/')
    }
  }, [isComplete])

  function getOptionStyle(id: OptionId) {
    if (answerState === 'unanswered') return styles.option
    if (id === currentScenario.correctId) return [styles.option, styles.optionCorrect]
    if (id === selectedOption && answerState === 'incorrect') return [styles.option, styles.optionWrong]
    return [styles.option, styles.optionDimmed]
  }

  function getOptionTextStyle(id: OptionId) {
    if (answerState === 'unanswered') return styles.optionText
    if (id === currentScenario.correctId) return [styles.optionText, styles.optionTextCorrect]
    if (id === selectedOption && answerState === 'incorrect') return [styles.optionText, styles.optionTextWrong]
    return [styles.optionText, styles.optionTextDimmed]
  }

  return (
    <ImageBackground
      source={require('../assets/images/london-fields1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => { reset(); router.replace('/') }}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Progress */}
        <Text style={styles.progress}>
          Scenario {currentIndex + 1} of {totalScenarios} · Hackney
        </Text>

        {/* Situation box */}
        <View style={styles.situationBox}>
          <Text style={styles.scenarioTitle}>{currentScenario.title}</Text>
          <Text style={styles.situationText}>{currentScenario.situation}</Text>
        </View>

        {/* Answer options — fade in after short delay */}
        <Animated.View style={{ opacity: optionsOpacity }}>
          <Text style={styles.chooseLabel}>What do you do?</Text>
          {currentScenario.options.map((option: Option) => (
            <TouchableOpacity
              key={option.id}
              style={getOptionStyle(option.id)}
              onPress={() => selectOption(option.id)}
              disabled={answerState !== 'unanswered'}
            >
              <Text style={styles.optionLetter}>{option.id.toUpperCase()}</Text>
              <Text style={getOptionTextStyle(option.id)}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Feedback — shown after answering */}
        {answerState !== 'unanswered' && (
          <View style={[
            styles.feedbackBox,
            answerState === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong
          ]}>
            <Text style={styles.feedbackTitle}>
              {answerState === 'correct' ? 'Correct!' : 'Not quite'}
            </Text>
            <Text style={styles.feedbackText}>{currentScenario.explanation}</Text>

            <TouchableOpacity style={styles.nextButton} onPress={nextScenario}>
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 === totalScenarios ? 'Finish' : 'Next scenario →'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

          </ScrollView>
      </SafeAreaView>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 15,
    color: 'black',
  },
  progress: {
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 6,
    marginBottom: 15,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignSelf: 'flex-start',
  },
  sceneContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  sceneImage: {
    width: '100%',
    height: 200,
  },
  situationBox: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  situationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  chooseLabel: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
  },
  optionCorrect: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  optionWrong: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  optionDimmed: {
    opacity: 0.4,
  },
  optionLetter: {
    fontWeight: '700',
    fontSize: 13,
    color: '#aaa',
    marginRight: 12,
    minWidth: 16,
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1a1a1a',
    flex: 1,
  },
  optionTextCorrect: {
    color: '#15803d',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#dc2626',
  },
  optionTextDimmed: {
    color: '#aaa',
  },
  feedbackBox: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)'
  },
  feedbackCorrect: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  feedbackWrong: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  feedbackTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#333',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
})
