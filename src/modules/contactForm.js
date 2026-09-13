// Placeholder del formulario de contacto: intercepta el submit para que no
// recargue la página y avisa que todavía no está conectado.
// TODO: implementar envío real con Formspree o EmailJS (email de Pánico).
export function initContactForm() {
  const form = document.querySelector('.contacto__form')
  if (!form) return

  const estado = form.querySelector('.contacto__estado')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (estado) {
      estado.textContent =
        'Formulario aún no conectado — pendiente de Formspree/EmailJS.'
    }
  })
}