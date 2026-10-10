# plan.md

Wysokopoziomowy plan projektu: dodatek do Minecraft Bedrock inspirowany serią „Pamiętnik ośmiobitowego wojownika”.

Jak używać: plik opisuje cel, etapy i kluczowe decyzje. Uzupełniamy go przed napisaniem kodu. Po każdej zmianie merytorycznej - commit (i push do GitHub, gdy repozytorium będzie założone).

## Cel
Dodatek, który daje graczowi specjalny stół do craftingu z przepisami na przedmioty z serii „Pamiętnik ośmiobitowego wojownika”.

## Technologia
Minecraft Bedrock (Windows), dodatek (add-on): zwykłe pliki tekstowe JSON i obrazki, bez programowania w Javie. Wersję gry i format dodatku potwierdzamy w dokumentacji Bedrocka przy starcie etapu 1.

### Dwa komputery
- Komputer taty (ten): tylko pisanie dodatku (edytor tekstu). Minecraft NIE jest tu instalowany, więc nie testujemy tu gry.
- Komputer użytkownika (Windows): granie i testowanie. Dodatek przenosimy z komputera taty (pendrive lub chmura) jako folder lub plik `.mcaddon`.
- Skutek: każdy test dodatku to przeniesienie go i uruchomienie gry na komputerze użytkownika.

## Kto decyduje
Gracz. Stół i przedmioty leżą w grze, a gracz sam je zdobywa i używa. Dodatek niczego nie wymusza.

## Etapy
1. Stół do craftingu (osobny blok, obok zwykłego stołu) z dwoma przepisami: maczuga z pryzmarynu i sztylet. Stół nie jest do wykraftowania - gracz dostaje go komendą `/give` (wymaga włączonych cheatów).
2. Pojawianie się stołu w świecie lub w strukturach. Możliwości dodatków Bedrocka do sprawdzenia w dokumentacji przed startem etapu.
3. Na później, tylko jako ewentualność: umiejętności bohatera i fabuła z książki.
