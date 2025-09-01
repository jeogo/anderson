// Declare locationsData variable or import it as needed
const locationsData = [
  { title: "Algiers (1)", location: "Algiers, Algeria", phones: ["+213 21 66 12 34", "+213 21 66 56 78"] },
  { title: "Oran (2)", location: "Oran, Algeria", phones: ["+213 23 23 45 67", "+213 23 23 89 01"] },
  // Add more location data as needed
]

class LocationFinder {
  constructor() {
    this.locations = locationsData
    this.filteredLocations = [...this.locations]
    this.currentLanguage = "ar"
    this.translations = {
      ar: {
        title: "دليل المواقع",
        searchPlaceholder: "ابحث عن الولاية أو المدينة...",
        allWilayas: "جميع الولايات",
        results: "نتيجة",
        noResults: "لا توجد نتائج",
        tryDifferent: "جرب البحث بكلمات مختلفة",
        contactUs: "تواصل معنا",
        facebookPage: "صفحتنا على فيسبوك",
        copySuccess: "تم نسخ المعلومات بنجاح!",
        copy: "نسخ",
        phones: "أرقام الهاتف:",
        rightsReserved: "جميع الحقوق محفوظة.",
      },
      fr: {
        title: "Répertoire des Emplacements",
        searchPlaceholder: "Rechercher une wilaya ou ville...",
        allWilayas: "Toutes les wilayas",
        results: "résultat(s)",
        noResults: "Aucun résultat",
        tryDifferent: "Essayez avec des mots différents",
        contactUs: "Contactez-nous",
        facebookPage: "Notre page Facebook",
        copySuccess: "Informations copiées avec succès!",
        copy: "Copier",
        phones: "Téléphones:",
        rightsReserved: "Tous droits réservés.",
      },
      en: {
        title: "Location Directory",
        searchPlaceholder: "Search for wilaya or city...",
        allWilayas: "All Wilayas",
        results: "result(s)",
        noResults: "No results found",
        tryDifferent: "Try searching with different keywords",
        contactUs: "Contact Us",
        facebookPage: "Our Facebook Page",
        copySuccess: "Information copied successfully!",
        copy: "Copy",
        phones: "Phones:",
        rightsReserved: "All rights reserved.",
      },
    }

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.populateWilayaFilter()
    this.renderLocations()
    this.updateResultsCount()
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("searchInput")
    searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value)
    })

    // Wilaya filter
    const wilayaFilter = document.getElementById("wilayaFilter")
    wilayaFilter.addEventListener("change", (e) => {
      this.handleWilayaFilter(e.target.value)
    })

    // Language switcher
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchLanguage(e.target.dataset.lang)
      })
    })
  }

  populateWilayaFilter() {
    const wilayaFilter = document.getElementById("wilayaFilter")
    const wilayas = [...new Set(this.locations.map((loc) => loc.title.split("(")[0].trim()))].sort()

    wilayaFilter.innerHTML = `<option value="">${this.translations[this.currentLanguage].allWilayas}</option>`
    wilayas.forEach((wilaya) => {
      wilayaFilter.innerHTML += `<option value="${wilaya}">${wilaya}</option>`
    })
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim()
    this.filteredLocations = this.locations.filter(
      (location) =>
        location.title.toLowerCase().includes(searchTerm) ||
        location.location.toLowerCase().includes(searchTerm) ||
        location.phones.some((phone) => phone.includes(searchTerm)),
    )

    this.renderLocations()
    this.updateResultsCount()
  }

  handleWilayaFilter(wilaya) {
    if (wilaya === "") {
      this.filteredLocations = [...this.locations]
    } else {
      this.filteredLocations = this.locations.filter((location) => location.title.startsWith(wilaya))
    }

    this.renderLocations()
    this.updateResultsCount()
  }

  renderLocations() {
    const grid = document.getElementById("locationsGrid")
    const noResults = document.getElementById("noResults")

    if (this.filteredLocations.length === 0) {
      grid.style.display = "none"
      noResults.style.display = "block"
      return
    }

    grid.style.display = "grid"
    noResults.style.display = "none"

    grid.innerHTML = this.filteredLocations.map((location) => this.createLocationCard(location)).join("")

    // Add copy event listeners
    document.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const locationData = e.target.closest(".location-card").dataset.locationData
        console.log('Copied content:', locationData)  // Log what's being copied
        this.copyToClipboard(locationData)
      })
    })
  }

  createLocationCard(location) {
    const locationData = `${location.title}\n${location.location}\n${this.translations[this.currentLanguage].phones} ${location.phones.join(", ")}`

    return `
            <div class="location-card" data-location-data="${locationData}">
                <div class="location-header">
                    <div>
                        <h3 class="location-title">${location.title}</h3>
                    </div>
                    <button class="copy-btn">
                        <i class="fas fa-copy"></i>
                        ${this.translations[this.currentLanguage].copy}
                    </button>
                </div>
                <div class="location-address">${location.location}</div>
                <div class="phones-section">
                    <div class="phones-title">${this.translations[this.currentLanguage].phones}</div>
                    <div class="phones-list">
                        ${location.phones.map((phone) => `<span class="phone-number">${phone}</span>`).join("")}
                    </div>
                </div>
            </div>
        `
  }

  copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.showToast()
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        this.showToast()
      })
  }

  showToast() {
    const toast = document.getElementById("copyToast")
    toast.querySelector("span").textContent = this.translations[this.currentLanguage].copySuccess
    toast.classList.add("show")

    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  }

  updateResultsCount() {
    const count = document.getElementById("resultsCount")
    const text = document.querySelector(".results-text")
    count.textContent = this.filteredLocations.length
    text.textContent = this.translations[this.currentLanguage].results
  }

  switchLanguage(lang) {
    this.currentLanguage = lang

    // Update active language button
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-lang="${lang}"]`).classList.add("active")

    // Update HTML attributes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

    // Update UI text
    this.updateUIText()
    this.populateWilayaFilter()
    this.renderLocations()
    this.updateResultsCount()
  }

  updateUIText() {
    const t = this.translations[this.currentLanguage]

    document.querySelector(".logo").textContent = t.title
    document.getElementById("searchInput").placeholder = t.searchPlaceholder
    document.querySelector(".contact-info h3").textContent = t.contactUs
    document.querySelector(".facebook-link").innerHTML = `<i class="fab fa-facebook"></i> ${t.facebookPage}`
    document.querySelector(".footer-text p").innerHTML = `&copy; 2024 ${t.title}. ${t.rightsReserved}`

    const noResultsSection = document.getElementById("noResults")
    noResultsSection.querySelector("h3").textContent = t.noResults
    noResultsSection.querySelector("p").textContent = t.tryDifferent
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LocationFinder()
})
