"use client"

import { useState, useMemo, useCallback } from "react"
import { MapPin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { LocationCard } from "@/components/location-card"
import { SearchFilters } from "@/components/search-filters"
import { locationsData, getWilayaDisplayName } from "@/lib/data"
import { translations, type Language } from "@/lib/translations"
import { useLocationSearch } from "@/hooks/use-location-search"

export default function LocationDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWilaya, setSelectedWilaya] = useState("all")
  const [language, setLanguage] = useState<Language>("ar")

  const t = translations[language]

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleWilayaChange = useCallback((value: string) => {
    setSelectedWilaya(value)
  }, [])

  const handleLanguageChange = useCallback((value: Language) => {
    setLanguage(value)
  }, [])

  const wilayas = useMemo(() => {
    const uniqueWilayas = [...new Set(locationsData.map((location) => location.title.split("(")[0].trim()))]
    return uniqueWilayas.sort().map((wilaya, index) => ({
      name: wilaya,
      displayName: getWilayaDisplayName(wilaya, language),
      index: index + 1,
    }))
  }, [language])

  const filteredLocations = useLocationSearch({
    locations: locationsData,
    searchTerm,
    selectedWilaya,
  })

  const EmptyState = useMemo(
    () => (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <MapPin className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-3">{t.noResults}</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          {language === "ar"
            ? "جرب تعديل كلمات البحث أو المرشح للعثور على الفرع المطلوب"
            : language === "fr"
              ? "Essayez d'ajuster vos critères de recherche pour trouver la succursale souhaitée"
              : "Try adjusting your search or filter criteria to find the branch you're looking for"}
        </p>
      </div>
    ),
    [t.noResults, language],
  )

  return (
    <div
      className={`min-h-screen bg-slate-50 transition-all duration-200 ${language === "ar" ? "rtl" : "ltr"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        selectedWilaya={selectedWilaya}
        setSelectedWilaya={handleWilayaChange}
        language={language}
        setLanguage={handleLanguageChange}
        wilayas={wilayas}
        translations={t}
        resultsCount={filteredLocations.length}
      />

      <main className="container mx-auto px-4 py-8">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredLocations.map((location, index) => (
              <LocationCard
                key={`${location.title}-${index}`}
                location={location}
                translations={t}
                language={language}
              />
            ))}
          </div>
        ) : (
          EmptyState
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">© 2024 Anderson Map</p>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-slate-200 hover:bg-slate-50 bg-transparent transition-colors duration-200"
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                {t.contact}
              </a>
            </Button>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
