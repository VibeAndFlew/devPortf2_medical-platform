"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { appointments } from "@/lib/mock-data"
import { Search, Calendar, Plus, Clock, Video, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

function getStatusBadge(status: string) {
  const map: Record<string, "success" | "warning" | "info" | "destructive" | "default"> = {
    completed: "success",
    confirmed: "info",
    scheduled: "default",
    in_progress: "warning",
    cancelled: "destructive",
    no_show: "destructive",
  }
  return map[status] || "default"
}

function getTypeColor(type: string) {
  const map: Record<string, string> = {
    checkup: "bg-blue-100 text-blue-800 border-blue-200",
    followup: "bg-purple-100 text-purple-800 border-purple-200",
    emergency: "bg-red-100 text-red-800 border-red-200",
    surgery: "bg-orange-100 text-orange-800 border-orange-200",
    consultation: "bg-teal-100 text-teal-800 border-teal-200",
    lab: "bg-gray-100 text-gray-800 border-gray-200",
  }
  return map[type] || "bg-gray-100 text-gray-800"
}

function groupByDate(appts: typeof appointments) {
  const groups: Record<string, typeof appointments> = {}
  appts.forEach(a => {
    if (!groups[a.date]) groups[a.date] = []
    groups[a.date].push(a)
  })
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}

export default function AppointmentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = appointments.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = !q || a.patientName.toLowerCase().includes(q) || a.doctorName.toLowerCase().includes(q)
    const matchStatus = statusFilter === "all" || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const grouped = groupByDate(filtered)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-muted-foreground">{appointments.length} total appointments</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Schedule Appointment</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patient or doctor..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Cardiology">Cardiology</SelectItem>
            <SelectItem value="Pulmonology">Pulmonology</SelectItem>
            <SelectItem value="Orthopedics">Orthopedics</SelectItem>
            <SelectItem value="Endocrinology">Endocrinology</SelectItem>
            <SelectItem value="Neurology">Neurology</SelectItem>
            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
            <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {grouped.map(([date, appts]) => (
        <div key={date}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">
              {new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </h3>
            <Badge variant="secondary" className="text-[10px]">{appts.length} appointment{appts.length > 1 ? "s" : ""}</Badge>
          </div>
          <div className="space-y-2">
            {appts.map(a => (
              <Card key={a.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[60px]">
                      <span className="text-lg font-bold">{a.time}</span>
                      <span className="text-xs text-muted-foreground">{a.duration} min</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{a.patientName}</p>
                          <p className="text-xs text-muted-foreground">{a.doctorName} &middot; {a.department}</p>
                        </div>
                        <Badge variant={getStatusBadge(a.status)} className="text-[10px]">{a.status.replace("_", " ")}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border", getTypeColor(a.type))}>{a.type}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</span>
                      </div>
                      {a.notes && <p className="text-xs text-muted-foreground mt-2">{a.notes}</p>}
                      {a.vitals && (
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>BP: {a.vitals.bp}</span>
                          <span>HR: {a.vitals.hr}</span>
                          <span>Temp: {a.vitals.temp}°F</span>
                          <span>Weight: {a.vitals.weight} lbs</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      {a.status === "in_progress" && <Button size="sm" variant="default" className="text-xs h-8 gap-1"><Video className="h-3 w-3" />Join</Button>}
                      {a.status === "scheduled" || a.status === "confirmed" ? (
                        <>
                          <Button size="sm" variant="outline" className="text-xs h-8">Reschedule</Button>
                          <Button size="sm" variant="ghost" className="text-xs h-8 text-destructive">Cancel</Button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {grouped.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No appointments found.</div>
      )}
    </div>
  )
}
