# testy.md

Lista prób w grze do wykonania przez użytkownika i ich wyniki.

Jak używać:
- Agent dopisuje blok `## Przedmiot (data)` z ponumerowanymi próbami: co zrobić w grze i czego się spodziewać.
- Użytkownik po teście dopisuje na końcu każdej próby `-> OK` albo `-> BŁĄD: co się stało`.
- Przykład: `1. Włóż 4 patyki + 1 nić, uderz stół. Oczekiwane: w skrzyni 1 proca. -> OK`

## Proca (2026-10-15)
1. Włóż do stołu 4 patyki + 1 nić, uderz stół. Oczekiwane: w skrzyni 1 proca z ikoną drewnianego Y z nicią. ->
2. Włóż 3 patyki + 1 nić, uderz stół. Oczekiwane: nic się nie zmienia. ->
3. Włóż 4 patyki + 1 nić + 1 żelazo, uderz stół. Oczekiwane: nic się nie zmienia. ->
4. Włóż 1 żelazo + 1 patyk, uderz stół. Oczekiwane: sztylet (stary przepis działa). ->
5. Tryb przetrwania (`/gamemode s`), bruk w ekwipunku, proca w ręku: przytrzymaj prawy przycisk ok. 1 s i puść. Oczekiwane: gracz zwalnia przy naciąganiu, dźwięk łuku, leci szary kamień, ubywa 1 bruku, pasek wytrzymałości procy lekko spada. ->
6. Bez bruku w ekwipunku spróbuj strzelić. Oczekiwane: nie leci nic. ->
7. Strzel do zombie raz z krótkim naciągiem (ok. 0,3 s) i raz z pełnym (1 s+). Oczekiwane: pełny naciąg zadaje więcej (w logu linie `[proca] cel=... obrazenia=...`). ->
8. Strzel raz z łuku (pełny naciąg) i raz z procy (pełny naciąg). Oczekiwane: w logu dwie linie `[pomiar]` - łuk ok. 3,0, kamień ok. 2,34; kamień leci wyraźnie bliżej niż strzała. ->
9. Po wszystkim: zamknij świat. Oczekiwane: 0 błędów w logu (sprawdza agent). ->

## Sztylet - efekty (2026-10-15)
1. Ikona sztyletu w ekwipunku: krótkie stalowe ostrze ukośnie, poprzeczka, brązowa rączka. ->
2. Tryb przetrwania, żelazny golem (`/summon iron_golem`), uderzaj go sztyletem tylko z przodu (golem patrzy na ciebie). Oczekiwane: w logu linie `[sztylet] ... od_tylu=nie`, `zycie` spada o 4 na cios. ->
3. Uderzaj golema od tyłu (np. gdy idzie w inną stronę). Oczekiwane: linie z `od_tylu=tak`, `zycie` spada o 8 na cios. ->
4. Pasek wytrzymałości sztyletu spada przy ciosach. ->
5. Przytrzymaj prawy przycisk ok. 0,2 s i puść. Oczekiwane: brak rzutu. ->
6. Przytrzymaj prawy przycisk co najmniej 0,5 s i puść, celując w ziemię kilka bloków dalej. Oczekiwane: sztylet znika z ręki, leci obracając się, po upadku leży na ziemi jako przedmiot do podniesienia. ->
7. Rzuć sztyletem w zombie. Oczekiwane: zombie traci życie (5 pkt), sztylet spada obok. ->
8. Rzuć sztyletem pod kątem ok. 45° w górę na płaskim terenie. Oczekiwane: upada ok. 20 bloków od gracza. ->
9. Tryb kreatywny: rzuć sztyletem. Oczekiwane: sztylet leci, ale zostaje w ręku. ->
10. Proca (po przeróbce na wspólny moduł) nadal strzela jak w próbach 5-8 procy. ->
11. Po wszystkim: zamknij świat. Oczekiwane: 0 błędów w logu (sprawdza agent). ->

## Poprawki po teście 1 (2026-10-15)
Wynik testu 1 (z rozmowy i logu): cios sztyletem od tyłu rozpoznawany dobrze, ale zadawał 12 zamiast 8; kamień z procy widoczny, leci, zużywa bruk, nie rani mobów; 0 błędów w logu.
1. Proca, pełny naciąg, strzał prosto w zombie z 5 bloków. Oczekiwane: zombie mruga na czerwono; w logu `[proca] trafienie=minecraft:zombie` i `[proca] cel=minecraft:zombie obrazenia=...`. Napisz, czy kamień przeleciał przez zombie. ->
2. Proca, strzał w ziemię. Oczekiwane: kamień znika po uderzeniu (nie zostaje w ziemi). ->
3. Łuk, pełny naciąg, 1 strzał (strzały w ekwipunku). Oczekiwane: w logu `[pomiar] minecraft:arrow predkosc=...`. ->
4. Proca, pełny naciąg. Oczekiwane: w logu `[pomiar] osm:kamien_z_procy predkosc=` ok. 2,3 (wcześniej 4,47). ->
5. Sztylet: 3 ciosy w golema od tyłu. Oczekiwane: `zycie` spada o 8 na cios (wcześniej 12). ->
6. Rzut sztyletem pod kątem ok. 45° na płaskim terenie. Oczekiwane: upada ok. 20 bloków od gracza; w logu `[sztylet] trafienie=blok`. ->
7. Rzut sztyletem w moba. Oczekiwane: mob traci życie, sztylet spada obok; w logu `[sztylet] trafienie=minecraft:...`. ->
8. Ikony procy i sztyletu w ekwipunku wyglądają jak w opisie z `przepisy.md`. ->
9. Zamknij świat. Oczekiwane: 0 błędów w logu (sprawdza agent). ->

## Granat (2026-10-19)
1. Włóż do stołu 4 żelaza + 4 proch + 1 kulę ognia, uderz stół. Oczekiwane: w skrzyni 4 granaty z ikoną ciemnej kuli z czerwonym paskiem i lontem. ->
2. Włóż 4 żelaza + 4 proch (bez kuli ognia), uderz stół. Oczekiwane: nic się nie zmienia. ->
3. Tryb przetrwania, granaty w ręku, kliknij prawym w ziemię kilka bloków dalej. Oczekiwane: leci szara kula, przy uderzeniu błysk, trochę dymu, czerwone iskry, dźwięk pękającego narzędzia; ubywa 1 granat; blok cały. ->
4. Rzuć granatem prosto w zombie z 5 bloków. Oczekiwane: zombie ginie (50 pkt > 20 życia); w logu `[granat] trafienie=minecraft:zombie` i `[granat] cel=minecraft:zombie odleglosc=0...`. Napisz, czy granat wybuchł na zombie, czy przeleciał przez niego. ->
5. Postaw 3 żelazne golemy (`/summon iron_golem`) w odległości ok. 1, 3 i 6 bloków od miejsca, gdzie rzucisz granat w ziemię. Oczekiwane: w logu golem 1 bloku ok. 40 pkt, 3 bloków ok. 20 pkt, 6 bloków brak wpisu. ->
6. Rzuć granatem pod sobą (pod nogi). Oczekiwane: gracz nie traci życia. ->
7. Rzuć granatem pod kątem ok. 45° w górę na płaskim terenie. Oczekiwane: wybuch ok. 20 bloków od gracza. ->
8. Tryb kreatywny: rzut. Oczekiwane: granat leci i wybucha, liczba granatów w ręku się nie zmienia. ->
9. Zamknij świat. Oczekiwane: 0 błędów w logu (sprawdza agent). ->
