# **App Name**: JK Festival Official Website

## Core Features:

- Página de inicio del festival: Mostrar información clave del festival, incluyendo el nombre 'JK Festival', fecha '7 FEB 2026 – Martil, Morocco', ubicación, destacados, llamado a la acción 'Comprar entradas', descripción del concepto, contador regresivo, vista previa del cartel, sección de sponsors y CTA a /tickets.
- Cartel y Horarios de Artistas: Mostrar el cartel completo con foto, nombre, descripción, día, escenario y horario de cada artista. Incluir filtros por día y escenario, y una tabla de horarios.
- Selección de Entradas: Permitir la selección de tipo de entrada (General, VIP, etc.) y cantidad. Mostrar precio en EUR, beneficios, resumen del total y botón 'Continuar con la compra' a /checkout.
- Flujo de Compra (Frontend): Mostrar un resumen de la selección del usuario, formulario de datos personales (nombre, email, país/ciudad), validación básica, botón 'Pagar ahora' que llama a una función simulada de pago y redirige a /payment/success o /payment/failure. Incluir comentarios para la integración de Stripe.
- Páginas de Éxito/Fallo de Pago: /payment/success: Mensaje de agradecimiento, explicación del envío de entradas por correo y botón para volver a la página de inicio. /payment/failure: Mensaje de error y botón para volver a /checkout.
- Páginas Informativas: Mostrar información práctica: ubicación, cómo llegar, horarios, accesibilidad y pautas esenciales. Incluir un mapa del recinto.
- Sección de Preguntas Frecuentes: Implementar una sección de FAQ en formato acordeón, con preguntas típicas sobre el festival.
- Contacto: Formulario de contacto (nombre, email, asunto, mensaje), mensaje de éxito simulado y enlaces a redes sociales.
- Rutas Legales: Crear páginas /legal/terms, /legal/privacy, /legal/cookies con contenido de ejemplo.
- Interfaz de Login de Administración: Formulario de login simple (email y contraseña) con validación básica. Incluir comentarios sobre la futura integración con Firebase Auth.
- Interfaz de Panel de Administración: Layout con sidebar, tarjetas con estadísticas simuladas (entradas vendidas, ingresos) y lista de pedidos simulados.
- Gestión de Tipos de Entradas: Interfaz para ver y editar tipos de entradas simulados (nombre, precio, descripción, activo/inactivo). Incluir formularios para añadir/editar.
- Gestión del Cartel: Interfaz para gestionar el cartel simulado: lista de artistas, día, escenario y horario. Incluir formularios para añadir/editar.
- Validación de Entradas: Interfaz con campo para código de entrada, botón 'Validar entrada' y lógica simulada para mostrar si la entrada es válida, ya usada o no encontrada. Usar colores diferentes para cada estado.

## Style Guidelines:

- Color primario: Magenta vibrante (#FF00FF) para una sensación audaz y juvenil inspirada en la cultura de la música urbana.
- Color de fondo: Rosa claro (#FFE5F2), que ofrece un contraste suave que no sobrecarga el vibrante color primario.
- Color de acento: Azul eléctrico (#7DF9FF) para resaltar elementos interactivos y llamadas a la acción, creando interés visual y energía.
- Fuente del titular: 'Poppins', una sans-serif geométrica, que confiere un ambiente moderno y de moda a los encabezados. Texto del cuerpo: 'PT Sans' que da un toque de calidez para una experiencia de lectura fluida.
- Utilizar iconos claros y audaces, con un aspecto y tacto dibujados a mano que refleja los estilos de arte urbano.
- Prioridad a los dispositivos móviles, garantizando la capacidad de respuesta y las transiciones fluidas a las versiones de escritorio con componentes reutilizables. Estructurado con elementos <header>, <main>, <section> y <footer>.
- Incorporar animaciones y transiciones sutiles para la interactividad. Esto puede incluir efectos de desplazamiento, estados de carga y cuenta atrás animada.