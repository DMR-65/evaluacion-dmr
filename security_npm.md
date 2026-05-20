# Guía Técnica de Seguridad: Configuración de `.npmrc`

El archivo `.npmrc` es el archivo de configuración de npm (Node Package Manager). Aunque a menudo se pasa por alto, es una pieza fundamental para robustecer la seguridad de una API REST, ya que controla cómo se descargan, instalan y gestionan las dependencias del proyecto.

En un entorno de backend, una sola dependencia maliciosa puede comprometer todo el servidor, acceder a variables de entorno (como claves de base de datos) o filtrar datos de usuarios.

## Parámetros de Seguridad Explicados

A continuación se detallan los parámetros configurados en el archivo [.npmrc](file:///c:/Users/fidon/Desktop/CFT/2026/PRIMER_SEMESTRE/PROGRAMACION_BACKEND/19-mayo/user_api/.npmrc) y su impacto en la seguridad:

### 1. `ignore-scripts=true`
*   **Explicación:** Evita que npm ejecute scripts definidos en los paquetes instalados (como `preinstall`, `postinstall`, etc.).
*   **Por qué es vital:** Muchos ataques de malware en el ecosistema npm utilizan estos scripts para ejecutar código malicioso automáticamente al momento de hacer `npm install`, robando información del sistema o instalando puertas traseras. Al desactivarlos, obligamos a una revisión manual si un paquete realmente necesita un script para funcionar.

### 2. `minimum-release-age=1440`
*   **Explicación:** Define que un paquete debe haber sido publicado hace al menos 1440 minutos (24 horas) para poder ser instalado.
*   **Por qué es vital:** Protege contra ataques de **Typosquatting** (paquetes con nombres muy similares a los reales) y paquetes maliciosos recién publicados. Generalmente, la comunidad de seguridad detecta y reporta paquetes maliciosos en las primeras horas de su publicación.

### 3. `audit=true`
*   **Explicación:** Realiza automáticamente un análisis de vulnerabilidades (`npm audit`) cada vez que se instala un paquete.
*   **Por qué es vital:** Nos avisa inmediatamente si estamos introduciendo una dependencia con vulnerabilidades conocidas (CVEs), permitiéndonos tomar acciones correctivas antes de desplegar el código.

### 4. `strict-ssl=true`
*   **Explicación:** Fuerza a npm a utilizar conexiones HTTPS seguras y a validar los certificados SSL/TLS del registro.
*   **Por qué es vital:** Previene ataques de **Man-in-the-Middle (MitM)**, donde un atacante podría interceptar la conexión y sustituir un paquete legítimo por uno modificado maliciosamente durante la descarga.

### 5. `save-exact=true`
*   **Explicación:** Guarda la versión exacta de la dependencia en el `package.json` (ej: `1.2.3` en lugar de `^1.2.3`).
*   **Por qué es vital:** Evita actualizaciones automáticas de versiones menores o parches que no han sido probadas. Aunque las actualizaciones son buenas, en seguridad preferimos el determinismo: saber exactamente qué código está corriendo en nuestro servidor.

### 6. `engine-strict=true`
*   **Explicación:** Obliga a que la versión de Node.js y npm coincida exactamente con lo definido en el campo `engines` del `package.json`.
*   **Por qué es vital:** Garantiza que el código se ejecute en un entorno controlado y probado, evitando fallos de seguridad o bugs extraños que surgen al usar versiones de Node.js no compatibles o vulnerables.

## Buenas Prácticas Adicionales

1.  **Revisión de `package-lock.json`:** Nunca borres este archivo. Es el que garantiza que todo el equipo y el servidor de producción instalen exactamente las mismas versiones de las dependencias.
2.  **Uso de Scoped Packages:** Siempre que sea posible, usa paquetes con ámbito (ej: `@mi-organizacion/paquete`) para asegurar el origen de los módulos internos.
3.  **CI/CD Security:** Integra `npm audit` en tus tuberías de integración continua para bloquear despliegues si se detectan vulnerabilidades críticas.

---

