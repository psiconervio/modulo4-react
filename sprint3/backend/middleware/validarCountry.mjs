import { body, validationResult } from "express-validator";
//Los middlewares son funciones intermedias que pueden realizar tareas como autenticación,
//  registro de solicitudes, validación de datos, o manejo de errores.
export const validateCountry = [
  body("name.official")
    .trim()
    .notEmpty()
    .withMessage("El nombre oficial es obligatorio."),
  body("capital")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos una capital.")
    .custom((value) =>
      value.every((v) => typeof v === "string" && v.trim() !== "")
    )
    .withMessage("Cada capital debe ser una cadena de texto no vacía."),
  body("population")
    .isInt({ min: 0 })
    .withMessage("La población debe ser un número entero positivo."),
  body("area")
    .isFloat({ min: 0 })
    .withMessage("El área debe ser un número positivo."),
  body("creator")
  .trim()
  .notEmpty()
  .withMessage("El creador es obligatorio."),
  body("borders")
    // .custom((value, { req }) => {
    //   // Si el valor de "borders" es una cadena de texto
    //   if (typeof value === "string") {
    //     // Divide la cadena por comas y elimina los espacios en blanco alrededor de cada frontera
    //     req.body.borders = value.split(",").map((border) => border.trim());
    //   }
    //   // Retorna true para indicar que la validación pasó
    //   return true;
    // })
    // Verifica que "borders" sea un array con al menos un elemento
    .isArray({ min: 1 })
    // Mensaje de error si la validación anterior falla
    .withMessage("Las fronteras deben ser un array con al menos un elemento")
    // Segundo validador personalizado
    .custom((borders) => {
      // Si "borders" es un array
      if (Array.isArray(borders)) {
        // Verifica que cada elemento del array sea una cadena de texto
        // y que tenga entre 2 y 3 caracteres después de eliminar los espacios en blanco
        const valid = borders.every(
          (border) =>
            typeof border === "string" &&
            border.trim().length <= 3
        );
        // Si alguna frontera no cumple con las condiciones, lanza un error
        if (!valid) {
          throw new Error("Cada frontera debe tener entre  3 caracteres");
        }
      } else {
        // Si "borders" no es un array, lanza un error
        throw new Error("borders debe ser un array");
      }
      // Retorna true para indicar que la validación pasó
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        switch (error.param) {
          case "name.official":
            return "El nombre oficial es obligatorio y no puede estar vacío.";
          case "capital":
            return "Debe haber al menos una capital y cada capital debe ser una cadena de texto no vacía.";
          case "population":
            return "La población debe ser un número entero positivo.";
          case "area":
            return "El área debe ser un número positivo.";
          case "borders":
            return "Las fronteras deben ser un array con al menos un elemento y cada frontera debe tener entre 2 y 3 caracteres.";
          case "creator":
            return "El creador es obligatorio y no puede estar vacío.";
          default:
            return error.msg;
        }
      });
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
// import { body, validationResult } from 'express-validator';

// export const validateCountry = [
//   body('name.common')
//     .trim()
//     .notEmpty()
//     .withMessage('El nombre común es obligatorio.'),
//   body('name.official')
//     .trim()
//     .notEmpty()
//     .withMessage('El nombre oficial es obligatorio.'),
//   body('capital')
//     .isArray({ min: 1 })
//     .withMessage('Debe haber al menos una capital.')
//     .custom((value) => value.every((v) => typeof v === 'string' && v.trim() !== ''))
//     .withMessage('Cada capital debe ser una cadena de texto no vacía.'),
//   body('region')
//     .trim()
//     .notEmpty()
//     .withMessage('La región es obligatoria.'),
//   body('subregion')
//     .trim()
//     .notEmpty()
//     .withMessage('La subregión es obligatoria.'),
//   body('population')
//     .isInt({ min: 0 })
//     .withMessage('La población debe ser un número entero positivo.'),
//   body('area')
//     .isFloat({ min: 0 })
//     .withMessage('El área debe ser un número positivo.'),
//   body('creator')
//     .trim()
//     .notEmpty()
//     .withMessage('El creador es obligatorio.'),
//   body('startOfWeek')
//     .trim()
//     .notEmpty()
//     .withMessage('El inicio de la semana es obligatorio.'),
//   body('flags.svg')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera (SVG) es obligatoria.'),
//   body('flags.png')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera (PNG) es obligatoria.'),
//   body('maps.openStreetMaps')
//     .trim()
//     .notEmpty()
//     .withMessage('El enlace de OpenStreetMaps es obligatorio.'),
//   body('maps.googleMaps')
//     .trim()
//     .notEmpty()
//     .withMessage('El enlace de Google Maps es obligatorio.'),
//   body('flag')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera es obligatoria.'),
//   body('landlocked')
//     .isBoolean()
//     .withMessage('El campo sin litoral debe ser un valor booleano.'),
//   body('unMember')
//     .isBoolean()
//     .withMessage('El campo miembro de la ONU debe ser un valor booleano.'),
//   body('status')
//     .trim()
//     .notEmpty()
//     .withMessage('El estado es obligatorio.'),
//   body('independent')
//     .isBoolean()
//     .withMessage('El campo independiente debe ser un valor booleano.'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
// ];
