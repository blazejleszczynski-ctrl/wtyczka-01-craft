# progress.md

Log sesji pracy.

Jak używać: po każdej sesji dopisujemy krótki wpis w formacie: data - cel sesji - co zrobiono - co dalej.

## 2026-10-07
- Cel: założenie projektu i wypełnienie `plan.md`.
- Zrobiono: wybrano mod Fabric dla Java Edition 1.21.11 (inspiracja: „Pamiętnik ośmiobitowego wojownika"); utworzono `plan.md`, `progress.md`, `notes.md`, `todo.md`, `.gitignore`; ustalono, że decyduje gracz; ustalono etapy (1 wygląd i ekwipunek, 2 umiejętności, 3 fabuła); założono lokalne repozytorium git, 1 commit.
- Dalej: potwierdzić na fabricmc.net zgodność Fabric z 1.21.11, przygotować środowisko (Java, edytor), podłączyć GitHub (gałąź `master` -> `main`).
- Potwierdzono: Fabric obsługuje 1.21.11 (meta.fabricmc.net: stabilna); Fabric API 0.141.6+1.21.11 (28.07.2026). 1.21.11 nie jest najnowszą wersją gry (jest już 26.3). Niesprawdzone: wersja Loom i wymagana wersja Javy.
- Odłożone: założenie repozytorium na GitHubie (decyzja użytkownika).

## 2026-10-10 / 2026-10-11
- Cel: przejście na Bedrocka i pierwszy działający dodatek (test dymny: sam stół).
- Zrobiono: zmiana z Fabric/Java na dodatek Bedrock; przepisano `plan.md` (etap 1: stół `osm:stol` + maczuga z pryzmarynu i sztylet, stół tylko z `/give`); utworzono `dodatek/` (BP + RP); podłączono GitHub (`origin`, gałąź `main`); gra zainstalowana na komputerze taty, dodatek podłączony dowiązaniami; poprawiono blok (brak `geometry`). Test: `/give @s osm:stol` działa, blok stoi, okno craftingu „Stół wojownika” się otwiera, 0 nowych błędów w logu.
- Dalej: maczuga z pryzmarynu - najpierw sam przedmiot, potem przepis na naszym stole; tekstura stołu (teraz blat na każdej ścianie).
