"use strict";

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const abaBtn = document.getElementById("btn-funcionamento");
const aba = document.getElementById("aba-informacoes");

/* ---------- Ano no rodapé (só se existir) ---------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ---------- Sombra no cabeçalho ao rolar ---------- */
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------- Menu mobile ---------- */
const info = document.querySelector(".nav-info details");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  if (!open && info) info.open = false; // fecha a sanfona junto com o menu
}

menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

/* ---------- Aba "Funcionamento e Local" (computador) ---------- */
function setAba(open) {
  aba.classList.toggle("mostrar", open);
  abaBtn.setAttribute("aria-expanded", String(open));
}

if (abaBtn && aba) {
  abaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setAba(!aba.classList.contains("mostrar"));
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!aba.contains(e.target) && e.target !== abaBtn) setAba(false);
  });
}

/* ---------- Esc fecha menu e aba ---------- */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  setMenu(false);
  if (abaBtn && aba) setAba(false);
});