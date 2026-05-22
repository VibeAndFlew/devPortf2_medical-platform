"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { telemedicineSessions } from "@/lib/mock-data"
import { Video, Phone, Clock, ArrowRight, Monitor, Calendar } from "lucide-react"

function getStatusBadge(status: string) {
  const map: Record<string, "success" | "warning" | "info" | "destructive" | "default"> = {
    completed: "success",
    scheduled: "default",
    in_progress: "warning",
    cancelled: "destructive",
  }
  return map[status] || "default"
}

export default function TelemedicinePage() {
  const upcoming = telemedicineSessions.filter(t => t.status !== "completed" && t.status !== "cancelled")
  const history = telemedicineSessions.filter(t => t.status === "completed" || t.status === "cancelled")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Telemedicine</h1>
          <p className="text-sm text-muted-foreground">{upcoming.length} upcoming sessions</p>
        </div>
        <Button className="gap-2"><Video className="h-4 w-4" /> Schedule Session</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No upcoming telemedicine sessions.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map(t => (
                <div key={t.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "p-2.5 rounded-lg shrink-0",
                    t.type === "video" ? "bg-blue-100" : "bg-green-100"
                  )}>
                    {t.type === "video" ? <Monitor className="h-5 w-5 text-blue-600" /> : <Phone className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm">{t.patientName}</p>
                        <p className="text-xs text-muted-foreground">{t.doctorName}</p>
                      </div>
                      <Badge variant={getStatusBadge(t.status)} className="text-[10px]">{t.status.replace("_", " ")}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{t.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{t.time}</span>
                      <span>{t.duration} min</span>
                      <span>{t.type}</span>
                    </div>
                    {t.notes && <p className="text-xs text-muted-foreground mt-1">{t.notes}</p>}
                  </div>
                  <div className="shrink-0">
                    {t.status === "in_progress" && (
                      <Button className="gap-2 text-xs"><Video className="h-4 w-4" /> Join Now</Button>
                    )}
                    {t.status === "scheduled" && (
                      <Button variant="outline" className="gap-2 text-xs"><Monitor className="h-4 w-4" /> Join</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recording</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.patientName}</TableCell>
                  <TableCell className="text-sm">{t.doctorName}</TableCell>
                  <TableCell className="text-sm">{t.date} {t.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {t.type === "video" ? <Monitor className="h-3.5 w-3.5 text-blue-500" /> : <Phone className="h-3.5 w-3.5 text-green-500" />}
                      <span className="text-xs">{t.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{t.duration}min</TableCell>
                  <TableCell><Badge variant={getStatusBadge(t.status)} className="text-[10px]">{t.status}</Badge></TableCell>
                  <TableCell className="text-sm">{t.recording ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
