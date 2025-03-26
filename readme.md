# Book Tracking Dashboard

## Beskrivelse

Dette er en enkel webapplikasjon for sporing av bøker. Brukere kan legge til, redigere, filtrere, sortere og slette bøker. Data lagres i `localStorage`, slik at de forblir tilgjengelige selv etter at nettleseren lukkes.

## Funksjonalitet

- **Legge til bøker**: Brukeren kan registrere bøker med tittel, forfatter, sjanger, antall sider og vurdering.
- **Redigere bøker**: Klikk på "Edit"-knappen for å oppdatere en eksisterende bok.
- **Slette bøker**: Klikk på "Delete"-knappen for å fjerne en enkelt bok, eller "Clear All Books" for å slette alle.
- **Filtrering og søk**:
  - Søke etter bøker basert på tittel, forfatter eller sjanger.
  - Filtrere bøker etter sjanger.
- **Sortering**: Sortere bøker etter tittel, forfatter, antall sider eller vurdering.
- **Statistikk**: Viser total antall bøker, sider lest og gjennomsnittlig vurdering.

## Teknologier brukt

- **HTML**: Struktur for brukergrensesnittet.
- **CSS**: Styling for et responsivt og brukervennlig design.
- **JavaScript**: Håndtering av brukerinteraksjoner og manipulering av data.
- **localStorage**: Lagring av data i nettleseren.

## Filstruktur

```
📂 project-root
├── index.html    # Hovedfilen for UI
├── style.css     # Styling for appen
├── main.js       # Håndtering av logikk og interaktivitet
├── README.md     # Dokumentasjon
```

## Bruk

1. **Klon repoet:**
   ```sh
   git clone https://github.com/ditt-repo/book-tracker.git
   ```
2. **Åpne `index.html` i en nettleser.**
3. **Legg til bøker, sorter, filtrer og slett etter behov.**

## Videre forbedringer

- **Legge til en backend** for synkronisering mellom flere enheter.
- **Forbedre UI** med mer avansert design og animasjoner.
- **Implementere mer avansert statistikk**, f.eks. lesevaner over tid.

## Lisens

Dette prosjektet er åpent under MIT-lisensen.
