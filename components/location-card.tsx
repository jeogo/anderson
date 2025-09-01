"use client"

import { useState, useCallback, useMemo } from "react"
import { MapPin, Phone, Copy, Check, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Location {
  title: string
  location: string
  phones: string[]
}

interface LocationCardProps {
  location: Location
  translations: {
    location: string
    phones: string
    copy: string
    copied: string
    branches: string
  }
  language: string
}

export function LocationCard({ location, translations: t, language }: LocationCardProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const locationInfo = useMemo(() => {
    const wilayaName = location.title.split("(")[0].trim()
    const subLocation = location.title.includes("(") ? location.title.match(/$$([^)]+)$$/)?.[1] : ""
    return { wilayaName, subLocation }
  }, [location.title])

  const socialMediaFormat = useMemo(() => {
    const { wilayaName, subLocation } = locationInfo
    return `🏢 ${wilayaName}${subLocation ? ` (${subLocation})` : ""} - Anderson Branch

📍 ${t.location}:
${location.location}

📞 ${t.phones}:
${location.phones.join(" • ")}

🌐 Find all Anderson branches across Algeria
#AndersonMap #Algeria #${wilayaName.replace(/\s+/g, "")} #Business #Contact

---
🔍 للمزيد من الفروع: Anderson Map
🔍 Pour plus de succursales: Anderson Map  
🔍 For more branches: Anderson Map`
  }, [locationInfo, location.location, location.phones, t.location, t.phones])

  const copyLocationInfo = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(socialMediaFormat)
      setCopied(true)
      toast({
        description: t.copied,
        duration: 2000,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        description: "خطأ في النسخ / Erreur de copie / Copy error",
        variant: "destructive",
        duration: 2000,
      })
    }
  }, [socialMediaFormat, t.copied, toast])

  const { wilayaName, subLocation } = locationInfo

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 ease-out border-slate-200 bg-white hover:border-orange-300 h-full flex flex-col hover:scale-[1.02] transform-gpu">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200 flex-shrink-0 mt-0.5">
            <Building2 className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-balance leading-tight font-semibold text-slate-900">{wilayaName}</h3>
            {subLocation && <p className="text-sm text-slate-600 font-normal mt-1">({subLocation})</p>}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className="flex-grow space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <p className="text-sm font-medium text-slate-700">{t.location}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
              <p className="text-sm text-slate-800 leading-relaxed">{location.location}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-orange-600" />
              <p className="text-sm font-medium text-slate-700">{t.phones}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {location.phones.map((phone, phoneIndex) => (
                <Badge
                  key={phoneIndex}
                  variant="secondary"
                  className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200 border-0"
                >
                  {phone}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={copyLocationInfo}
          variant="outline"
          size="sm"
          className="w-full mt-auto h-10 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 font-medium bg-transparent hover:shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-700">{t.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              {t.copy}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
