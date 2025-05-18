"use client"

import { useState, useEffect } from "react"
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Video, FileText, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface LearningResource {
  id: string
  title: string
  description: string
  language: string
  type: "video" | "article" | "pdf"
  topic: string
  link: string
  thumbnail?: string
}

export function LearningResources() {
  const [resources, setResources] = useState<LearningResource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [topics, setTopics] = useState<string[]>([])
  const { language } = useLanguage()

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // First try to get resources in the user's selected language
        let q = query(collection(db, "learningResources"), where("language", "==", language))

        let querySnapshot = await getDocs(q)
        const resourceData: LearningResource[] = []

        // If no resources in the selected language, fall back to English
        if (querySnapshot.empty && language !== "en") {
          q = query(collection(db, "learningResources"), where("language", "==", "en"))
          querySnapshot = await getDocs(q)
        }

        const uniqueTopics = new Set<string>()

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<LearningResource, "id">
          resourceData.push({
            id: doc.id,
            ...data,
          })
          uniqueTopics.add(data.topic)
        })

        setResources(resourceData)
        setTopics(Array.from(uniqueTopics).sort())
      } catch (error) {
        console.error("Error fetching learning resources:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [language])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTopic = selectedTopic ? resource.topic === selectedTopic : true

    return matchesSearch && matchesTopic
  })

  const videoResources = filteredResources.filter((r) => r.type === "video")
  const articleResources = filteredResources.filter((r) => r.type === "article")
  const pdfResources = filteredResources.filter((r) => r.type === "pdf")

  const renderResourceCard = (resource: LearningResource) => (
    <Card key={resource.id} className="overflow-hidden">
      {resource.thumbnail && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={resource.thumbnail || "/placeholder.svg"}
            alt={resource.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {resource.type === "video" ? (
              <Video className="h-3 w-3 mr-1" />
            ) : resource.type === "article" ? (
              <FileText className="h-3 w-3 mr-1" />
            ) : (
              <BookOpen className="h-3 w-3 mr-1" />
            )}
            {resource.type}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <Badge variant="secondary">{resource.topic}</Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Globe className="h-3 w-3 mr-1" />
            {resource.language === "en"
              ? "English"
              : resource.language === "hi"
                ? "हिंदी"
                : resource.language === "pa"
                  ? "ਪੰਜਾਬੀ"
                  : resource.language === "ta"
                    ? "தமிழ்"
                    : resource.language === "te"
                      ? "తెలుగు"
                      : resource.language}
          </div>
        </div>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-sm font-medium text-green-600 hover:underline"
        >
          {resource.type === "video" ? "Watch Video" : resource.type === "article" ? "Read Article" : "View PDF"}
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </CardContent>
    </Card>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-600" />
          <CardTitle>Learning & Awareness</CardTitle>
        </div>
        <CardDescription>Educational resources to improve your farming knowledge and skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading resources...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="pdfs">PDFs</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map(renderResourceCard)}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              {videoResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videoResources.map(renderResourceCard)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No video resources found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="articles">
              {articleResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articleResources.map(renderResourceCard)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No article resources found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pdfs">
              {pdfResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pdfResources.map(renderResourceCard)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No PDF resources found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-lg font-medium">No resources found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
