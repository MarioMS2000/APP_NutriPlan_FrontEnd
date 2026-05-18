# NutriPlan FrontEnd 🥗

NutriPlan es una aplicacion web desarrollada con React y Vite para planificar comidas, consultar recetas saludables, guardar favoritos y gestionar un perfil nutricional personalizado.

El proyecto consume una API externa mediante Axios y organiza la experiencia en rutas publicas, rutas protegidas para usuarios autenticados y rutas privadas para administradores.

## 🔗 Enlaces

- 🚀 Aplicacion desplegada en Netlify: https://mario-nutriplan.netlify.app/
- 💻 Repositorio de GitHub: https://github.com/MarioMS2000/APP_NutriPlan_FrontEnd

## 🛠️ Tecnologias utilizadas

- ⚛️ React
- ⚡ Vite
- 🧭 React Router DOM
- 🔌 Axios
- ✅ ESLint
- 🎨 CSS modular por componente/pagina
- 🌐 Netlify para el despliegue

## ✨ Funcionalidades principales

- 👤 Registro e inicio de sesion de usuarios.
- 🔐 Persistencia de sesion mediante token guardado en `localStorage`.
- 🥗 Consulta de recetas saludables.
- 🔎 Filtros de recetas por busqueda, tipo de dieta, dificultad y calorias maximas.
- 📋 Vista de detalle de cada receta con ingredientes, pasos y macronutrientes.
- ❤️ Gestion de recetas favoritas para usuarios autenticados.
- 📊 Creacion y actualizacion del perfil nutricional del usuario.
- 📅 Plan semanal de comidas organizado por dia y tipo de comida.
- 🛡️ Panel de administracion para crear, editar y eliminar recetas.
- 🚪 Proteccion de rutas privadas y rutas exclusivas para usuarios con rol `admin`.

## 🚀 Instalacion y ejecucion local

1. Clonar el repositorio:

```bash
git clone https://github.com/MarioMS2000/APP_NutriPlan_FrontEnd.git
```

2. Entrar en la carpeta del proyecto:

```bash
cd APP_NutriPlan_FrontEnd
```

3. Instalar dependencias:

```bash
npm install
```

4. Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

5. Configurar la URL del backend en `.env`:

```env
VITE_API_URL=http://localhost:3000
```

6. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion se abrira normalmente en `http://localhost:5173`.

## 📜 Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

```bash
npm run build
```

Genera la version de produccion dentro de la carpeta `dist`.

```bash
npm run preview
```

Sirve localmente la build generada para revisarla antes de desplegar.

```bash
npm run lint
```

Ejecuta ESLint para revisar posibles errores o problemas de estilo en el codigo.

## 🔐 Variables de entorno

El proyecto utiliza variables de entorno de Vite. Todas deben empezar por `VITE_` para que esten disponibles en el frontend.

| Variable | Descripcion |
| --- | --- |
| `VITE_API_URL` | URL base del backend que consume la aplicacion. |

Ejemplo:

```env
VITE_API_URL=http://localhost:3000
```

La configuracion de Axios se encuentra en `src/services/api.js`. Si no se define `VITE_API_URL`, se usa como fallback `http://localhost:3000/api`.

## 📁 Estructura del proyecto

