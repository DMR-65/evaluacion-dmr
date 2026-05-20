# Evaluación 2: Reparación de Vulnerabilidades y Mejoras de Seguridad en API REST

## Información General

**Asignatura:** Desarrollo de APIs REST  
**Fecha de entrega:** 26 de mayo 2026 
**Modalidad:** Individual  
**Puntaje Total:** 70 puntos  
**Puntaje Mínimo Aprobatorio:** 40 puntos  
**Puntaje Mínimo:** 10 puntos

## Objetivo

Identificar, comprender y corregir vulnerabilidades de seguridad, validación y autorización en una API REST existente, aplicando buenas prácticas de desarrollo seguro.

## Descripción de la Actividad

Deberás reparar los problemas de seguridad y lógica identificados en el archivo `reparacion.md`. Cada problema debe ser corregido siguiendo las sugerencias proporcionadas y aplicando las mejores prácticas de desarrollo.

## Problemas a Resolver

### 1. Validación de Formato de Email (10 puntos)
**Ubicación:** `src/controllers/users.controller.js` línea 35

Implementar validación del formato de email antes de procesar solicitudes de creación y actualización de usuarios. El email debe cumplir con un formato válido (ejemplo: usuario@dominio.com).

**Requisitos:**
- Usar expresión regular o librería de validación
- Retornar error 400 con mensaje descriptivo si el formato es inválido
- Aplicar en funciones `createNewUser` y `updateUser`

### 2. Validación de Contraseñas Seguras (10 puntos)
**Ubicación:** `src/controllers/users.controller.js` línea 35

Implementar validación de contraseñas que exija:
- Mínimo 8 caracteres de longitud
- Retornar error 400 con mensaje descriptivo si no cumple los requisitos
- Aplicar en funciones `createNewUser` y `updateUser`

### 3. Autorización en Operaciones de Posts (15 puntos)
**Ubicación:** `src/controllers/post.controller.js` línea 58

Implementar verificación de propiedad antes de permitir edición o eliminación de posts.

**Requisitos:**
- Verificar que `req.user.id` coincida con el `user_id` del post
- Retornar error 403 (Forbidden) si el usuario no es el propietario
- Aplicar en funciones `updatePost` y `deletePost`

### 4. Autorización en Operaciones de Usuarios (15 puntos)
**Ubicación:** `src/controllers/users.controller.js` línea 65

Implementar verificación de propiedad antes de permitir actualización o eliminación de usuarios.

**Requisitos:**
- Verificar que `req.user.id` coincida con el ID del usuario a modificar
- Retornar error 403 (Forbidden) si el usuario intenta modificar otra cuenta
- Aplicar en funciones `updateUser` y `deleteUser`

### 5. Corrección de Suplantación de Identidad en Posts (10 puntos)
**Ubicación:** `src/controllers/post.controller.js` línea 29

Corregir la asignación del `userId` en la creación de posts.

**Requisitos:**
- Obtener el `userId` desde `req.user.id` (token JWT)
- Eliminar la posibilidad de recibir `userId` desde `req.body`
- Asegurar que el post siempre se cree con el ID del usuario autenticado

### 6. Activación del Middleware de Sanitización (5 puntos)
**Ubicación:** `src/app.js` línea 29

Habilitar el middleware de sanitización que actualmente está comentado.

**Requisitos:**
- Descomentar la línea del middleware de sanitización
- Verificar que el middleware funcione correctamente
- El middleware debe procesar todas las peticiones antes de llegar a los controladores

### 7. Documentación de Cambios (5 puntos)

Crear un archivo `CAMBIOS_REALIZADOS.md` que documente:
- Lista de cada problema corregido
- Descripción breve de la solución implementada
- Archivos modificados para cada corrección

## Entregables

1. Código fuente completo con todas las correcciones implementadas
2. Archivo `CAMBIOS_REALIZADOS.md` con la documentación de cambios
3. Capturas de pantalla o evidencia de pruebas (opcional, pero recomendado)

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Validación de Email** | 10 | **10 pts:** Validación implementada correctamente con regex o librería, retorna error 400, aplicada en ambas funciones (crear y actualizar)<br>**7 pts:** Validación implementada pero solo en una función o con errores menores<br>**4 pts:** Validación implementada parcialmente o con errores significativos<br>**0 pts:** No implementado |
| **Validación de Contraseñas** | 10 | **10 pts:** Validación de mínimo 8 caracteres implementada, retorna error 400, aplicada en ambas funciones<br>**7 pts:** Validación implementada pero solo en una función o con errores menores<br>**4 pts:** Validación implementada parcialmente<br>**0 pts:** No implementado |
| **Autorización en Posts** | 15 | **15 pts:** Verificación de propiedad implementada correctamente en updatePost y deletePost, retorna error 403<br>**11 pts:** Implementado en ambas funciones pero con errores menores en la lógica<br>**7 pts:** Implementado solo en una función correctamente<br>**3 pts:** Implementado parcialmente con errores significativos<br>**0 pts:** No implementado |
| **Autorización en Usuarios** | 15 | **15 pts:** Verificación de propiedad implementada correctamente en updateUser y deleteUser, retorna error 403<br>**11 pts:** Implementado en ambas funciones pero con errores menores en la lógica<br>**7 pts:** Implementado solo en una función correctamente<br>**3 pts:** Implementado parcialmente con errores significativos<br>**0 pts:** No implementado |
| **Corrección de userId en Posts** | 10 | **10 pts:** userId se obtiene de req.user.id, no se acepta desde req.body, funciona correctamente<br>**7 pts:** Implementado pero con errores menores<br>**4 pts:** Implementado parcialmente<br>**0 pts:** No implementado |
| **Activación de Sanitización** | 5 | **5 pts:** Middleware descomentado y funcionando correctamente<br>**3 pts:** Middleware descomentado pero con errores<br>**0 pts:** No implementado |
| **Documentación** | 5 | **5 pts:** Archivo CAMBIOS_REALIZADOS.md completo con todos los problemas, soluciones y archivos modificados<br>**3 pts:** Documentación incompleta o con información faltante<br>**1 pt:** Documentación muy básica o superficial<br>**0 pts:** No entregado |
| **TOTAL** | **70** | **Nota mínima:** 10 puntos<br>**Nota aprobatoria:** 40 puntos<br>**Nota máxima:** 70 puntos |

## Escala de Calificación

- **70-60 puntos:** Excelente - Todas las correcciones implementadas correctamente
- **59-50 puntos:** Muy Bueno - Mayoría de correcciones implementadas con errores menores
- **49-40 puntos:** Bueno (Aprobado) - Correcciones principales implementadas
- **39-30 puntos:** Insuficiente - Correcciones parciales con errores significativos
- **29-10 puntos:** Deficiente - Trabajo incompleto o con errores graves

## Recomendaciones

1. Lee cuidadosamente el archivo `reparacion.md` antes de comenzar
2. Prueba cada corrección individualmente antes de continuar con la siguiente
3. Utiliza herramientas como Postman o Thunder Client para probar los endpoints
4. Verifica que los códigos de estado HTTP sean los correctos (400, 403, etc.)
5. Documenta tus cambios a medida que los realizas

## Criterios de Aprobación

Para aprobar esta evaluación debes:
- Obtener un mínimo de 40 puntos sobre 70
- Implementar al menos 4 de las 6 correcciones principales
- Entregar el código funcional y sin errores de sintaxis

---

**Nota:** Cualquier intento de plagio o copia resultará en la anulación de la evaluación. El código debe ser de tu autoría y debes poder explicar cada corrección realizada.
