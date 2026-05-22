"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { messages } from "@/lib/mock-data"
import { Search, Mail, MailOpen, AlertCircle, AlertTriangle, Flag, Send, Paperclip, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

const priorityConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  critical: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
  urgent: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
  routine: { icon: Flag, color: "text-blue-600", bg: "bg-blue-100" },
}

const categoryColors: Record<string, "info" | "secondary" | "success" | "warning"> = {
  clinical: "info",
  administrative: "secondary",
  lab: "success",
  billing: "warning",
}

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const selected = messages.find(m => m.id === selectedId) || null
  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    return !q || m.subject.toLowerCase().includes(q) || m.from.toLowerCase().includes(q) || (m.content && m.content.toLowerCase().includes(q))
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">{messages.filter(m => !m.read).length} unread</p>
        </div>
        <Button className="gap-2"><Send className="h-4 w-4" /> New Message</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        <Card className="lg:col-span-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <ScrollArea className="h-full">
              <div className="divide-y">
                {filtered.map(m => {
                  const priority = priorityConfig[m.priority]
                  const PriorityIcon = priority.icon
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedId(m.id)}
                      className={cn(
                        "w-full text-left p-3 transition-colors hover:bg-muted/50",
                        selectedId === m.id && "bg-muted",
                        !m.read && "bg-blue-50/50"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <div className={cn("p-1 rounded-full shrink-0 mt-0.5", priority.bg)}>
                          <PriorityIcon className={cn("h-3 w-3", priority.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={cn("text-sm truncate", !m.read && "font-semibold")}>{m.from}</p>
                            <span className="text-xs text-muted-foreground shrink-0">{new Date(m.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                          <p className={cn("text-sm truncate", !m.read && "font-medium")}>{m.subject}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{m.content?.slice(0, 80)}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Badge variant={categoryColors[m.category]} className="text-[10px] py-0">{m.category}</Badge>
                            {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          {selected ? (
            <>
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{selected.subject}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">{selected.from}</span>
                      {" → "}
                      <span>{selected.to}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={categoryColors[selected.category]} className="text-[10px]">{selected.category}</Badge>
                      {selected.patientName && (
                        <Badge variant="secondary" className="text-[10px]">Patient: {selected.patientName}</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(selected.timestamp).toLocaleString("en-US", {
                          weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MailOpen className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1 h-full">
                <div className="p-6">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.content}</p>
                </div>
                <div className="p-4 border-t mt-auto">
                  <div className="flex gap-2">
                    <Input placeholder="Type a reply..." className="flex-1" />
                    <Button className="gap-2"><Send className="h-4 w-4" /> Reply</Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Select a message</p>
                <p className="text-sm">Choose a message from the list to read it</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
