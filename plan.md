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
Lista przedmiotów, przepisów i efektów: `przepisy.md`.

1. Stół wojownika i crafting wszystkich przedmiotów z `przepisy.md` jako zwykłych przedmiotów (bez efektów). Stół to postać (entity) wyglądająca jak blok stołu, z oknem skrzyni 9x3 (27 pól). Przepisy bez kształtu: liczy się, co leży w skrzyni (rodzaj i liczba), a nie gdzie; w skrzyni nie może leżeć nic poza składnikami. Kształt z `przepisy.md` to ilustracja. Stół nie jest do wykraftowania - gracz dostaje go komendą (wymaga włączonych cheatów).
   - 1a. Test dymny okna 54 pól - zrobione: gra zawsze pokazuje okno małej skrzyni (3 rzędy), stąd przepisy bez kształtu.
   - 1b. Wygląd i nazwa stołu: 27 pól, polska nazwa (`pl_PL.lang`).
   - 1c. Skrypt i pierwszy przepis (maczuga z pryzmarynu). Crafting uruchamia gracz, uderzając stół: skrypt sprawdza zawartość skrzyni, zabiera składniki i wkłada wynik do skrzyni. Gdy zawartość nie pasuje do żadnego przepisu - nic się nie dzieje. Najpierw test dymny: czy uderzenie stołu (który nie przyjmuje obrażeń) wywołuje zdarzenie `entityHitEntity`.
   - 1d. Pozostałe przepisy, po jednym.
   - Blok `osm:stol` (siatka 3x3) usuwamy po udanym 1c.
2. Efekty przedmiotów z `przepisy.md`, po jednym, od najprostszego (maczuga z pryzmarynu).
3. Pojawianie się stołu w świecie lub w strukturach. Możliwości dodatków Bedrocka do sprawdzenia w dokumentacji przed startem etapu.
4. Na później, tylko jako ewentualność: umiejętności bohatera i fabuła z książki.
