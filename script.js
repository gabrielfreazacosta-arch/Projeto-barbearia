"use strict";

// Troque pelo WhatsApp da barbearia: código do país + DDD + número, só dígitos.
const WHATSAPP = "+557199370238";

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const form = document.getElementById("bookingForm");

/* ---------- Ano no rodapé ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Sombra no cabeçalho ao rolar ---------- */
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------- Menu mobile ---------- */
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Formulário ---------- */
const dateInput = form.elements.data;
dateInput.min = new Date().toISOString().split("T")[0]; // bloqueia datas passadas

function showError(field, message) {
  field.classList.toggle("invalid", Boolean(message));
  form.querySelector(`[data-for="${field.id}"]`).textContent = message;
}

function validate() {
  const { nome, servico, data, hora } = form.elements;
  let valid = true;

  const rules = [
    [nome, nome.value.trim().length >= 2, "Digite seu nome."],
    [servico, servico.value !== "", "Escolha um serviço."],
    [data, data.value !== "", "Escolha uma data."],
    [hora, hora.value !== "", "Escolha um horário."],
  ];

  rules.forEach(([field, ok, message]) => {
    showError(field, ok ? "" : message);
    if (!ok) valid = false;
  });

  if (data.value && new Date(`${data.value}T00:00`).getDay() === 0) {
    showError(data, "Aos domingos estamos fechados.");
    valid = false;
  }
  if (hora.value && (hora.value < "08:00" || hora.value > "20:00")) {
    showError(hora, "Atendemos das 08h às 20h.");
    valid = false;
  }
  return valid;
}

// Remove o comportamento antigo do formulário para não quebrar o link do HTML
const form = document.getElementById("bookingForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
    });
}


form.addEventListener("input", (e) => {
  if (e.target.classList.contains("invalid")) showError(e.target, "");
});