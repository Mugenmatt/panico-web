// Formulario de contacto: validación accesible en el cliente (errores
// inline con aria-describedby y aria-invalid) y estado de envío honesto.
// TODO: implementar envío real con Formspree o EmailJS (email de Pánico)
// cuando exista la cuenta/proveedor; el paso de envío aún no parte.
export function initContactForm() {
  const form = document.querySelector('.contacto__form')
  if (!form) return

  const estado = form.querySelector('.contacto__estado')

  // Mensajes por campo: el error nombra el problema y la recuperación.
  const validadores = [
    {
      campo: form.elements.nombre,
      error: form.querySelector('#error-nombre'),
      validar: (valor) => (valor.trim() ? '' : 'Escribí tu nombre.'),
    },
    {
      campo: form.elements.email,
      error: form.querySelector('#error-email'),
      validar: (valor) => {
        const limpiado = valor.trim()
        if (!limpiado) return 'Escribí tu email.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpiado)) {
          return 'Este email no parece válido. Revisalo.'
        }
        return ''
      },
    },
    {
      campo: form.elements.mensaje,
      error: form.querySelector('#error-mensaje'),
      validar: (valor) => (valor.trim() ? '' : 'Contanos de tu proyecto.'),
    },
  ]

  function mostrarError(entrada) {
    const mensaje = entrada.validar(entrada.campo.value)
    const invalido = Boolean(mensaje)

    entrada.campo.setAttribute('aria-invalid', String(invalido))
    if (invalido) {
      entrada.campo.closest('.contacto__campo').classList.add('is-invalid')
      entrada.campo.setAttribute('aria-describedby', entrada.error.id)
      entrada.error.textContent = mensaje
      entrada.error.hidden = false
    } else {
      entrada.campo.closest('.contacto__campo').classList.remove('is-invalid')
      entrada.campo.removeAttribute('aria-describedby')
      entrada.error.textContent = ''
      entrada.error.hidden = true
    }
    return invalido
  }

  // Al volver a escribir en un campo se limpia su error de inmediato.
  validadores.forEach((entrada) => {
    entrada.campo.addEventListener('input', () => mostrarError(entrada))
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    estado.textContent = ''

    let primerInvalido = null
    let hayErrores = false
    validadores.forEach((entrada) => {
      const invalido = mostrarError(entrada)
      if (invalido && !primerInvalido) primerInvalido = entrada.campo
      hayErrores = hayErrores || invalido
    })

    if (hayErrores) {
      primerInvalido.focus()
      return
    }

    // Validación aprobada. El envío real sigue pendiente de proveedor.
    estado.textContent =
      'Validación correcta — el envío real (Formspree/EmailJS) está pendiente.'
  })
}