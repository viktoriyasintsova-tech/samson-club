"""Regenerate logo.png from logo-dark.png.

logo-dark keeps the original navy circular text + correct red/navy SAMSON word.
logo.png converts only the circular arc text to white, leaving SAMSON outline navy.
"""
import numpy as np
from PIL import Image, ImageFilter

ASSETS = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets"


def regenerate():
    dark = np.array(Image.open(f"{ASSETS}/logo-dark.png").convert("RGBA"))
    out = dark.copy()
    r, g, b, a = dark[..., 0], dark[..., 1], dark[..., 2], dark[..., 3]

    red = (r > 150) & (g < 100) & (b < 100) & (a > 100)
    red_img = Image.fromarray((red.astype(np.uint8) * 255), "L")
    protect = np.array(red_img.filter(ImageFilter.MaxFilter(55))) > 0

    navy = (b > r + 15) & (b > g + 5) & (r < 95) & (b > 45) & (b < 130) & (a > 80)
    arc_navy = navy & ~protect

    out[arc_navy, 0] = 255
    out[arc_navy, 1] = 255
    out[arc_navy, 2] = 255

    Image.fromarray(out, "RGBA").save(f"{ASSETS}/logo.png")
    print(f"saved logo.png — arc navy -> white: {int(arc_navy.sum())} px")
    print(f"SAMSON outline kept navy: {int((navy & protect).sum())} px")


if __name__ == "__main__":
    regenerate()
