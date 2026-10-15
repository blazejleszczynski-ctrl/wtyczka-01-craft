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
