"""Turn the blue/yellow mats on the judo & sambo photos into a black studio
backdrop, then convert the whole frame to a clean monochrome look.

The mat colours (bright blue, bright yellow) are detected in HSV space and
faded to black, while dark navy gis (low value) are preserved so the athletes
keep their form. The result is a grayscale, high-contrast "studio" image.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

SRC = "/Users/viktoriakomarova/Desktop/Направления фото"
DST = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets/directions"


def rgb_to_hsv(arr):
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    mx = np.max(arr, axis=-1)
    mn = np.min(arr, axis=-1)
    diff = mx - mn + 1e-6

    h = np.zeros_like(mx)
    mask = mx == r
    h[mask] = (60 * ((g[mask] - b[mask]) / diff[mask]) + 360) % 360
    mask = mx == g
    h[mask] = (60 * ((b[mask] - r[mask]) / diff[mask]) + 120) % 360
    mask = mx == b
    h[mask] = (60 * ((r[mask] - g[mask]) / diff[mask]) + 240) % 360

    s = diff / (mx + 1e-6)
    v = mx
    return h, s, v


def process(name_in, name_out, dilate=3, blur=7, vig_strength=0.78):
    img = Image.open(f"{SRC}/{name_in}").convert("RGB")
    arr = np.asarray(img).astype(np.float32) / 255.0
    h, s, v = rgb_to_hsv(arr)

    # Bright blue mat (exclude dark navy gis via value threshold).
    blue = (h >= 195) & (h <= 255) & (s > 0.28) & (v > 0.34)
    # Bright yellow / warm mat (skin is more orange & less saturated -> excluded).
    yellow = (h >= 33) & (h <= 72) & (s > 0.30) & (v > 0.32)

    mat = (blue | yellow).astype(np.uint8) * 255

    # Grow the mask so it swallows the thin white boundary lines that sit on the
    # mats (they are white, so not colour-detected), then feather the edges.
    mask_img = Image.fromarray(mat, "L")
    if dilate >= 3:
        mask_img = mask_img.filter(ImageFilter.MaxFilter(size=dilate))
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=blur))
    m = np.asarray(mask_img).astype(np.float32) / 255.0

    # Monochrome base with a gentle contrast boost.
    gray = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    gray = np.clip((gray - 0.5) * 1.14 + 0.5, 0.0, 1.0)

    # Fade the detected mat regions to black.
    out = gray * (1.0 - m)

    # Radial vignette: keep the central athletes bright, push the edges (and
    # stray mat lines / bright corners) down to black for a studio backdrop.
    hgt, wid = gray.shape
    yy, xx = np.mgrid[0:hgt, 0:wid].astype(np.float32)
    xx = (xx - wid / 2) / (wid / 2)
    yy = (yy - hgt / 2) / (hgt / 2)
    d2 = xx * xx + yy * yy
    vig = np.clip(1.32 - vig_strength * d2, 0.0, 1.0)
    out = out * vig

    out_u8 = np.clip(out * 255.0, 0, 255).astype(np.uint8)
    rgb = np.stack([out_u8, out_u8, out_u8], axis=-1)
    Image.fromarray(rgb, "RGB").save(f"{DST}/{name_out}", quality=90)
    print(f"saved {name_out}  mat coverage={m.mean():.2%}")


if __name__ == "__main__":
    # Judo: clean blue mat, subjects fill the frame -> minimal dilation.
    process("Дзюдо.jpg", "judo.jpg", dilate=0, blur=6, vig_strength=0.62)
    # Sambo: big yellow+blue mats with white boundary lines -> grow the mask.
    process("Самбо.jpg", "sambo.jpg", dilate=13, blur=8, vig_strength=0.8)
