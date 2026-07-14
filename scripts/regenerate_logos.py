"""Build header logos from the original source.

logo.png      — white circular text, САМСОН kept exactly as in source (navy outline)
logo-dark.png — original navy circular text, transparent background
"""
import numpy as np
from PIL import Image

ROOT = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets"
SRC = f"{ROOT}/logo-src.png"


def load_rgba():
    return np.asarray(Image.open(SRC).convert("RGBA")).copy()


def samson_box(arr, pad=28):
    r, g, b, al = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]
    red = (r > 150) & (g < 95) & (b < 95) & (al > 80)
    ys, xs = np.where(red)
    y0, y1 = ys.min() - pad, ys.max() + pad
    x0, x1 = xs.min() - pad, xs.max() + pad
    box = np.zeros(red.shape, dtype=bool)
    box[max(y0, 0) : y1, max(x0, 0) : x1] = True
    return box


def navy_text_mask(arr):
    r, g, b, al = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]
    return (b > r + 18) & (b > g + 8) & (r < 85) & (b > 45) & (b < 135) & (al > 80)


def transparent_bg(arr, threshold=34):
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    bg = (r < threshold) & (g < threshold) & (b < threshold)
    arr[bg, 3] = 0
    return arr


def save(arr, name):
    Image.fromarray(arr.astype(np.uint8), "RGBA").save(f"{ROOT}/{name}")
    print("saved", name)


def main():
    src = load_rgba()
    box = samson_box(src)

    # Dark-header logo: only recolor navy arc text outside the САМСОН word.
    light = src.copy()
    navy = navy_text_mask(light) & ~box
    light[navy, 0:3] = 255
    light = transparent_bg(light)
    save(light, "logo.png")

    # Light-header logo: keep source colors, just add transparency.
    dark = transparent_bg(src.copy())
    save(dark, "logo-dark.png")


if __name__ == "__main__":
    main()
