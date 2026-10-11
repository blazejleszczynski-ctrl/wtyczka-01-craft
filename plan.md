# plan.md

Wysokopoziomowy plan projektu: dodatek do Minecraft Bedrock inspirowany serią „Pamiętnik ośmiobitowego wojownika”.

Jak używać: plik opisuje cel, etapy i kluczowe decyzje. Uzupełniamy go przed napisaniem kodu. Po każdej zmianie merytorycznej - commit (i push do GitHub, gdy repozytorium będzie założone).

## Cel
Dodatek, który daje graczowi specjalny stół do craftingu z przepisami na przedmioty z serii „Pamiętnik ośmiobitowego wojownika”.

## Technologia
Minecraft Bedrock (Windows), dodatek (add-on): zwykłe pliki tekstowe JSON i obrazki, bez programowania w Javie. Wersję gry i format dodatku potwierdzamy w dokumentacji Bedrocka przy starcie etapu 1.
Od 2026-10-11 także skrypty (Script API, JavaScript) - potrzebne do stołu 5x5, bo wbudowany stół do craftingu ma zawsze siatkę 3x3.

### Jeden komputer (od 2026-10-11)
- Pisanie i testowanie na tym samym komputerze: Minecraft Bedrock 1.26.52 jest zainstalowany na komputerze taty.
- Dodatek jest podłączony do gry dowiązaniami (junction) - zmiana w `dodatek/` jest od razu widoczna w grze, wystarczy ponownie wejść do świata:
  - `%AppData%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_behavior_packs\pamietnik_BP` -> `dodatek\BP`
  - `%AppData%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_resource_packs\pamietnik_RP` -> `dodatek\RP`
- Logi gry (dziennik zawartości) Claude czyta sam z `%AppData%\Minecraft Bedrock\logs\ContentLog*.txt`.
- Na komputer użytkownika dodatek trafia przez GitHub (Download ZIP), gdy będzie gotowy.

## Kto decyduje
Gracz. Stół i przedmioty leżą w grze, a gracz sam je zdobywa i używa. Dodatek niczego nie wymusza.

## Etapy
1. Stół wojownika 5x5 z dwoma przepisami: maczuga z pryzmarynu i sztylet. Stół to postać (entity) wyglądająca jak blok, z ekwipunkiem na 54 pola - otwiera się okno dużej skrzyni 9x6: siatka 5x5 po lewej, pole wyniku po prawej. Skrypt sprawdza ułożenie przedmiotów i wstawia wynik. Stół nie jest do wykraftowania - gracz dostaje go komendą (wymaga włączonych cheatów).
   - 1a. Test dymny: czy postać z 54 polami otwiera okno z 6 rzędami.
   - 1b. Wygląd postaci jak blok.
   - 1c. Skrypt i pierwszy przepis (maczuga z pryzmarynu).
   - 1d. Drugi przepis (sztylet).
   - Obecny blok `osm:stol` (siatka 3x3) zostaje do udanego testu 1a, potem go usuwamy. Jeśli test 1a się nie uda: przepisy bez kształtu (liczy się zawartość, nie ułożenie) w oknie 9x3.
2. Pojawianie się stołu w świecie lub w strukturach. Możliwości dodatków Bedrocka do sprawdzenia w dokumentacji przed startem etapu.
3. Na później, tylko jako ewentualność: umiejętności bohatera i fabuła z książki.
