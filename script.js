document.addEventListener('DOMContentLoaded', () => {
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.style.display = (page.id === pageId) ? 'block' : 'none';
    });
  }
  window.showPage = showPage;

  // Show the home page by default
  showPage('home');

  // Contact form submit handler
  const form = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          if (thankYouMessage) {
            thankYouMessage.innerHTML = "✅ Thanks for your message! We'll get back to you soon.";
            thankYouMessage.style.display = 'block';
            thankYouMessage.style.color = 'green';
            fadeOut(thankYouMessage, 4000);
          }
        } else {
          showError();
        }
      }).catch(() => {
        showError();
      });
    });
  }

  function showError() {
    if (thankYouMessage) {
      thankYouMessage.innerHTML = "❌ Oops! There was a problem submitting your form.";
      thankYouMessage.style.display = 'block';
      thankYouMessage.style.color = 'red';
      fadeOut(thankYouMessage, 4000);
    }
  }

  // Fade out function
  function fadeOut(element, delay) {
    setTimeout(() => {
      element.style.transition = "opacity 1s ease";
      element.style.opacity = 0;
      setTimeout(() => {
        element.style.display = "none";
        element.style.opacity = 1;
      }, 1000);
    }, delay);
  }
});