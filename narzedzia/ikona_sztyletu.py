# Rysuje ikonę sztyletu 16x16 (ukośnie jak miecz, ok. 2/3 jego długości) i powiększenie 256x256.
# Użycie: python narzedzia/ikona_sztyletu.py dodatek/RP/textures/items/sztylet.png podglad.png
import sys
from PIL import Image

wyjscie, podglad = sys.argv[1], sys.argv[2]
K = (40, 40, 45, 255)     # obrys / ciemny grzbiet ostrza
S = (150, 155, 160, 255)  # stal
J = (225, 230, 235, 255)  # jasna krawędź tnąca
B = (74, 47, 24, 255)     # ciemny brąz rączki
b = (122, 82, 48, 255)    # brąz rączki
P = (90, 90, 95, 255)     # poprzeczka

img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
px = img.load()

# Ostrze: środek po przekątnej od poprzeczki (7,8) do czubka (12,3); grzbiet nad środkiem, krawędź tnąca pod nim
for x in range(7, 13):
    y = 15 - x
    px[x, y] = S
    px[x, y - 1] = K
    px[x + 1, y] = J
px[13, 2] = J

# Poprzeczka: prostopadle do ostrza, przez punkt (6,9)
for p in [(4, 7), (5, 8), (6, 9), (7, 10), (8, 11)]:
    px[p] = P

# Rączka: od poprzeczki w dół do lewego rogu, cień pod spodem, ciemna gałka na końcu
for x in range(3, 6):
    px[x, 15 - x] = b
    px[x, 16 - x] = B
px[2, 13] = B

img.save(wyjscie)
img.resize((256, 256), Image.NEAREST).save(podglad)

# Sprawdzenie: rozmiar, liczba pikseli rysunku, przezroczystość tła
spr = Image.open(wyjscie)
widoczne = sum(1 for a in spr.getchannel("A").getdata() if a > 0)
print("rozmiar:", spr.size, "tryb:", spr.mode, "pikseli rysunku:", widoczne, "przezroczystych:", 256 - widoczne)
