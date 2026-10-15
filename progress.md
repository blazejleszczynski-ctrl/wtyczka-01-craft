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

## 2026-10-11 (przepisy i efekty)
- Cel: opracowanie formatu zapisu przepisów i efektów przedmiotów oraz ustalenie efektów z użytkownikiem. Okno 5×5 robi osobny agent.
- Zrobiono: utworzono `przepisy.md` (legenda składników 1-9, jeden blok na przedmiot, siatki 5×5; skrypt: 7/7 siatek poprawnych, 0 nieznanych znaków). Ustalono efekty i liczby: Artefakt 2 (okulary z paskami życia mobów), Artefakt (miecz z atakiem specjalnym), Granat, Proca, Sztylet, Strzała wybuchowa (przepis daje 2), Maczuga z pryzmarynu. Rozstrzygnięto: 7 to odłamek pryzmarynu, dolne pole strzały to 6.
- Dalej: braki oznaczone `?` w `przepisy.md`: Artefakt 2 (sztuki, wygląd), Artefakt (rodzaj, sztuki); rysunki 16×16 wszystkich przedmiotów; sprawdzenie w dokumentacji, co z efektów wymaga skryptu JavaScript.

## 2026-10-11 (sesja 2)
- Cel: stół wojownika 5x5.
- Zrobiono: sprawdzono, że wbudowany stół ma zawsze 3x3; test dymny postaci z 54 polami - okno ma zawsze 3 rzędy; przejście na przepisy bez kształtu w skrzyni 9x3, crafting uruchamia uderzenie stołu; przebudowano etapy w `plan.md` (4 etapy, przedmioty z `przepisy.md`); w `przepisy.md` dopisano, że kształt jest tylko ilustracją, a każdy przepis musi mieć inny zestaw składników.
- Zrobiono (cd.): test dymny skryptu - uderzenie stołu wykrywane, skrypt czyta i sumuje zawartość skrzyni (11/11 uderzeń bez utraty życia po zmianie formatu postaci na `1.26.0`); stół ma 2000 punktów życia; `@minecraft/server` 2.10.0 działa w grze 1.26.52.
- Dalej: przedmiot `osm:maczuga_pryzmarynowa` (zwykły, bez efektu), potem przepis na maczugę w skrypcie (5 odłamków pryzmarynu -> 1 maczuga). Odłożone: 1b (27 pól, `pl_PL.lang`).

## 2026-10-12
- Cel: maczuga z pryzmarynu jako przedmiot i pierwszy przepis w skrypcie (etap 1c).
- Zrobiono: przedmiot `osm:maczuga_pryzmarynowa` (bez efektu, tymczasowa ikona odłamka pryzmarynu, nazwa wyświetla się po polsku); przepis w `main.js`: 5 odłamków pryzmarynu + uderzenie stołu = maczuga, dokładna zgodność składników. Test: 4/4 próby poprawne, 0 błędów w logu. 2 commity + push.
- Dalej: usunięcie bloku `osm:stol` (siatka 3x3), potem 1b (27 pól, `pl_PL.lang`) albo 1d (kolejne przepisy).

## 2026-10-12 (sesja 2)
- Cel: usunięcie bloku `osm:stol`, przepisy (1d), maczuga z pryzmarynu do końca.
- Zrobiono: usunięto blok `osm:stol` (siatka 3x3); sztylet `osm:sztylet` (bez efektu, przepis 1 żelazo + 1 patyk, test 4/4); w `przepisy.md` oba Artefakty dają po 1 sztuce; maczuga zadaje 5 pkt i ma wytrzymałość 800 (golem padł od 20. ciosu). 3 commity + push.
- Dalej: ogłuszenie maczugą (plan gotowy: spowolnienie i osłabienie na najwyższym poziomie na 1 s, szansa 10%, wpis w logu przy każdym uderzeniu; do decyzji ograniczenie - strzelające moby mogą strzelać w czasie ogłuszenia), potem ikona maczugi 16x16, potem proca.

## 2026-10-12 (sesja 3)
- Cel: ogłuszenie maczugą z pryzmarynu.
- Zrobiono: ustalono 20% szansy i 1 s (strzelające moby mogą strzelać w czasie ogłuszenia - zaakceptowane); skrypt nakłada spowolnienie i osłabienie, wpis w logu przy każdym ciosie. Poprawka: zdarzenie `entityHurt` zamiast `entityHitEntity` (to drugie liczyło także puste kliknięcia). Test: 20/20 ciosów w logu, 0 błędów.
- Dalej: ikona maczugi 16x16, potem proca.

## 2026-10-12 (sesja 4)
- Cel: ikona maczugi z pryzmarynu 16x16.
- Zrobiono: ikonę wygenerował skrypt `narzedzia/ikona_maczugi.py`; `item_texture.json` wskazuje własny plik zamiast odłamka pryzmarynu. Test w grze: ikona widoczna, maczuga działa, 0 błędów w logu. Maczuga skończona - wyjątek z etapu 2 zamknięty.
- Dalej: proca (1d).

## 2026-10-12 (sesja 5)
- Cel: proca (1d).
- Zrobiono: nic w kodzie. Ustalono plan pierwszego commita (czeka na zgodę użytkownika): `BP/items/proca.json` (zwykły przedmiot, stos 1, kategoria equipment, wzór jak `sztylet.json`); przepis w `main.js` 4 patyki + 1 nić -> 1 proca (zestaw unikalny); tymczasowa ikona `textures/items/bow_standby` w `item_texture.json`; nazwa „Proca” w `en_US.lang`; status w `przepisy.md` -> w grze. Test: 4/4 próby (poprawny przepis; 3 patyki + nić - nic; z dodatkowym żelazem - nic; sztylet nadal działa), 0 błędów w logu.
- Dalej: przedstawić powyższy plan do zgody i wykonać; potem sprawdzić w dokumentacji naciąganie i strzelanie brukiem (`minecraft:shooter`, `minecraft:use_modifiers`) - wtedy `proca.json` się zmieni.
