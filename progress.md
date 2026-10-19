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

## 2026-10-15 (praca samodzielna wg `zlecenie.md`, punkt 1)
- Cel: proca.
- Zrobiono: przedmiot `osm:proca` (strzelacz bez amunicji do naciągania, wytrzymałość 1000), przepis 4 patyki + 1 nić, skrypt `proca.js` (siła naciągu jak łuk, strzał brukiem, prędkość 2,34 = 2/3 zasięgu łuku, pomiar prędkości w logu), pocisk `osm:kamien_z_procy` z obrażeniami zależnymi od prędkości, ikona `narzedzia/ikona_procy.py`, test przepisów skryptem 8/8, próby w `testy.md`. Pominięte: obrazek przy naciąganiu (`todo.md`).
- Dalej: sztylet (punkt 2), potem test użytkownika.

## 2026-10-15 (praca samodzielna wg `zlecenie.md`, punkt 2)
- Cel: sztylet - efekty i ikona.
- Zrobiono: wspólny moduł `wspolne.js` (czas przytrzymania, zużycie, wystrzał; proca przerobiona na niego); sztylet: obrażenia 4, wytrzymałość 500, cios od tyłu podwójny (8), zużycie przy ciosie skryptem, rzut po 0,5 s (pocisk `osm:rzucony_sztylet`, 5 pkt, zasięg 20 bloków, obraca się w locie, po trafieniu spada jako przedmiot); ikona `narzedzia/ikona_sztyletu.py`. Sprawdzenia skryptem: składnia 4/4 plików JS, 14/14 JSON, 20/20 importów, przepisy 8/8. Pominięte: szybkość ataku (`todo.md`).
- Dalej: test użytkownika w grze (proca i sztylet, `testy.md`), potem granat i strzała wybuchowa.

## 2026-10-15 (poprawki po teście 1)
- Cel: błędy z testu procy i sztyletu.
- Zrobiono: analiza logu skryptem (0 błędów; 62 strzały z procy, 0 zranień; współczynnik shoot 1,92 z 50 strzałów; golem -12 na cios sztyletu od tyłu); prędkość pocisków dzielona przez 1,92; wpisy o trafieniach kamienia i sztyletu; cios od tyłu 4 + 4. Nowe próby w `testy.md`.
- Dalej: test użytkownika, potem granat i strzała wybuchowa.

## 2026-10-19 (praca samodzielna wg `zlecenie.md`, punkt 3)
- Cel: granat. Przed startem: analiza logu po poprawkach 1 (prędkość kamienia 16/16 dobrze, sztylet od tyłu −8 dobrze, kamień trafia moby, ale nie rani - wątek w `todo.md`).
- Zrobiono: przedmiot `osm:granat` (przepis 4 żelaza + 4 proch + 1 kula ognia = 4 granaty), skrypt `granat.js` (rzut na 20 bloków, wybuch po trafieniu, obrażenia 50 pkt liniowo do 0 w promieniu 5 bloków, tylko moby, bez niszczenia bloków, błysk, dym, czerwone iskry, dźwięk pęknięcia), pocisk `osm:rzucony_granat`, ikona `narzedzia/ikona_granatu.py`. Sprawdzenia skryptem: składnia 5/5, JSON 17/17, importy 24/24, przepisy 13/13.
- Dalej: strzała wybuchowa (punkt 4), potem test użytkownika.

## 2026-10-19 (praca samodzielna wg `zlecenie.md`, punkt 4)
- Cel: strzała wybuchowa.
- Zrobiono: przedmiot `osm:strzala_wybuchowa` (przepis 8 prochu + 1 strzała = 2), skrypt `strzala.js` (łuk strzela wybuchową, gdy leży w drugiej ręce; wybuch 2,67 po trafieniu, niszczy bloki, rani wszystkich; smuga czerwonych iskier), ikona `narzedzia/ikona_strzaly_wybuchowej.py`. Sprawdzenia skryptem: składnia 6/6, JSON 18/18, importy 29/29, przepisy 17/17. Przybliżenie: do naciągnięcia łuku potrzebna 1 zwykła strzała.
- Dalej: test użytkownika (granat, strzała wybuchowa, zaległe próby poprawek 1 - kamień z procy), potem artefakt.

## 2026-10-19 (poprawki po teście 2)
- Cel: błędy z testu granatu i strzały wybuchowej.
- Zrobiono: analiza logu skryptem (0 błędów; granat ranił lecące granaty; łuk 3,00). Granat: prędkość 1,5 (prosto ok. 13, najdalej ok. 38 - wybór użytkownika), cele tylko z rodziny `mob`, wpis odległości od gracza. Strzała wybuchowa i rzucony sztylet działają.
- Dalej: krótki test granatu (`testy.md`), potem artefakt (punkt 5).

## 2026-10-19 (lot granatu)
- Cel: granat nie dolatywał nawet na 10 bloków.
- Zrobiono: pomiar lotu co tick (gra hamuje × 0,90 i ściąga 0,255 na tick zamiast 0,99 i 0,05); funkcja `prowadzLot` w `wspolne.js` prowadzi tor skryptem; poprawka mnożnika 1,92 dla `applyImpulse`. Ostatnia poprawka niesprawdzona w grze. Sprawdzenia skryptem: składnia 6/6, JSON 18/18, importy 31/31.
- Dalej: test zasięgu granatu (`testy.md`, blok „Granat - lot prowadzony skryptem”), usunięcie pomiaru `[lot]`, potem `prowadzLot` w sztylecie i procy (`todo.md`), potem artefakt (punkt 5).

## 2026-10-19 (test 3: granat i strzała wybuchowa)
- Cel: błędy z testu - granat leci za daleko, strzała wybuchowa nie wybucha w mobie.
- Zrobiono: analiza logu skryptem. Granat: kształt lotu zgodny z modelem (0,99 i 0,05), ale prędkość startowa za duża (×1,12 prosto, ×1,43 w górę; prosto 20 bloków zamiast 13, w górę 50 zamiast 38) - przyczyna nieznana. Strzała: znika przy trafieniu moba - rozpoznawanie po numerze (3/3 w grze), sprawdzenie `isValid` przy wystrzale.
- Dalej: kusza ze strzałą wybuchową (Wielostrzał - 3 wybuchowe), potem pomiar kierunku rzutu granatu.
- Dopisek: kusza ze strzałą wybuchową (Wielostrzał - 3 wybuchowe za 1), w grze 15/15. Nowy błąd z dalekimi strzałami i granat - w `todo.md`.
