"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { User, Bell, Shield, Building, Puzzle, Save } from "lucide-react"

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "clinic", label: "Clinic Info", icon: Building },
  { id: "integrations", label: "Integrations", icon: Puzzle },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and clinic preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent border-b rounded-none gap-0">
          {sections.map(s => {
            const Icon = s.icon
            return (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary px-4 py-2.5"
              >
                <Icon className="h-4 w-4 mr-2" />
                {s.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Vibhanshu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Buldeo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="v.buldeo@medica-health.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="(555) 111-2222" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input id="npi" defaultValue="9876543210" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License</Label>
                  <Input id="license" defaultValue="MD-OR-88472" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" defaultValue="Internal Medicine" />
              </div>
              <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>Choose how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Critical Lab Results", desc: "Immediate notification for critical values" },
                { label: "Appointment Reminders", desc: "Daily summary of upcoming appointments" },
                { label: "New Messages", desc: "When you receive a new message from staff" },
                { label: "Prescription Refills", desc: "When a patient requests a refill" },
                { label: "System Updates", desc: "EHR maintenance and update notices" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 4} />
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <Label>Notification Methods</Label>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm">In-App Notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm">Email Notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm">SMS Notifications</span>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-pw">Current Password</Label>
                <Input id="current-pw" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-pw">New Password</Label>
                  <Input id="new-pw" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pw">Confirm Password</Label>
                  <Input id="confirm-pw" type="password" />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Authenticator App</p>
                    <p className="text-xs text-muted-foreground">Use an app to generate verification codes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">SMS Authentication</p>
                    <p className="text-xs text-muted-foreground">Receive codes via text message</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <select className="flex h-10 w-44 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              <Button className="gap-2"><Save className="h-4 w-4" /> Update Security</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinic" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinic Information</CardTitle>
              <CardDescription>Manage your clinic or hospital details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Clinic Name</Label>
                  <Input id="clinic-name" defaultValue="Medica Healthcare Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-id">Clinic ID</Label>
                  <Input id="clinic-id" defaultValue="MHC-001" disabled />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="clinic-address">Address</Label>
                  <Input id="clinic-address" defaultValue="100 Medical Drive, Portland, OR 97201" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">Phone</Label>
                  <Input id="clinic-phone" defaultValue="(555) 000-1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-fax">Fax</Label>
                  <Input id="clinic-fax" defaultValue="(555) 000-1001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-hours">Operating Hours</Label>
                <Textarea id="clinic-hours" defaultValue="Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 1:00 PM\nSun: Closed" className="h-20" />
              </div>
              <Button className="gap-2"><Save className="h-4 w-4" /> Save Clinic Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Integrations</CardTitle>
              <CardDescription>Connect third-party services and systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "LabCorp", desc: "Laboratory results integration", status: "Connected" },
                { name: "Quest Diagnostics", desc: "External lab ordering and results", status: "Connected" },
                { name: "Epic EHR", desc: "Health information exchange", status: "Disconnected" },
                { name: "Cerner", desc: "Legacy system integration", status: "Disconnected" },
                { name: "DrChrono", desc: "Practice management", status: "Connected" },
                { name: "Zocdoc", desc: "Patient appointment scheduling", status: "Connected" },
                { name: "Stripe", desc: "Payment processing", status: "Connected" },
                { name: "Twilio", desc: "SMS and communication", status: "Disconnected" },
              ].map((int, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={int.status === "Connected" ? "success" : "secondary"} className="text-[10px]">{int.status}</Badge>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      {int.status === "Connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Badge({ variant, className, ...props }: { variant?: string; className?: string; children: React.ReactNode }) {
  const variants: Record<string, string> = {
    success: "bg-emerald-100 text-emerald-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
  }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", variants[variant || "default"] || variants.secondary, className)} {...props} />
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
