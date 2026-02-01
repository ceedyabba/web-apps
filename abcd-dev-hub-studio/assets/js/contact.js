// =========================
// Contact page only
// Form validation + feedback
// =========================

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return; // only run on contact page

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const nameErr = document.getElementById("nameErr");
  const emailErr = document.getElementById("emailErr");
  const subjectErr = document.getElementById("subjectErr");
  const messageErr = document.getElementById("messageErr");
  const success = document.getElementById("formSuccess");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function clearMessages() {
    nameErr.textContent = "";
    emailErr.textContent = "";
    subjectErr.textContent = "";
    messageErr.textContent = "";
    success.textContent = "";
  }

  function setError(el, msg) {
    el.textContent = msg;
  }

  function validate() {
    clearMessages();
    let ok = true;

    const nameVal = fullName.value.trim();
    const emailVal = email.value.trim();
    const subjectVal = subject.value.trim();
    const msgVal = message.value.trim();

    if (nameVal.length < 2) {
      setError(nameErr, "Please enter your full name (at least 2 characters).");
      ok = false;
    }

    if (!emailRegex.test(emailVal)) {
      setError(emailErr, "Enter a valid email address.");
      ok = false;
    }

    if (subjectVal.length < 3) {
      setError(subjectErr, "Subject should be at least 3 characters.");
      ok = false;
    }

    if (msgVal.length < 10) {
      setError(messageErr, "Message should be at least 10 characters.");
      ok = false;
    }

    return ok;
  }

  // Live validation (optional but nice)
  [fullName, email, subject, message].forEach((input) => {
    input.addEventListener("input", () => {
      // only re-check the field being typed (simple)
      validate();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ok = validate();
    if (!ok) return;

    // demo success message (no backend)
    success.textContent = "Message sent successfully. Thanks for reaching out!";

    // reset form after success
    form.reset();
  });
})();
