"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { appointments, patients } from "@/lib/mock-data"
import { Calendar, Clock, Users, Stethoscope, Award, FileText, Mail, Phone, MapPin } from "lucide-react"

export default function ProfilePage() {
  const doctorAppts = appointments.filter(a => a.doctorName === "Dr. Vibhanshu Buldeo")
  const doctorPatients = patients.filter(p => p.provider === "Dr. Vibhanshu Buldeo")
  const todayAppts = doctorAppts.filter(a => a.date === new Date().toISOString().slice(0, 10))

  const stats = [
    { label: "Total Patients", value: doctorPatients.length, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Today's Appointments", value: todayAppts.length, icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Active Cases", value: doctorPatients.filter(p => p.status === "active").length, icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Years Experience", value: 12, icon: Award, color: "text-amber-600", bg: "bg-amber-100" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">VB</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Dr. Vibhanshu Buldeo</h2>
            <p className="text-sm text-muted-foreground">Internal Medicine Physician</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant="success" className="text-[10px">Active</Badge>
              <Badge variant="info" className="text-[10px]">MD, FACC</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-3 text-left text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>v.buldeo@medica-health.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 111-2222</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Suite 210, Medica Healthcare</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>NPI: 1234567890</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="text-left">
              <p className="text-xs font-medium text-muted-foreground mb-2">Specialties</p>
              <div className="flex flex-wrap gap-1">
                {["Internal Medicine", "Primary Care", "Preventive Medicine"].map(s => (
                  <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="text-left mt-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Languages</p>
              <div className="flex flex-wrap gap-1">
                {["English", "Spanish"].map(l => (
                  <Badge key={l} variant="secondary" className="text-[10px]">{l}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map(s => {
              const Icon = s.icon
              return (
                <Card key={s.label}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg", s.bg)}>
                      <Icon className={cn("h-6 w-6", s.color)} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {todayAppts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No appointments scheduled for today.</p>
              ) : (
                <div className="space-y-2">
                  {todayAppts.map(a => (
                    <div key={a.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                      <div className="flex flex-col items-center min-w-[48px]">
                        <span className="text-sm font-bold">{a.time}</span>
                        <span className="text-xs text-muted-foreground">{a.duration}min</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {a.patientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{a.patientName}</p>
                        <p className="text-xs text-muted-foreground">{a.type} &middot; {a.location}</p>
                      </div>
                      <Badge variant={a.status === "confirmed" ? "info" : "default"} className="text-[10px]">{a.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doctorAppts.slice(0, 5).map(a => (
                  <div key={a.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{a.patientName} &mdash; {a.type}</p>
                      <p className="text-xs text-muted-foreground">{a.date} at {a.time} &middot; {a.department}</p>
                    </div>
                    <Badge variant={a.status === "completed" ? "success" : "default"} className="text-[10px]">{a.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Patient Panel Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Patients</span>
                    <span className="font-medium">{doctorPatients.filter(p => p.status === "active").length}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New Patients (This Month)</span>
                    <span className="font-medium">{doctorPatients.filter(p => p.status === "new").length}</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Follow-up Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
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
