
  document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
      accordion.addEventListener('click', function() {
        this.classList.toggle('active');
        const description = this.nextElementSibling; // Cambia 'accordion-content' a 'accordion-description'
        if (description.style.display === "block") {
          description.style.display = "none";
        } else {
          description.style.display = "block";
        }
      });
    });
  });
s