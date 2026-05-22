"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { patients, type Patient } from "@/lib/mock-data"
import { Search, Filter, Calendar, Droplets, AlertTriangle, ChevronDown, ChevronUp, Plus } from "lucide-react"

function getStatusBadge(status: string) {
  const map: Record<string, "success" | "info" | "secondary" | "default"> = {
    active: "success",
    new: "info",
    inactive: "secondary",
  }
  return map[status] || "default"
}

function getBloodTypeColor(type: string) {
  const map: Record<string, string> = {
    "A+": "bg-red-100 text-red-800",
    "A-": "bg-red-50 text-red-700",
    "B+": "bg-blue-100 text-blue-800",
    "B-": "bg-blue-50 text-blue-700",
    "AB+": "bg-purple-100 text-purple-800",
    "AB-": "bg-purple-50 text-purple-700",
    "O+": "bg-green-100 text-green-800",
    "O-": "bg-green-50 text-green-700",
  }
  return map[type] || "bg-gray-100 text-gray-800"
}

export default function PatientsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = patients.filter(p => {
    const q = search.toLowerCase()
    const matchesSearch = !q || p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q) || p.conditions.some(c => c.toLowerCase().includes(q))
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const allConditions = [...new Set(patients.flatMap(p => p.conditions))].sort()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-sm text-muted-foreground">{patients.length} total patients</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Patient</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, MRN, or condition..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44"><SelectValue placeholder="Condition" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            {allConditions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(p => (
          <Card key={p.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{p.firstName} {p.lastName}</p>
                      <p className="text-xs text-muted-foreground">{p.mrn}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusBadge(p.status)} className="text-[10px]">{p.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    DOB: {p.dob}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5 text-red-500" />
                    <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", getBloodTypeColor(p.bloodType))}>{p.bloodType}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Conditions ({p.conditions.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {p.conditions.map(c => (
                      <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                    ))}
                    {p.conditions.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>

                {p.allergies.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span className="text-xs text-amber-700">Allergies: {p.allergies.join(", ")}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
                  <span>Last visit: {p.lastVisit || "N/A"}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs gap-1 h-7"
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  >
                    Details {expandedId === p.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              {expandedId === p.id && (
                <div className="px-4 pb-4 space-y-3 border-t bg-muted/30 pt-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Gender</p>
                      <p className="font-medium">{p.gender}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Provider</p>
                      <p className="font-medium">{p.provider}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Insurance</p>
                      <p className="font-medium">{p.insurance}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Contact</p>
                      <p className="font-medium">{p.phone} &middot; {p.email}</p>
                    </div>
                    {p.medications.length > 0 && (
                      <div className="col-span-2">
                        <p className="text-muted-foreground mb-1">Medications</p>
                        {p.medications.map(m => (
                          <p key={m.name} className="font-medium">{m.name} {m.dosage} &mdash; {m.frequency}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" className="text-xs h-8">Schedule</Button>
                    <Button size="sm" variant="outline" className="text-xs h-8">Records</Button>
                    <Button size="sm" variant="outline" className="text-xs h-8">Message</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found matching your search.</p>
        </div>
      )}
    </div>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
