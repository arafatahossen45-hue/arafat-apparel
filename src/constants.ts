export const CONTACT_INFO = {
  whatsapp: "+8801607223922",
  email: "arafatahossen45@gmail.com",
  instagram: "https://www.instagram.com/arafatapparel/",
  behance: "https://www.behance.net/ArafatApparelT-shirt",
  facebook: "https://www.facebook.com/arafatapparel/",
  fiverr: "https://www.fiverr.com/arafat21462?public_mode=true",
  twitter: "https://x.com/arafatapparel",
  telegram: "https://t.me/arafatapparel"
};

export const getWhatsAppUrl = (message: string) => {
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMsg}`;
};
