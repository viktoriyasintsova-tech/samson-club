export function buildMessengerLink(platform, text, phone = "79832165555") {
  const encoded = encodeURIComponent(text);
  if (platform === "telegram") {
    return `https://t.me/share/url?url=&text=${encoded}`;
  }
  if (platform === "whatsapp") {
    return `https://wa.me/${phone}?text=${encoded}`;
  }
  return "#";
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
