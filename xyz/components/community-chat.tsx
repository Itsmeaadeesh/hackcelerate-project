"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
  id: string
  uid: string
  name: string
  region: string
  message: string
  timestamp: any
}

export function CommunityChat() {
  const [message, setMessage] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [regions, setRegions] = useState<string[]>([])
  const { user, userData } = useAuth()

  useEffect(() => {
    const q = query(collection(db, "communityPosts"), orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData: Post[] = []
      const uniqueRegions = new Set<string>()

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Post, "id">
        postData.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.() || new Date(),
        })
        uniqueRegions.add(data.region)
      })

      setPosts(postData)
      setRegions(Array.from(uniqueRegions).sort())
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !user || !userData) return

    try {
      await addDoc(collection(db, "communityPosts"), {
        uid: user.uid,
        name: userData.name,
        region: userData.region,
        message: message.trim(),
        timestamp: new Date(),
      })

      setMessage("")
    } catch (error) {
      console.error("Error adding post:", error)
    }
  }

  const filteredPosts = selectedRegion ? posts.filter((post) => post.region === selectedRegion) : posts

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          <CardTitle>Farmer Community</CardTitle>
        </div>
        <CardDescription>Connect with farmers across India and share your knowledge</CardDescription>
        <div className="mt-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex gap-3">
                <Avatar>
                  <AvatarFallback className="bg-green-100 text-green-800">{post.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{post.name}</p>
                    <span className="text-xs text-muted-foreground">{post.region}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(post.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 rounded-md bg-muted p-3">
                    <p className="text-sm whitespace-pre-wrap">{post.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-sm text-muted-foreground">Be the first to start the conversation!</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <Textarea
              placeholder="Share your farming experience or ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none"
              disabled={!user}
            />
            <Button type="submit" size="icon" disabled={!message.trim() || !user}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          {!user && (
            <p className="text-xs text-muted-foreground mt-2">Please sign in to participate in the community chat.</p>
          )}
        </form>
      </CardFooter>
    </Card>
  )
}
