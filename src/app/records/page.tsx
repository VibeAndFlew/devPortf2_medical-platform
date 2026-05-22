"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { medicalRecords } from "@/lib/mock-data"
import { Search, FileText, FlaskRoundIcon as Flask, Microscope, Syringe, ClipboardList, Eye, Download } from "lucide-react"

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  lab_result: { icon: Flask, color: "text-amber-600", bg: "bg-amber-100" },
  imaging: { icon: Microscope, color: "text-purple-600", bg: "bg-purple-100" },
  note: { icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
  report: { icon: ClipboardList, color: "text-teal-600", bg: "bg-teal-100" },
  vaccination: { icon: Syringe, color: "text-green-600", bg: "bg-green-100" },
  prescription: { icon: ClipboardList, color: "text-rose-600", bg: "bg-rose-100" },
}

function getStatusBadge(status: string) {
  const map: Record<string, "success" | "warning" | "info" | "default"> = {
    final: "success",
    preliminary: "warning",
    amended: "info",
  }
  return map[status] || "default"
}

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
}

export default function RecordsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = medicalRecords.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.provider.toLowerCase().includes(q)
    const matchType = typeFilter === "all" || r.type === typeFilter
    return matchSearch && matchType
  })

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-sm text-muted-foreground">{medicalRecords.length} records</p>
        </div>
        <Button className="gap-2"><FileText className="h-4 w-4" /> New Record</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search records..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1">
          {["all", "lab_result", "imaging", "note", "report", "vaccination", "prescription"].map(t => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setTypeFilter(t)}
            >
              {t === "all" ? "All" : formatType(t)}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(r => {
                const config = typeConfig[r.type] || typeConfig.lab_result
                const Icon = config.icon
                return (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className={cn("p-1.5 rounded-md w-fit", config.bg)}>
                        <Icon className={cn("h-4 w-4", config.color)} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{r.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-xs">{r.description.slice(0, 80)}...</p>
                    </TableCell>
                    <TableCell className="text-sm">{r.date}</TableCell>
                    <TableCell className="text-sm">{r.provider}</TableCell>
                    <TableCell className="text-sm">{r.department}</TableCell>
                    <TableCell><Badge variant={getStatusBadge(r.status)} className="text-[10px]">{r.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        {r.attachments > 0 && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No records found.</div>
      )}
    </div>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
