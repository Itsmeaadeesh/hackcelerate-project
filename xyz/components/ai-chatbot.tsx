"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, UserIcon, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

// Mock AI responses for demo purposes
const mockResponses: Record<string, string> = {
  wheat:
    "Wheat is a major crop in India. The current market price ranges from ₹1,800 to ₹2,200 per quintal depending on the quality and location. The MSP (Minimum Support Price) for wheat is ₹2,015 per quintal for the 2024-25 season.",
  rice: "Rice cultivation requires good irrigation. The current market price for common rice varieties ranges from ₹1,600 to ₹2,400 per quintal. For premium varieties like Basmati, prices can go up to ₹4,000 per quintal. The MSP for common paddy is ₹2,183 per quintal.",
  fertilizer:
    "For balanced soil nutrition, use a combination of organic and chemical fertilizers. NPK (Nitrogen, Phosphorus, Potassium) ratios should be based on soil tests. Consider using biofertilizers like Rhizobium, Azotobacter, and PSB for sustainable farming.",
  weather:
    "Based on the latest forecasts, the monsoon is expected to be normal this year with well-distributed rainfall. June-September rainfall is predicted to be 103% of the long-period average. Prepare your fields accordingly and consider crop varieties suitable for the expected conditions.",
  scheme:
    "Several government schemes are available for farmers including PM-KISAN (₹6,000 annual direct benefit transfer), Soil Health Card Scheme (free soil testing), and PMFBY (crop insurance). Visit your local agriculture office or check the official websites for application details.",
  default:
    "I'm your HariBhari farming assistant. I can help you with information about crops, weather forecasts, market prices, soil health, and government schemes. What specific information are you looking for today?",
}

export function AIChatbot() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: t("chatbot.welcome") || "Welcome to HariBhari AI Assistant. How can I help you today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        ...prev[0],
        content: t("chatbot.welcome") || "Welcome to HariBhari AI Assistant. How can I help you today?",
      },
      ...prev.slice(1),
    ])
  }, [language, t])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = mockResponses.default

      // Simple keyword matching for demo purposes
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("wheat") || lowercaseInput.includes("गेहूं") || lowercaseInput.includes("ਕਣਕ")) {
        responseContent = mockResponses.wheat
      } else if (
        lowercaseInput.includes("rice") ||
        lowercaseInput.includes("चावल") ||
        lowercaseInput.includes("ਚਾਵਲ")
      ) {
        responseContent = mockResponses.rice
      } else if (
        lowercaseInput.includes("fertilizer") ||
        lowercaseInput.includes("खाद") ||
        lowercaseInput.includes("ਖਾਦ")
      ) {
        responseContent = mockResponses.fertilizer
      } else if (
        lowercaseInput.includes("weather") ||
        lowercaseInput.includes("मौसम") ||
        lowercaseInput.includes("ਮੌਸਮ")
      ) {
        responseContent = mockResponses.weather
      } else if (
        lowercaseInput.includes("scheme") ||
        lowercaseInput.includes("योजना") ||
        lowercaseInput.includes("ਯੋਜਨਾ")
      ) {
        responseContent = mockResponses.scheme
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Focus the input after setting the suggestion
    const inputElement = document.getElementById("chat-input")
    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <Card className="chatbot-container w-full max-w-md mx-auto h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-green-600" />
          {t("chatbot.title") || "AI Farming Assistant"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[350px] px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pt-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "chatbot-message",
                  message.role === "user" ? "chatbot-message-user" : "chatbot-message-bot",
                )}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 mt-1 shrink-0" />
                  ) : (
                    <UserIcon className="h-5 w-5 mt-1 shrink-0" />
                  )}
                  <div>{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message chatbot-message-bot">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <div>{t("chatbot.loading") || "Thinking..."}</div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="flex gap-2">
            <Input
              id="chat-input"
              placeholder={t("chatbot.placeholder") || "Ask me anything about farming..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">{t("chatbot.send") || "Send"}</span>
            </Button>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t("chatbot.suggestions") || "Try asking about:"}:</p>
            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleSuggestionClick(t("chatbot.suggestion1") || "What is the current wheat price?")}
              >
                {t("chatbot.suggestion1") || "What is the current wheat price?"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleSuggestionClick(t("chatbot.suggestion2") || "Tell me about fertilizers")}
              >
                {t("chatbot.suggestion2") || "Tell me about fertilizers"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleSuggestionClick(t("chatbot.suggestion3") || "Weather forecast")}
              >
                {t("chatbot.suggestion3") || "Weather forecast"}
              </Button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
