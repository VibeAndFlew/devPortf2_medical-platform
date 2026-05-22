"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { appointments, patients, medicalRecords, prescriptions, messages, telemedicineSessions } from "@/lib/mock-data"
import { Users, Calendar, FlaskRoundIcon as Flask, Pill, Video, MessageSquare, AlertTriangle, ArrowRight, Clock } from "lucide-react"

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

function getAppointmentTypeBadge(type: string) {
  const map: Record<string, string> = {
    checkup: "bg-blue-100 text-blue-800",
    followup: "bg-purple-100 text-purple-800",
    emergency: "bg-red-100 text-red-800",
    surgery: "bg-orange-100 text-orange-800",
    consultation: "bg-teal-100 text-teal-800",
    lab: "bg-gray-100 text-gray-800",
  }
  return map[type] || "bg-gray-100 text-gray-800"
}

export default function Dashboard() {
  const todayStr = new Date().toISOString().slice(0, 10)
  const todayAppts = appointments.filter(a => a.date === todayStr && a.status !== "cancelled")
  const pendingLabs = medicalRecords.filter(r => r.status === "preliminary" || r.status === "amended")
  const activeRx = prescriptions.filter(p => p.status === "active")
  const todayTelemedicine = telemedicineSessions.filter(t => t.date === todayStr)
  const unreadMessages = messages.filter(m => !m.read)
  const criticalAlerts = messages.filter(m => m.priority === "critical" && !m.read)
  const recentPatients = patients.slice(0, 5)

  const kpis = [
    { label: "Total Patients", value: patients.length, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Today's Appointments", value: todayAppts.length, icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Pending Lab Results", value: pendingLabs.length, icon: Flask, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Active Prescriptions", value: activeRx.length, icon: Pill, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Telemedicine Today", value: todayTelemedicine.length, icon: Video, color: "text-cyan-600", bg: "bg-cyan-100" },
    { label: "Unread Messages", value: unreadMessages.length, icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-100" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Dr. Buldeo</h1>
          <p className="text-muted-foreground text-sm">Medica Healthcare Platform &mdash; {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info" className="text-xs">Live</Badge>
          <span className="text-xs text-muted-foreground">EHR System Connected</span>
        </div>
      </div>

      {criticalAlerts.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm text-destructive">Critical Alert{criticalAlerts.length > 1 ? "s" : ""}</p>
            {criticalAlerts.map(m => (
              <p key={m.id} className="text-sm text-red-700">{m.subject} &mdash; {m.content.slice(0, 120)}...</p>
            ))}
          </div>
          <Button variant="outline" size="sm" className="shrink-0 border-red-200 text-red-700 hover:bg-red-100">View Details</Button>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", kpi.bg)}>
                    <Icon className={cn("h-5 w-5", kpi.color)} />
                  </div>
                </div>
                <p className="text-2xl font-bold mt-3">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {todayAppts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No appointments scheduled for today.</p>
            ) : (
              <div className="space-y-3">
                {todayAppts.map(a => (
                  <div key={a.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center min-w-[48px]">
                      <span className="text-sm font-bold">{a.time}</span>
                      <span className="text-xs text-muted-foreground">{a.duration}min</span>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{a.patientName}</p>
                      <p className="text-xs text-muted-foreground">{a.doctorName} &middot; {a.department}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full", getAppointmentTypeBadge(a.type))}>{a.type}</span>
                        <Badge variant={getStatusBadge(a.status)} className="text-[10px] py-0">{a.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {(a.type === "consultation") && <Video className="h-4 w-4 text-primary" />}
                      {a.vitals && <span className="text-xs text-muted-foreground">BP {a.vitals.bp}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Patients</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentPatients.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.firstName} {p.lastName}</p>
                      <p className="text-xs text-muted-foreground">{p.mrn}</p>
                    </div>
                    <Badge variant={p.status === "active" ? "success" : p.status === "new" ? "info" : "secondary"} className="text-[10px]">{p.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pending Lab Results</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {pendingLabs.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">No pending results.</p>
              ) : (
                <div className="space-y-2">
                  {pendingLabs.slice(0, 4).map(r => (
                    <div key={r.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Flask className="h-4 w-4 text-amber-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.date} &middot; {r.provider}</p>
                      </div>
                      <Badge variant="warning" className="text-[10px]">{r.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