```text
APP_NutriPlan_FrontEnd/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AdminRecipeList/
│   │   ├── CreateRecipeForm/
│   │   ├── EditRecipeForm/
│   │   ├── Navbar/
│   │   ├── RecipeCard/
│   │   ├── RecipeDetail/
│   │   ├── RecipeFilters/
│   │   ├── RecipeFormFields/
│   │   └── RecipeList/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── auth-context.js
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── EditRecipePage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   ├── RecipesPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── WeeklyPlanPage.jsx
│   ├── routes/
│   │   ├── ProtectedAdminRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── favorite.service.js
│   │   ├── nutritionProfile.service.js
│   │   ├── recipe.service.js
│   │   └── weeklyPlan.service.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🧩 Explicacion de carpetas y archivos

### 📂 `public/`

Contiene recursos publicos que Vite sirve directamente, como el favicon y el archivo de iconos.

### 🚪 `src/main.jsx`

Punto de entrada de la aplicacion. Renderiza React en el DOM y conecta la app con el navegador.

### 🧭 `src/App.jsx`

Define las rutas principales de la aplicacion con React Router:

- `/`: pagina de inicio.
- `/login`: inicio de sesion.
- `/register`: registro de usuario.
- `/recipes`: listado y filtrado de recetas.
- `/recipes/:id`: detalle de una receta.
- `/profile`: perfil del usuario, protegida por autenticacion.
- `/favorites`: recetas favoritas, protegida por autenticacion.
- `/weekly-plan`: plan semanal, protegida por autenticacion.
- `/admin`: panel de administracion, protegida por rol `admin`.
- `/admin/recipes/edit/:recipeId`: edicion de recetas, protegida por rol `admin`.

### 📄 `src/pages/`

Contiene las vistas principales que se cargan segun la ruta. Cada pagina coordina estados, llamadas a servicios y componentes visuales.

- `HomePage.jsx`: portada de NutriPlan.
- `LoginPage.jsx`: formulario de inicio de sesion.
- `RegisterPage.jsx`: formulario de registro.
- `RecipesPage.jsx`: listado de recetas con filtros.
- `RecipeDetailPage.jsx`: carga y muestra una receta concreta.
- `ProfilePage.jsx`: datos del usuario y perfil nutricional.
- `FavoritesPage.jsx`: recetas guardadas como favoritas.
- `WeeklyPlanPage.jsx`: plan semanal por dias y comidas.
- `AdminPage.jsx`: panel para gestionar recetas.
- `EditRecipePage.jsx`: pantalla de edicion de recetas.

### 🧱 `src/components/`

Contiene componentes reutilizables de interfaz.

- `Navbar/`: menu de navegacion principal.
- `RecipeCard/`: tarjeta individual de receta.
- `RecipeList/`: listado de recetas.
- `RecipeFilters/`: formulario de filtros para buscar recetas.
- `RecipeDetail/`: componentes para mostrar ingredientes, pasos y macros.
- `CreateRecipeForm/`: formulario para crear recetas desde el panel admin.
- `EditRecipeForm/`: formulario para editar recetas existentes.
- `RecipeFormFields/`: campos reutilizables para ingredientes y pasos.
- `AdminRecipeList/`: listado de recetas dentro del panel de administracion.

### 🔐 `src/context/`

Gestiona la autenticacion global.

- `AuthContext.jsx`: proveedor del contexto de autenticacion.
- `auth-context.js`: definicion del contexto.
- `useAuth.js`: hook personalizado para acceder al usuario, token, login, logout y estado de autenticacion.

El token se guarda en `localStorage`, lo que permite mantener la sesion despues de recargar la pagina.

### 🚦 `src/routes/`

Contiene componentes para proteger rutas.

- `ProtectedRoute.jsx`: permite acceder solo si el usuario tiene token.
- `ProtectedAdminRoute.jsx`: permite acceder solo si el usuario esta autenticado y tiene rol `admin`.

### 🔌 `src/services/`

Centraliza las llamadas HTTP al backend.

- `api.js`: instancia de Axios con la URL base configurada.
- `auth.service.js`: registro, login y recuperacion del usuario autenticado.
- `recipe.service.js`: listado, detalle, eliminacion y actualizacion de recetas.
- `favorite.service.js`: gestion de favoritos.
- `nutritionProfile.service.js`: creacion, lectura y actualizacion del perfil nutricional.
- `weeklyPlan.service.js`: lectura y modificacion del plan semanal.

## 🌐 Despliegue

El frontend esta desplegado en Netlify:

https://mario-nutriplan.netlify.app/

Para desplegar una nueva version se debe generar la build con:

```bash
npm run build
```

La carpeta de salida es:

```text
dist/
```

En Netlify, la configuracion habitual para este proyecto es:

- Build command: `npm run build`
- Publish directory: `dist`
- Variable de entorno necesaria: `VITE_API_URL`

## 📝 Notas importantes

- 📌 El repositorio contiene solo el frontend de NutriPlan.
- 🔗 Para que las funcionalidades de autenticacion, recetas, favoritos, perfil nutricional y plan semanal funcionen, el backend debe estar disponible en la URL configurada en `VITE_API_URL`.
- 🛡️ Las rutas de administracion requieren que el usuario tenga el rol `admin`.
- 📦 La carpeta `node_modules/` no debe subirse al repositorio.
- 🏗️ La carpeta `dist/` es generada automaticamente al ejecutar `npm run build`.
