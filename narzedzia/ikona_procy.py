# Rysuje ikonę procy 16x16 (drewniana litera Y ukośnie, rączka w lewym dolnym rogu, dwie nici i szara kieszeń) i powiększenie 256x256.
# Użycie: python narzedzia/ikona_procy.py dodatek/RP/textures/items/proca.png podglad.png
import sys
from PIL import Image

wyjscie, podglad = sys.argv[1], sys.argv[2]
B = (74, 47, 24, 255)     # ciemny brąz (cień drewna)
b = (122, 82, 48, 255)    # brąz drewna
j = (160, 115, 70, 255)   # jasny brąz (końce rozwidlenia)
N = (235, 235, 225, 255)  # nić
G = (110, 110, 110, 255)  # kieszeń
g = (150, 150, 150, 255)  # jasna krawędź kieszeni

img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
px = img.load()

# Rączka: gruba ukośna linia z lewego dolnego rogu do rozwidlenia w (7,8), cień pod spodem
for x in range(1, 8):
    px[x, 15 - x] = b
    px[x, 16 - x] = B

# Ramiona: jedno w górę, drugie w prawo - lustrzane odbicia względem przekątnej rączki (x,y) -> (15-y,15-x)
ramie = [(7, 7), (7, 6), (8, 5), (8, 4), (9, 3), (9, 2)]
for (x, y) in ramie:
    px[x, y] = b
    px[15 - y, 15 - x] = b
    px[x - 1, y] = B          # cień po lewej stronie górnego ramienia
    px[15 - y, 16 - x] = B    # cień pod prawym ramieniem
px[9, 1] = j
px[14, 6] = j

# Nici od końców ramion do kieszeni, kieszeń pośrodku
for p in [(10, 2), (10, 3), (13, 5), (12, 5)]:
    px[p] = N
for p in [(11, 3), (11, 4), (12, 4)]:
    px[p] = G
px[12, 3] = g

img.save(wyjscie)
img.resize((256, 256), Image.NEAREST).save(podglad)

# Sprawdzenie: rozmiar, liczba pikseli rysunku, przezroczystość tła
spr = Image.open(wyjscie)
widoczne = sum(1 for a in spr.getchannel("A").getdata() if a > 0)
print("rozmiar:", spr.size, "tryb:", spr.mode, "pikseli rysunku:", widoczne, "przezroczystych:", 256 - widoczne)
