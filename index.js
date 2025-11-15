document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        const parentLi = this.closest(".nav-dropdown-item");
        if (parentLi) {
          parentLi.classList.toggle("active");
        }
      }
    });
  }
  const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, "");
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    const linkPath = link.getAttribute("href").toLowerCase().replace(/\/$/, "");
    if (
      currentPath === linkPath ||
      (currentPath === "/home.html" && linkPath === "/") ||
      (currentPath === "/" && linkPath === "/home.html")
    ) {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
  const form = document.getElementById("contact-form");
  const statusDiv = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        statusDiv.textContent = "Message sent successfully!";
        statusDiv.style.color = "green";
        form.reset();
      } else {
        const errorData = await response.json();
        statusDiv.textContent =
          "Error: " + (errorData.error || "Failed to send message.");
        statusDiv.style.color = "red";
      }
    } catch (error) {
      statusDiv.textContent = "Error: " + error.message;
      statusDiv.style.color = "red";
    }
  });
});
