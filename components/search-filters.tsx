"use client"

import { Search, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedWilaya: string
  setSelectedWilaya: (wilaya: string) => void
  language: "ar" | "fr" | "en"
  setLanguage: (lang: "ar" | "fr" | "en") => void
  wilayas: Array<{ name: string; displayName: string; index: number }>
  translations: {
    search: string
    filter: string
    all: string
  }
  resultsCount: number
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedWilaya,
  setSelectedWilaya,
  language,
  setLanguage,
  wilayas,
  translations: t,
  resultsCount,
}: SearchFiltersProps) {
  return (
    <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Anderson Map</h1>
              <p className="text-sm text-slate-600">
                {language === "ar"
                  ? "دليل الفروع"
                  : language === "fr"
                    ? "Répertoire des succursales"
                    : "Branch Directory"}
              </p>
            </div>
          </div>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 border-slate-200">
              <Globe className="w-4 h-4 text-slate-500 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20"
            />
          </div>
          <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
            <SelectTrigger className="w-full sm:w-56 h-11 border-slate-200 focus:border-orange-400">
              <SelectValue placeholder={t.filter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              {wilayas.map((wilaya) => (
                <SelectItem key={wilaya.name} value={wilaya.name}>
                  {wilaya.index} - {wilaya.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-slate-600">
          {language === "ar"
            ? `${resultsCount} فرع`
            : language === "fr"
              ? `${resultsCount} succursales`
              : `${resultsCount} branches`}
        </div>
      </div>
    </div>
  )
}
