"use client"

import { useMemo } from "react"
import type { Location } from "@/lib/data"

interface UseLocationSearchProps {
  locations: Location[]
  searchTerm: string
  selectedWilaya: string
}

export function useLocationSearch({ locations, searchTerm, selectedWilaya }: UseLocationSearchProps) {
  return useMemo(() => {
    if (!searchTerm && selectedWilaya === "all") {
      return locations
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim()
    const normalizedWilaya = selectedWilaya.toLowerCase()

    return locations.filter((location) => {
      if (selectedWilaya !== "all" && !location.title.toLowerCase().includes(normalizedWilaya)) {
        return false
      }

      if (
        normalizedSearchTerm &&
        !location.title.toLowerCase().includes(normalizedSearchTerm) &&
        !location.location.toLowerCase().includes(normalizedSearchTerm) &&
        !location.phones.some((phone) => phone.includes(normalizedSearchTerm))
      ) {
        return false
      }

      return true
    })
  }, [locations, searchTerm, selectedWilaya])
}
