# todo.md

Lista wątków pobocznych, które pojawiły się przy okazji pracy nad czymś innym.

Jak używać: gdy w trakcie pracy pojawia się równoległy pomysł, zapisujemy go tu jedną linijką i wracamy do bieżącego zadania. Zrobione wątki skreślamy.
- Uderzanie stołu wojownika bronią (np. maczugą) zużywa jej wytrzymałość - rozważyć wyłączenie (zdarzenie onBeforeDurabilityDamage).
- Proca: obrazek w ręku zmieniający się w 3 krokach przy naciąganiu. Wymaga własnego modelu w ręku (attachable) z wyborem tekstury wg czasu użycia; gra ma gotowe kształty `geometry.bow_pulling_0..2`, ale bez testu w grze nie da się tego ustawić pewnie.
- Sztylet: szybkość ataku 2,5 na sekundę. Bedrock nie ma odnowienia ataku (każde kliknięcie to pełny cios), a mob po ciosie jest nietykalny ok. 0,5 s, więc ten sam mob przyjmuje najwyżej 2 ciosy na sekundę - dla każdej broni. Dodatek nie ma wpływu na żadne z nich.
