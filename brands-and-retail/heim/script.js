/* ============================================================
   HEIM — script.js
   1. Scroll-reveal animations (IntersectionObserver)
   2. Web3Forms inquiry submission (fetch, no page redirect)
   3. Small details (footer year)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target); // reveal once, then stop watching
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 2. FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 3. INQUIRY FORM (Web3Forms) ---------- */
  const form = document.getElementById("heim-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector(".form__submit");
  const submitText = form.querySelector(".form__submit-text");
  const honeypot = form.querySelector('input[name="botcheck"]');

  const setStatus = (msg, type) => {
    statusEl.textContent = msg;
    statusEl.className = "form__status" + (type ? " " + type : "");
  };

  // lightweight field validation
  const validate = () => {
    let ok = true;
    const required = form.querySelectorAll("[required]");
    required.forEach((field) => {
      const empty = !field.value.trim();
      const badEmail =
        field.type === "email" &&
        field.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (empty || badEmail) {
        field.classList.add("invalid");
        ok = false;
      } else {
        field.classList.remove("invalid");
      }
    });
    return ok;
  };

  // clear the invalid state as the user fixes a field
  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("invalid"));
    field.addEventListener("change", () => field.classList.remove("invalid"));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // honeypot: if filled, silently bail (bot)
    if (honeypot && honeypot.checked) return;

    if (!validate()) {
      setStatus("Please complete the highlighted fields.", "err");
      return;
    }

    submitBtn.disabled = true;
    if (submitText) submitText.textContent = "Sending…";
    setStatus("", "");

    try {
      const formData = new FormData(form);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        form.reset();
        setStatus("Received. The studio will be in touch.", "ok");
        if (submitText) submitText.textContent = "Sent";
      } else {
        setStatus(
          (data && data.message) || "Something went wrong. Try again.",
          "err"
        );
        if (submitText) submitText.textContent = "Send inquiry";
        submitBtn.disabled = false;
      }
    } catch (err) {
      setStatus("Network error. Please try again.", "err");
      if (submitText) submitText.textContent = "Send inquiry";
      submitBtn.disabled = false;
    }
  });
});
