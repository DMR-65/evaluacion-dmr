# Reporte de Vulnerabilidades y Problemas Identificados

Este documento detalla los problemas de seguridad, validación y lógica encontrados durante la auditoría del código de la API REST. Se recomienda abordar estos puntos para robustecer la aplicación.

## Tabla de Hallazgos

| No. | Título del Problema | Sugerencia | Referencia al Código |
|-----|-------------------|------------|-----------|
| 1 | **Falta Validación de Formato de Email** | El controlador solo verifica que el email exista, pero no su formato. Usar un regex o validador para asegurar que sea un email real antes de procesar la solicitud. | [users.controller.js:35](/user_api/src/controllers/users.controller.js#L35) |
| 2 | **Contraseñas Débiles** | No hay validación de longitud mínima o complejidad para el password al crear o actualizar usuarios. Se recomienda exigir al menos 8 caracteres. | [users.controller.js:35](/user_api/src/controllers/users.controller.js#L35) |
| 3 | **Falta de Autorización en Posts** | Cualquier usuario con un token válido puede editar o eliminar CUALQUIER post. Se debe verificar que el `req.user.id` coincida con el `user_id` del post. | [post.controller.js:58](/user_api/src/controllers/post.controller.js#L58) |
| 4 | **Falta de Autorización en Usuarios** | Un usuario puede actualizar o eliminar a OTRO usuario si conoce su ID. Se debe restringir a que solo el dueño de la cuenta o un administrador pueda realizar estos cambios. | [users.controller.js:65](/user_api/src/controllers/users.controller.js#L65) |
| 5 | **Inconsistencia en `userId` de Posts** | En `createNewPost`, el `userId` se toma del cuerpo de la petición (`req.body`). Esto permite suplantación de identidad. Debe obtenerse directamente de `req.user.id`. | [post.controller.js:29](/user_api/src/controllers/post.controller.js#L29) |
| 6 | **Sanitización Desactivada** | El middleware de sanitización está comentado en el archivo principal. Esto deja la API expuesta a ataques básicos de inyección o XSS. | [app.js:29](/user_api/src/app.js#L29) |
| 7 | **Fuga de Información en Login** | Aunque el mensaje de error es genérico, se debe asegurar que el tiempo de respuesta no varíe significativamente para evitar la enumeración de usuarios válidos. | [auth.routes.js:22](user_api/src/routes/auth.routes.js#L22) |

## Próximos Pasos Recomendados

1. **Habilitar Sanitización**: Descomentar el middleware en `app.js`.
2. **Implementar Validaciones**: Usar librerías como `joi` o `express-validator` para los esquemas de datos.
3. **Reforzar Autorización**: Modificar los controladores de posts y usuarios para validar la propiedad de los recursos mediante `req.user.id`.

---
*Documento de trabajo para la reparación de la API REST - mayo 2026*
