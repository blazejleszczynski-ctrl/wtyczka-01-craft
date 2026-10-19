# todo.md

Lista wątków pobocznych, które pojawiły się przy okazji pracy nad czymś innym.

Jak używać: gdy w trakcie pracy pojawia się równoległy pomysł, zapisujemy go tu jedną linijką i wracamy do bieżącego zadania. Zrobione wątki skreślamy.
- Uderzanie stołu wojownika bronią (np. maczugą) zużywa jej wytrzymałość - rozważyć wyłączenie (zdarzenie onBeforeDurabilityDamage).
- Proca: obrazek w ręku zmieniający się w 3 krokach przy naciąganiu. Wymaga własnego modelu w ręku (attachable) z wyborem tekstury wg czasu użycia; gra ma gotowe kształty `geometry.bow_pulling_0..2`, ale bez testu w grze nie da się tego ustawić pewnie.
- Sztylet: szybkość ataku 2,5 na sekundę. Bedrock nie ma odnowienia ataku (każde kliknięcie to pełny cios), a mob po ciosie jest nietykalny ok. 0,5 s, więc ten sam mob przyjmuje najwyżej 2 ciosy na sekundę - dla każdej broni. Dodatek nie ma wpływu na żadne z nich.
- Proca: kamień trafia moby (7 trafień w zombie w logu 2026-10-15), ale ich nie rani (0 wpisów o zranieniu w 70+ strzałach). `impact_damage` jak w strzale gracza z gry. Rzucony sztylet rani (test 2), więc problem dotyczy tylko kamienia - różnica: `power_multiplier` i `semi_random_diff_damage` w kamieniu.
- Rzucony sztylet i kamień z procy: prawdopodobnie ten sam lot co granat przed poprawką (gra hamuje × 0,90 na tick, grawitacja 0,255), więc zasięgi 20 bloków i 2/3 łuku są pewnie dużo mniejsze. Po potwierdzeniu `prowadzLot` na granacie użyć go także w sztylecie i procy.
- Strzała wybuchowa daleko poza wczytanym terenem: `LocationInUnloadedChunkError` w `strzala.js` przy smudze iskier (89 razy) i przy wybuchu (12 razy), log 2026-10-19 20:13.
- Granat leci za daleko (test 3: prosto 20 bloków zamiast 13, w górę 50 zamiast 38): prędkość startowa ×1,12 prosto, ×1,43 w górę, kształt lotu dobry. Następny krok: wpis kierunku patrzenia przy rzucie, 2 rzuty, wyliczenie skryptem.
