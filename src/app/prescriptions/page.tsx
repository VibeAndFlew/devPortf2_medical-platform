"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { prescriptions } from "@/lib/mock-data"
import { Search, Pill, Plus, RefreshCw, AlertTriangle } from "lucide-react"

const statusConfig: Record<string, { variant: "success" | "destructive" | "warning" | "default" | "secondary"; label: string }> = {
  active: { variant: "success", label: "Active" },
  discontinued: { variant: "destructive", label: "Discontinued" },
  expired: { variant: "secondary", label: "Expired" },
  pending: { variant: "warning", label: "Pending" },
}

export default function PrescriptionsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = prescriptions.filter(rx => {
    const q = search.toLowerCase()
    const matchSearch = !q || rx.medication.toLowerCase().includes(q) || rx.patientName.toLowerCase().includes(q) || rx.prescribedBy.toLowerCase().includes(q)
    const matchStatus = statusFilter === "all" || rx.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-sm text-muted-foreground">{prescriptions.length} prescriptions</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Prescription</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search medication or patient..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="discontinued">Discontinued</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(rx => {
          const config = statusConfig[rx.status] || statusConfig.active
          return (
            <Card key={rx.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      rx.status === "active" ? "bg-emerald-100" :
                      rx.status === "pending" ? "bg-amber-100" :
                      rx.status === "discontinued" ? "bg-red-100" : "bg-gray-100"
                    )}>
                      <Pill className={cn(
                        "h-5 w-5",
                        rx.status === "active" ? "text-emerald-600" :
                        rx.status === "pending" ? "text-amber-600" :
                        rx.status === "discontinued" ? "text-red-600" : "text-gray-600"
                      )} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{rx.medication}</p>
                      <p className="text-xs text-muted-foreground">{rx.dosage} &middot; {rx.route}</p>
                    </div>
                  </div>
                  <Badge variant={config.variant} className="text-[10px]">{config.label}</Badge>
                </div>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient</span>
                    <span className="font-medium">{rx.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-medium">{rx.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{rx.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refills</span>
                    <span className="font-medium">{rx.refills}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prescribed by</span>
                    <span className="font-medium">{rx.prescribedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{rx.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pharmacy</span>
                    <span className="font-medium">{rx.pharmacy}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  {rx.notes && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {rx.status === "active" && <RefreshCw className="h-3 w-3" />}
                      {rx.status === "pending" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                      {rx.notes.slice(0, 40)}{rx.notes.length > 40 ? "..." : ""}
                    </div>
                  )}
                  <div className="flex gap-1 ml-auto">
                    <Button variant="ghost" size="sm" className="text-xs h-7">Refill</Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive">DC</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No prescriptions found.</div>
      )}
    </div>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
