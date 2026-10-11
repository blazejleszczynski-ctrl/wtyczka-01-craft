# plan.md

Wysokopoziomowy plan projektu: dodatek do Minecraft Bedrock inspirowany serią „Pamiętnik ośmiobitowego wojownika”.

Jak używać: plik opisuje cel, etapy i kluczowe decyzje. Uzupełniamy go przed napisaniem kodu. Po każdej zmianie merytorycznej - commit (i push do GitHub, gdy repozytorium będzie założone).

## Cel
Dodatek, który daje graczowi specjalny stół do craftingu z przepisami na przedmioty z serii „Pamiętnik ośmiobitowego wojownika”.

## Technologia
Minecraft Bedrock (Windows), dodatek (add-on): zwykłe pliki tekstowe JSON i obrazki, bez programowania w Javie. Wersję gry i format dodatku potwierdzamy w dokumentacji Bedrocka przy starcie etapu 1.

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
1. Stół do craftingu (osobny blok, obok zwykłego stołu) z dwoma przepisami: maczuga z pryzmarynu i sztylet. Stół nie jest do wykraftowania - gracz dostaje go komendą `/give` (wymaga włączonych cheatów).
2. Pojawianie się stołu w świecie lub w strukturach. Możliwości dodatków Bedrocka do sprawdzenia w dokumentacji przed startem etapu.
3. Na później, tylko jako ewentualność: umiejętności bohatera i fabuła z książki.
