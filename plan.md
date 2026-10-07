# plan.md

Wysokopoziomowy plan projektu: mod do Minecrafta (Fabric, Java Edition 1.21.11) inspirowany serią „Pamiętnik ośmiobitowego wojownika”.

Jak używać: plik opisuje cel, etapy i kluczowe decyzje. Uzupełniamy go przed napisaniem kodu. Po każdej zmianie merytorycznej - commit i push do GitHub.

## Cel
Mod, dzięki któremu gracz może wcielić się w głównego bohatera serii „Pamiętnik ośmiobitowego wojownika”.

## Technologia
Fabric (system modów), Minecraft Java Edition 1.21.11, język Java. Zgodność Fabric z 1.21.11 potwierdzona (2026-10-07).

### Dwa komputery
- Komputer taty (ten): tylko pisanie i budowanie moda (JDK, edytor). Minecraft NIE jest tu instalowany, więc nie uruchamiamy testowego klienta gry na tym komputerze.
- Komputer użytkownika: granie i testowanie. Potrzebuje Minecrafta 1.21.11, Fabric Loadera, Fabric API i pliku `.jar` z modem. Plik `.jar` przenosimy z komputera taty (pendrive lub chmura).
- Skutek: każdy test moda to zbudowanie `.jar`, przeniesienie go i uruchomienie gry na komputerze użytkownika.

## Kto decyduje
Gracz. Ekwipunek bohatera leży w grze, a gracz sam go zbiera i używa. Mod niczego nie wymusza.

## Etapy
1. Wygląd i ekwipunek - przedmioty bohatera (np. miecz, zbroja) zbierane przez gracza.
2. Umiejętności - specjalne ataki i moce bohatera.
3. Fabuła - zadania, postacie i wydarzenia z książki.
