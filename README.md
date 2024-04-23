
## Variables de entorno

Para ejecutar este proyecto, necesitarás agregar las siguientes variables de entorno a tu archivo `.env`.

- `PORT`: Puerto del servidor. Puede ser el valor proporcionado por `process.env.PORT` o `8080` 
- `MONGO_URL`: URL de conexión a la base de datos MongoDB.
- `TOKENKEY`: Clave para generar tokens de autenticación.
- `MODE`: Modo de ejecución del servidor. Puede ser el valor proporcionado por `process.env.MODE` o `'development'` 
- `EADMIN`: Dirección de correo electrónico del administrador.
- `PADMIN`: Contraseña del administrador.
- `clientID`: ID del cliente para autenticación OAuth.
- `clientSecret`: Clave secreta del cliente para autenticación OAuth.
- `callbackURL`: URL de devolución de llamada para autenticación OAuth.
- `UMAILER`: Usuario de correo electrónico para enviar correos electrónicos.
- `PMAILER`: Contraseña del usuario de correo electrónico para enviar correos electrónicos.
- `KEY_SECRET_STRIPE`: Clave secreta para la integración con Stripe.

## Iniciar proyecto localmente

Clonar el proyecto

```bash
  git clone https://github.com/KampfTracer/PF-Backend
```

Ir al directorio del proyecto

```bash
  cd EntregaFinal
```

Instalar dependencias

```bash
  npm install
```

Ininicar el servidor

```bash
  npm run start
```


## Ejecutar Test

Para ejecutar un test usa el siguiente comando (requiere una instancia del servidor inciada para funcionar correctamente)

```bash
  npm run test
```

