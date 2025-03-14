// Middleware para validar nombreSuperHeroe
export const validarCamposSuperHeroe = (req, res, next) => {
  const { nombreSuperHeroe, nombreReal, edad, poderes } = req.body;

  // Validar nombreSuperHeroe
  if (!nombreSuperHeroe) {
    return res.status(400).json({ error: 'El campo "nombreSuperHeroe" es requerido.' });
  }
  if (nombreSuperHeroe.trim() === '') {
    return res.status(400).json({ error: 'El campo "nombreSuperHeroe" no puede estar vacío o contener solo espacios.' });
  }
  if (nombreSuperHeroe.trim().length < 3) {
    return res.status(400).json({ error: 'El campo "nombreSuperHeroe" debe tener al menos 3 caracteres.' });
  }
  if (nombreSuperHeroe.trim().length > 60) {
    return res.status(400).json({ error: 'El campo "nombreSuperHeroe" no puede exceder los 60 caracteres.' });
  }

  // Validar nombreReal
  if (!nombreReal) {
    return res.status(400).json({ error: 'El campo "nombreReal" es requerido.' });
  }
  if (nombreReal.trim() === '') {
    return res.status(400).json({ error: 'El campo "nombreReal" no puede estar vacío o contener solo espacios.' });
  }
  if (nombreReal.trim().length < 3) {
    return res.status(400).json({ error: 'El campo "nombreReal" debe tener al menos 3 caracteres.' });
  }
  if (nombreReal.trim().length > 60) {
    return res.status(400).json({ error: 'El campo "nombreReal" no puede exceder los 60 caracteres.' });
  }

  // Validar edad
  if (edad === undefined) {
    return res.status(400).json({ error: 'El campo "edad" es requerido.' });
  }
  if (typeof edad !== 'number' || isNaN(edad)) {
    return res.status(400).json({ error: 'El campo "edad" debe ser un número.' });
  }
  if (edad < 0) {
    return res.status(400).json({ error: 'El campo "edad" no puede ser negativo.' });
  }

  // Validar poderes
  if (!poderes || !Array.isArray(poderes)) {
    return res.status(400).json({ error: 'El campo "poderes" es requerido y debe ser un array.' });
  }
  if (poderes.length === 0) {
    return res.status(400).json({ error: 'El campo "poderes" no puede estar vacío.' });
  }
  for (const poder of poderes) {
    if (typeof poder !== 'string') {
      return res.status(400).json({ error: 'Cada elemento en el campo "poderes" debe ser un string.' });
    }
    if (poder.trim() === '') {
      return res.status(400).json({ error: 'Cada elemento en "poderes" no puede estar vacío o contener solo espacios.' });
    }
    if (poder.trim().length < 3) {
      return res.status(400).json({ error: `El poder "${poder}" debe tener al menos 3 caracteres.` });
    }
    if (poder.trim().length > 60) {
      return res.status(400).json({ error: `El poder "${poder}" no puede exceder los 60 caracteres.` });
    }
  }

  // Si todo es válido, pasar al siguiente middleware o controlador
  next();
};
