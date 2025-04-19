"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ChevronRight, Award, RefreshCw } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: string
}

interface QuizProps {
  category?: string
  difficulty?: "easy" | "medium" | "hard"
  limit?: number
}

export default function QuizSystem({ category, difficulty, limit = 5 }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchQuestions = () => {
      setLoading(true)

      // Sample quiz questions
      const allQuestions: QuizQuestion[] = [
        {
          id: "q1",
          question: "What is the closest star to Earth?",
          options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
          correctAnswer: 2,
          explanation:
            "The Sun is the closest star to Earth, at an average distance of about 93 million miles (150 million kilometers).",
          difficulty: "easy",
          category: "stars",
        },
        {
          id: "q2",
          question: "Which planet has the Great Red Spot?",
          options: ["Mars", "Venus", "Jupiter", "Saturn"],
          correctAnswer: 2,
          explanation:
            "Jupiter's Great Red Spot is a persistent high-pressure region in the atmosphere, producing an anticyclonic storm that has existed for at least 400 years.",
          difficulty: "easy",
          category: "planets",
        },
        {
          id: "q3",
          question: "What is a black hole?",
          options: [
            "A hole in space where light can pass through",
            "A region of spacetime where gravity is so strong that nothing can escape from it",
            "A theoretical concept with no observational evidence",
            "The center of every galaxy",
          ],
          correctAnswer: 1,
          explanation:
            "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.",
          difficulty: "medium",
          category: "black-holes",
        },
        {
          id: "q4",
          question: "What is the name of our galaxy?",
          options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
          correctAnswer: 1,
          explanation:
            "Our galaxy is called the Milky Way. It's a spiral galaxy containing our solar system and billions of other stars.",
          difficulty: "easy",
          category: "galaxies",
        },
        {
          id: "q5",
          question: "What causes the phases of the Moon?",
          options: [
            "Earth's shadow on the Moon",
            "The Moon's rotation on its axis",
            "The relative positions of the Sun, Earth, and Moon",
            "Changes in the Moon's distance from Earth",
          ],
          correctAnswer: 2,
          explanation:
            "The phases of the Moon are caused by the relative positions of the Sun, Earth, and Moon. As the Moon orbits Earth, we see different portions of the illuminated side.",
          difficulty: "medium",
          category: "moon",
        },
        {
          id: "q6",
          question: "What is dark matter?",
          options: [
            "Matter that absorbs all light",
            "A theoretical type of matter that doesn't interact with the electromagnetic force but would still have gravitational effects",
            "The matter inside black holes",
            "Matter that exists in other dimensions",
          ],
          correctAnswer: 1,
          explanation:
            "Dark matter is a theoretical type of matter that doesn't interact with the electromagnetic force but would still have gravitational effects. It has not been directly observed, but its existence would explain many astronomical observations.",
          difficulty: "hard",
          category: "dark-matter",
        },
        {
          id: "q7",
          question: "Which space telescope was launched in 1990 and remains in operation?",
          options: [
            "James Webb Space Telescope",
            "Hubble Space Telescope",
            "Spitzer Space Telescope",
            "Chandra X-ray Observatory",
          ],
          correctAnswer: 1,
          explanation:
            "The Hubble Space Telescope was launched in 1990 and remains one of the largest and most versatile space telescopes in operation.",
          difficulty: "medium",
          category: "telescopes",
        },
        {
          id: "q8",
          question: "What is a light-year?",
          options: [
            "The distance light travels in one Earth year",
            "The time it takes for light to reach Earth from the Sun",
            "The brightness of a star as seen from Earth",
            "The lifespan of a small star",
          ],
          correctAnswer: 0,
          explanation:
            "A light-year is the distance that light travels in one Earth year, approximately 5.88 trillion miles (9.46 trillion kilometers).",
          difficulty: "easy",
          category: "astronomy-basics",
        },
        {
          id: "q9",
          question: "Which of these is NOT a type of galaxy?",
          options: ["Elliptical", "Spiral", "Irregular", "Cylindrical"],
          correctAnswer: 3,
          explanation:
            "The main types of galaxies are elliptical, spiral, and irregular. 'Cylindrical' is not a recognized galaxy type.",
          difficulty: "medium",
          category: "galaxies",
        },
        {
          id: "q10",
          question: "What is the Oort Cloud?",
          options: [
            "A nebula near the center of our galaxy",
            "A theoretical cloud of predominantly icy planetesimals at the edge of our solar system",
            "A type of weather pattern on gas giants",
            "A cluster of stars in the Milky Way",
          ],
          correctAnswer: 1,
          explanation:
            "The Oort Cloud is a theoretical cloud of predominantly icy planetesimals believed to surround the Sun at distances ranging from 2,000 to 100,000 astronomical units.",
          difficulty: "hard",
          category: "solar-system",
        },
      ]

      // Filter questions based on props
      let filteredQuestions = [...allQuestions]

      if (category) {
        filteredQuestions = filteredQuestions.filter((q) => q.category === category)
      }

      if (difficulty) {
        filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
      }

      // Shuffle and limit
      const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, limit)

      setQuestions(selected)
      setLoading(false)
    }

    fetchQuestions()
  }, [category, difficulty, limit])

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return

    setSelectedOption(optionIndex)
    setIsAnswered(true)

    if (optionIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)

    // Shuffle questions
    setQuestions([...questions].sort(() => 0.5 - Math.random()))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">No questions available for the selected criteria.</p>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <ScrollReveal className="bg-black/40 rounded-lg border border-purple-500/20 p-6 md:p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/20 mb-4">
            <Award className="h-10 w-10 text-purple-400" />
          </div>

          <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-gray-300 mb-6">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>

          <div className="mb-8">
            {percentage >= 80 ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm px-3 py-1">Excellent!</Badge>
            ) : percentage >= 60 ? (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-3 py-1">Good Job!</Badge>
            ) : (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-sm px-3 py-1">
                Keep Learning!
              </Badge>
            )}
          </div>

          <Button onClick={restartQuiz} className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </ScrollReveal>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Badge variant="purple">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Badge>
        <Badge
          variant={
            currentQuestion.difficulty === "easy"
              ? "outline"
              : currentQuestion.difficulty === "medium"
                ? "secondary"
                : "default"
          }
        >
          {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
        </Badge>
      </div>

      <ScrollReveal>
        <h3 className="text-xl font-bold mb-6">{currentQuestion.question}</h3>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                isAnswered
                  ? index === currentQuestion.correctAnswer
                    ? "bg-green-500/20 border-green-500/50"
                    : selectedOption === index
                      ? "bg-red-500/20 border-red-500/50"
                      : "bg-black/20 border-gray-700"
                  : "bg-black/20 border-purple-500/30 hover:bg-purple-500/10"
              }`}
            >
              <div className="flex items-center">
                {isAnswered && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                )}
                {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                )}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollReveal>

      {isAnswered && (
        <ScrollReveal direction="up" className="mb-6">
          <div
            className={`p-4 rounded-lg ${
              selectedOption === currentQuestion.correctAnswer
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            <p className="font-medium mb-2">
              {selectedOption === currentQuestion.correctAnswer ? "Correct!" : "Incorrect!"}
            </p>
            <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
          </div>
        </ScrollReveal>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">
            Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
          </p>
        </div>

        {isAnswered && (
          <Button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-700">
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
