"""Recolor the stray white halo that appears around the red "САМСОН" word to the
brand navy, matching the rest of the word's outline.

Only white pixels that sit right next to the existing navy stroke (and inside the
word's bounding box) are affected, so the white circular lettering and the white
letter counters are left untouched.
"""
import numpy as np
from PIL import Image, ImageFilter

PATH = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets/logo.png"
SRC = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets/logo-src.png"


def brand_navy():
    a = np.asarray(Image.open(SRC).convert("RGB")).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    navy = (b > r + 20) & (b > g + 10) & (r < 80) & (b > 45) & (b < 130)
    px = a[navy]
    return tuple(int(v) for v in np.median(px, axis=0))


def main():
    navy = brand_navy()
    print("brand navy:", navy)

    img = Image.open(PATH).convert("RGBA")
    arr = np.asarray(img).astype(np.int16)
    r, g, b, al = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    # Red letters -> bounding box of the word.
    red = (r > 150) & (g < 95) & (b < 95) & (al > 100)
    ys, xs = np.where(red)
    y0, y1 = ys.min() - 22, ys.max() + 22
    x0, x1 = xs.min() - 22, xs.max() + 22
    print("word bbox:", x0, y0, x1, y1)

    # Existing navy stroke, dilated a few px so we know what "next to navy" means.
    navy_mask = (b > r + 15) & (b > g + 5) & (r < 95) & (b > 45) & (al > 80)
    navy_img = Image.fromarray((navy_mask * 255).astype(np.uint8), "L")
    navy_near = np.asarray(navy_img.filter(ImageFilter.MaxFilter(11))) > 0

    # Stray white halo = whitish + opaque + touching navy.
    white = (r > 185) & (g > 185) & (b > 185) & (al > 110)

    box = np.zeros_like(red)
    box[max(y0, 0):y1, max(x0, 0):x1] = True

    halo = white & navy_near & box
    print("halo pixels:", int(halo.sum()))

    out = np.asarray(img).copy()
    out[halo, 0] = navy[0]
    out[halo, 1] = navy[1]
    out[halo, 2] = navy[2]
    Image.fromarray(out, "RGBA").save(PATH)
    print("saved", PATH)


if __name__ == "__main__":
    main()
