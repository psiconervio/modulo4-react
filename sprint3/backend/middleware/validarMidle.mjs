import { body, validationResult } from "express-validator";

export const validarHeroeEvalidator = [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del héroe es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre debe tener entre 3 y 60 caracteres"),
  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("El nombre real es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre real debe tener entre 3 y 60 caracteres"),
  body("edad")
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número mayor o igual a 0"),
  body("poderes")
    .custom((value, { req }) => {
      if (typeof value === "string") {
        req.body.poderes = value.split(',').map(poder => poder.trim());
      }
      return true;
    })
    .isArray({ min: 1 })
    .withMessage("Los poderes deben ser un array con al menos un elemento")
    .custom((poderes) => {
      if (Array.isArray(poderes)) {
        const valid = poderes.every(
          (poder) =>
            typeof poder === "string" &&
            poder.trim().length >= 3 &&
            poder.trim().length <= 60
        );
        if (!valid) {
          throw new Error("Cada poder debe tener entre 3 y 60 caracteres");
        }
      } else {
        throw new Error("poderes debe ser un array");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


// import { body, validationResult } from "express-validator";

// export const validarHeroeEvalidator = [
//   body("nombreSuperHeroe")
//     // elimina los espacios en blanco al inicio y al final del texto
//     .trim()
//     // verifica que el campo no este vacio
//     .notEmpty()
//     .withMessage("el nombre del heroe es obligatorio")
//     .isLength({ min: 3, max: 60 })
//     .withMessage("el nombre debe tener entre 3 y 60 caracteres"),
//   body("nombreReal")
//     .trim()
//     .notEmpty()
//     .withMessage("el nombre real es obligatorio")
//     .isLength({ min: 3, max: 60 })
//     .withMessage("el nombre real debe tener entre 3 y 60 caracteres"),
//   body("edad")
//     .isInt({ min: 0 })
//     .withMessage("la edad debe ser un numero mayor o igual a 0"),
//   body("poderes")
//     // validar que el campo poderes sea un array con al menos un elemento
//     .isArray({ min: 1 })
//     .withMessage("los poderes deben ser un array con al menos un elemento")
//     //validacion personalizada para cada elemento del array poderes
//     .custom((poderes) => {
//       // verifica si todos los elementos del array cumplen con las reglas
//       const valid = poderes.every(
//         (poder) =>
//           // cada elemento debe ser un string
//           typeof poder === "string" &&
//           // cada string debe tener al menos 3 caracteres
//           poder.trim().length >= 3 &&
//           // cada string no debe superar los 60 caracteres
//           poder.trim().length <= 60
//       );
//       //si alguno de los elementos no cumple, lanza un error
//       if (!valid)
//         throw new Error("Cada poder debe tener entre 3 y 60 caracteres");
//       //retorna true para pasar la validacion
//       return true;
//     }),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//    // si no hay errores continua con el siguiente middleware o controlador

//     next();
//   },
// ];

//trata estos datos
// {
//   "nombreSuperheroe": "Batman",
//   "nombreReal": "Bruce Wayne",
//   "edad": 35,
//   "poderes": ["Inteligencia", "Artes marciales", "Tecnología avanzada"]
// }
