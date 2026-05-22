"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { patients } from "@/lib/mock-data"
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
]

const doctors = ["Dr. Vibhanshu Buldeo", "Dr. Emily Park", "Dr. Michael Torres", "Dr. Sarah Patel"]
const departments = ["Cardiology", "Pulmonology", "Orthopedics", "Endocrinology", "Neurology", "Pediatrics", "Internal Medicine", "Dermatology", "Rheumatology", "Oncology"]

export default function SchedulingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10))

  const adjustDate = (days: number) => {
    const d = new Date(selectedDate + "T00:00:00")
    d.setDate(d.getDate() + days)
    setSelectedDate(d.toISOString().slice(0, 10))
  }

  const patientOptions = patients.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName} (${p.mrn})` }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Schedule Management</h1>
          <p className="text-sm text-muted-foreground">Create and manage appointments</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Available Slots
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="w-44 h-8 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {doctors.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => adjustDate(-1)}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="min-w-[140px] text-center">{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => adjustDate(1)}><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-md border text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Click a time slot to create an appointment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date()
                  d.setDate(d.getDate() + i)
                  const dateStr = d.toISOString().slice(0, 10)
                  const dayName = d.toLocaleDateString("en-US", { weekday: "short" })
                  const dayNum = d.getDate()
                  const isToday = dateStr === new Date().toISOString().slice(0, 10)
                  const appointmentCount = 3 - i
                  return (
                    <div
                      key={i}
                      className={cn(
                        "p-2 rounded-lg border text-center cursor-pointer hover:bg-muted transition-colors",
                        isToday && "border-primary bg-primary/5"
                      )}
                    >
                      <p className="text-xs text-muted-foreground">{dayName}</p>
                      <p className={cn("text-lg font-bold", isToday && "text-primary")}>{dayNum}</p>
                      <p className={cn("text-xs mt-1", appointmentCount > 0 ? "text-primary" : "text-muted-foreground")}>
                        {appointmentCount > 0 ? `${appointmentCount} appt` : "Free"}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                Create Appointment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger id="patient"><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    {patientOptions.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select defaultValue={selectedDoctor}>
                  <SelectTrigger id="doctor"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {doctors.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department"><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={selectedDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" defaultValue="09:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select>
                  <SelectTrigger id="type"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Check-up</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="lab">Lab</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Reason for visit, special instructions..." className="h-20" />
              </div>
              <Button className="w-full gap-2"><Calendar className="h-4 w-4" /> Schedule Appointment</Button>
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
