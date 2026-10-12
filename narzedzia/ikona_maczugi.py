# Rysuje ikonę maczugi z pryzmarynu 16x16 (ukośnie jak miecze w Minecrafcie) i powiększenie 256x256.
# Użycie: python narzedzia/ikona_maczugi.py dodatek/RP/textures/items/maczuga_pryzmarynowa.png podglad.png
import sys
from PIL import Image

wyjscie, podglad = sys.argv[1], sys.argv[2]
K = (29, 59, 58, 255)     # obrys głowicy
D = (60, 122, 110, 255)   # ciemny pryzmaryn (cień)
P = (99, 169, 154, 255)   # pryzmaryn
L = (159, 216, 200, 255)  # jasny pryzmaryn (blask)
S = (200, 240, 228, 255)  # kolce
B = (74, 47, 24, 255)     # ciemny brąz trzonka
b = (122, 82, 48, 255)    # jasny brąz trzonka

img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
px = img.load()

# Trzonek: dwie ukośne linie z lewego dolnego rogu do głowicy, na końcu gałka z pryzmarynu
for x in range(1, 9):
    px[x, 15 - x] = b
for x in range(2, 10):
    px[x, 16 - x] = B
for p in [(0, 14), (0, 15), (1, 15)]:
    px[p] = D

# Głowica: ośmiokąt o środku (11,4); obrys na brzegu, wnętrze cieniowane po przekątnej
cx, cy = 11, 4
glowica = {(cx + dx, cy + dy) for dx in range(-3, 4) for dy in range(-3, 4) if abs(dx) + abs(dy) <= 4}
for (x, y) in glowica:
    brzeg = any((x + ox, y + oy) not in glowica for ox, oy in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    s = (x - cx) + (y - cy)
    px[x, y] = K if brzeg else (L if s <= -2 else D if s >= 2 else P)

# Kolce: góra, prawo, lewo, dół, prawy górny róg
for p in [(11, 0), (15, 4), (7, 4), (11, 8), (14, 1)]:
    px[p] = S

img.save(wyjscie)
img.resize((256, 256), Image.NEAREST).save(podglad)

# Sprawdzenie: rozmiar, liczba pikseli rysunku, przezroczystość tła
spr = Image.open(wyjscie)
widoczne = sum(1 for a in spr.getchannel("A").getdata() if a > 0)
print("rozmiar:", spr.size, "tryb:", spr.mode, "pikseli rysunku:", widoczne, "przezroczystych:", 256 - widoczne)
