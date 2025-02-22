# MÓDULO 4 - SPRINT 1 - NODO Movies 🎬 HTML

## Descripción del Proyecto

NODO Movies es una aplicación interactiva desarrollada para gestionar una **lista de películas (Watchlist) que deseas ver**.

- **Visualizar películas disponibles** con información básica.
- **Agregar películas a su Watchlist** para gestionar lo que desean ver.
- **Eliminar películas de su Watchlist** mediante interacciones simples.

---

## Características Principales

- **Modal de Watchlist:** 
  - Interfaz limpia y fácil de usar para gestionar tu lista de seguimiento.
  - Posibilidad de eliminar películas directamente desde la lista.
- **Diseño responsivo:**
  - Adaptado a diferentes tamaños de pantalla (móvil, tablet, escritorio).
- **Estética de diseño:**
  - **Modo oscuro** con colores llamativos.
  - Animaciones y transiciones suaves al interactuar con botones e íconos.
- **Interactividad:**
  - Uso de botones, íconos y tarjetas para simplificar la navegación.

---

## Tecnologías Utilizadas

### Frontend:
- **HTML5**: Estructura semántica de la página.
- **Tailwind CSS**: Framework para estilizar componentes con facilidad.
  - Colores personalizados integrados en la configuración.
  - Diseño responsivo y componentes reutilizables.
- **Google Fonts (Orbitron)**: Tipografía futurista y elegante para encabezados.
- **Phosphor Icons**: Íconos interactivos modernos.
- **JavaScript**: Gestión de eventos y control de la interacción del usuario.

---

## Paleta de Colores

| **Propósito**       | **Color HEX**      | **Descripción**                |
|---------------------|--------------------|--------------------------------|
| **Primario oscuro** | `#121212`          | Fondo principal.               |
| **Secundario oscuro** | `#1E1E1E`         | Fondo de secciones y modales.  |
| **Teal acentuado**   | `#4ECDC4`          | Acento principal en botones y texto. |
| **Texto primario**   | `#E0E0E0`          | Texto principal.               |
| **Texto secundario** | `#A0A0A0`          | Texto auxiliar o menos relevante. |
| **Estado éxito**     | `#2ecc71`          | Indicadores de acciones exitosas. |
| **Estado advertencia** | `#f39c12`        | Mensajes de alerta.            |
| **Estado error**     | `#e74c3c`          | Indicadores de errores.         |
| **Estado información** | `#3498db`        | Mensajes informativos.         |

---

## Componentes Principales

### Modal Watchlist
- **Estructura:** Contenedor centralizado con fondo semitransparente.
- **Funcionalidad:** Muestra películas agregadas, permite eliminarlas con un clic.
- **Interacción:** Transiciones suaves y cierre fácil mediante un botón.

### Tarjetas de Películas
- **Imagen:** Representación visual de la película.
- **Título:** Estilo centrado y destacado.
- **Botón:** Opción para agregar a la Watchlist con estilos interactivos.

---

## Configuración de Tailwind CSS

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'dark-primary': '#121212',
        'dark-secondary': '#1E1E1E',
        'accent-teal': '#4ECDC4',
        'text-primary': '#E0E0E0',
        'text-secondary': '#A0A0A0',
        'button-primary': {
          DEFAULT: '#4ECDC4',
          hover: '#6EDCD4',
          active: '#3EBAB4'
        },
        'button-secondary': {
          DEFAULT: '#2C2C2C',
          hover: '#3C3C3C',
          active: '#1C1C1C'
        },
        'state-success': '#2ecc71',
        'state-warning': '#f39c12',
        'state-error': '#e74c3c',
        'state-info': '#3498db',
        'shadow-soft': 'rgba(0,0,0,0.3)',
        'shadow-medium': 'rgba(0,0,0,0.5)',
        'shadow-intense': 'rgba(0,0,0,0.7)'
      }
    }
  }
}
