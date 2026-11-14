// firebase-config.js
// Konfigurasi publik Firebase. Aman ditaruh di frontend, karena keamanan yang sebenarnya
// dijaga oleh Firebase Authentication + Firestore Rules + Storage Rules.
// GANTI nilai di bawah dengan konfigurasi dari:
// Firebase Console > Project settings > Your apps > Web app > SDK setup and configuration

export 
App nickname
3 GARAGE
App ID 
1:629546753601:web:8f01d6ece1138b6cd1f0c0
SDK setup and configuration

npm

CDN

Config
If you're already using npm and a module bundler such as webpack or Rollup, you can run the following command to install the latest SDK (Learn more):

npm install firebase
Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD6rrP-XxDYYOIBGIFRWKLrbhY3YSVDhU",
  authDomain: "nandamencoba.firebaseapp.com",
  projectId: "nandamencoba",
  storageBucket: "nandamencoba.firebasestorage.app",
  messagingSenderId: "629546753601",
  appId: "1:629546753601:web:8f01d6ece1138b6cd1f0c0"
};

// Nilai awal. Dipakai jika dokumen site/config belum pernah disimpan dari admin.
export const DEFAULT_SITE = {
  logoUrl: "",
  faviconUrl: "",
  bgUrl: "",
  accentColor: "#e10600",

  heroBgUrl: "",
  heroTitle: "3 GARAGE",
  heroSubtitle: "SUBARU & MAZDA SPECIALIST",
  heroTagline: "SERVICE • SPAREPART • PERFORMANCE",
  heroSlogan: "Performa Maksimal, Perjalanan Lebih Nyaman",
  heroBtnBooking: "Booking Servis",
  heroBtnCatalog: "Katalog Sparepart",

  bannerUrl: "",
  bannerTitle: "BOOKING SERVIS SEKARANG",
  bannerDesc: "Isi form berikut untuk booking servis mobil Subaru atau Mazda Anda.",

  youtubeUrl: "",
  aboutTitle: "LEBIH DARI SEKADAR",
  aboutHighlight: "BENGKEL",
  aboutDesc: "3 GARAGE hadir untuk memberikan layanan terbaik untuk mobil Subaru dan Mazda kesayangan Anda.",
  aboutImageUrl: "",
  aboutBtn: "Tentang Kami",
  aboutPoints: [
    "Servis Profesional & Berpengalaman",
    "Sparepart Original & Berkualitas",
    "Harga Transparan & Kompetitif"
  ],
  aboutFeatures: [
    { icon: "wrench", title: "Servis Profesional" },
    { icon: "gear", title: "Sparepart Lengkap" },
    { icon: "shield", title: "Garansi Kualitas" }
  ],

  productsTitle: "PRODUK SPAREPART UNGGULAN",
  whatsappNumber: "",

  socials: {
    instagram: { url: "", label: "", show: true },
    tiktok: { url: "", label: "", show: true },
    youtube: { url: "", label: "", show: true },
    whatsapp: { url: "", label: "", show: true }
  },

  footerContact: "",
  footerAddress: "",
  copyright: "© 2026 3 GARAGE. All Rights Reserved.",

  nav: [
    { label: "Beranda", target: "#beranda", show: true },
    { label: "Booking Servis", target: "#booking", show: true },
    { label: "Catalog Sparepart", target: "#produk", show: true },
    { label: "Sosial Media", target: "#sosial", show: true }
  ],

  sections: { hero: true, about: true, products: true, booking: true, social: true },

  maintenance: false,
  maintenanceMsg: "Website sedang dalam perawatan. Silakan kembali beberapa saat lagi."
};

export const SERVICE_TYPES = [
  "Servis Berkala",
  "Ganti Oli",
  "Tune Up & Performance",
  "Cek Kaki-Kaki & Rem",
  "Perbaikan Mesin",
  "Diagnosa / Cek Umum",
  "Lainnya"
];

export const STATUSES = ["Menunggu", "Dikonfirmasi", "Selesai", "Dibatalkan"];

// ---------- Helper bersama ----------

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export const safeCssUrl = (u) => String(u || "").replace(/[\s"'()<>\\]/g, "");

export const rupiah = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export const waLink = (number, text) =>
  `https://wa.me/${String(number).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const ytId = (url) => {
  const m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
};

// 08xxxx -> 628xxxx
export function normalizePhone(p) {
  let s = String(p || "").replace(/[\s\-()]/g, "");
  if (s.startsWith("+")) s = s.slice(1);
  if (s.startsWith("0")) s = "62" + s.slice(1);
  return s;
}

export const isValidPhone = (s) => /^628\d{7,11}$/.test(s);

export function todayStr() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

// Gabungkan konfigurasi dari Firestore dengan nilai default (aman untuk field yang belum ada)
export function mergeSite(data = {}) {
  const d = structuredClone(DEFAULT_SITE);
  for (const k of Object.keys(data)) {
    if (k === "sections") d.sections = { ...d.sections, ...data.sections };
    else if (k === "socials") continue;
    else d[k] = data[k];
  }
  for (const s of Object.keys(d.socials)) {
    d.socials[s] = { ...DEFAULT_SITE.socials[s], ...(data.socials?.[s] || {}) };
  }
  return d;
}

// Akses nested key, contoh: "socials.instagram.url"
export const getPath = (obj, path) => path.split(".").reduce((a, k) => a?.[k], obj);
export function setPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((a, k) => (a[k] ??= {}), obj);
  target[last] = value;
  return obj;
}

// ---------- Ikon SVG (garis, tanpa library) ----------
const ICON_PATHS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-2.8z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.2-5.4A8.5 8.5 0 1 1 21 11.5z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
  tiktok: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>'
};

export function icon(name, cls = "") {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ""}</svg>`;
}
