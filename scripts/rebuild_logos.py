"""Rebuild the two logo variants from the pristine source.

Rules from the client
---------------------
- Do NOT touch the bear, the red "САМСОН" word or its navy outline.
- ``logo-dark.png`` — for LIGHT sections: the ORIGINAL logo, unchanged
  (only the near-black studio background is turned into full transparency).
- ``logo.png``      — for DARK sections: SAME logo, only the outer-ring
  lettering ("КЛУБ ЕДИНОБОРСТВ · САМБО И ДЗЮДО") is recoloured white so it
  stays legible on dark backgrounds.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path("/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets")
SRC = ROOT / "logo-src.png"

# Everything at r > RING_START * (W/2) belongs to the outer ring – i.e. the
# circular lettering plus the two red dots on the sides. The central bear
# and "САМСОН" word live inside this radius and are never touched.
RING_START = 0.60


def make_transparent(img):
    """Turn the near-black studio background into full transparency."""
    arr = np.asarray(img.convert("RGBA")).astype(np.int16)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    max_ch = np.maximum(np.maximum(r, g), b)
    min_ch = np.minimum(np.minimum(r, g), b)
    is_bg = (max_ch < 55) & ((max_ch - min_ch) < 18)

    # Feather the mask so the artwork doesn't get a hard black rim.
    m_img = Image.fromarray((is_bg.astype(np.uint8) * 255), "L")
    m_img = m_img.filter(ImageFilter.MaxFilter(3))
    m_img = m_img.filter(ImageFilter.GaussianBlur(radius=0.8))
    bg = np.asarray(m_img).astype(np.float32) / 255.0

    new_alpha = (a.astype(np.float32) * (1.0 - bg)).clip(0, 255).astype(np.uint8)
    out = np.dstack(
        [r.astype(np.uint8), g.astype(np.uint8), b.astype(np.uint8), new_alpha]
    )
    return Image.fromarray(out, "RGBA")


def outer_ring_mask(shape):
    h, w = shape[:2]
    cy, cx = h / 2.0, w / 2.0
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.sqrt(((y - cy) / cy) ** 2 + ((x - cx) / cx) ** 2)
    return r > RING_START


def samson_protection_mask(arr, dilate_size=25):
    """Protect the red САМСОН letters and their immediate navy outline."""
    r, g, b, al = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]
    red = (r > 150) & (g < 95) & (b < 95) & (al > 80)
    red_img = Image.fromarray((red.astype(np.uint8) * 255), "L")
    dilated = red_img.filter(ImageFilter.MaxFilter(dilate_size))
    return np.asarray(dilated) > 0


def recolor_ring_navy_white(img):
    """Recolour navy-ish opaque pixels in the OUTER RING to pure white.

    Central bear + red "САМСОН" and its navy outline are left untouched
    because they sit inside the ring radius.
    """
    arr = np.asarray(img).copy()
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    ir = r.astype(np.int16)
    ig = g.astype(np.int16)
    ib = b.astype(np.int16)

    navy = (
        (ib > ir - 5)
        & (ib > ig - 5)
        & (ir < 130)
        & (ig < 130)
        & (a > 60)
    )
    # Never touch the red dots.
    red = (ir > 150) & (ig < 100) & (ib < 100)
    navy &= ~red

    mask = navy & outer_ring_mask(arr.shape) & ~samson_protection_mask(arr)

    arr[mask, 0] = 255
    arr[mask, 1] = 255
    arr[mask, 2] = 255
    print(f"  recoloured {int(mask.sum())} ring px → white")
    return Image.fromarray(arr, "RGBA")


def main():
    src = Image.open(SRC).convert("RGBA")
    clean = make_transparent(src)

    # Light-bg logo = original artwork, transparent background.
    clean.save(ROOT / "logo-dark.png")
    print(f"saved {ROOT / 'logo-dark.png'} (original, transparent bg)")

    # Dark-bg logo = original + ring lettering flipped to white.
    dark_bg = recolor_ring_navy_white(clean)
    dark_bg.save(ROOT / "logo.png")
    print(f"saved {ROOT / 'logo.png'} (ring lettering white)")


if __name__ == "__main__":
    main()
