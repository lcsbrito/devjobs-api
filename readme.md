# Devjobs API

Une API REST en Node.js exposant des offres d'emploi (job). 🧑‍💻

## Modules utilisés

```
express
cors
mongoose
dotenv
ansi-colors
nodemon
```

## Endpoints

Tous les endpoints de l'API commencent par `/api`.
Les données sont retournées au format JSON.

**_GET_** `/search/jobs` : Prend trois paramètres : `title(string)`, `location(string)`, `fullTimeOnly(boolean)` et return les documents qui match.

**_GET_** `/jobs` : Prend deux paramètres : `page(number)`, `limit(number)`, et return les documents présents dans la collection avec un système de pagination, du plus au récent au plus ancien.

**_POST_** `/jobs` : Prend en paramètre un job et créée un nouveau document Job dans la collection.

**_PUT_** `/jobs/[id]` : Prend en paramètre un job puis exécute la méthode findByIdAndUpdate.

**_GET_** `/jobs/[id]` : Prend en paramètre un ID de job et retourne le document correspondant.

**_DELETE_** `/jobs/[id]`: Prend en paramètre un ID de job et supprime le document correspondant.

## Installation

Pour utiliser cette API, vous devez installer Node.js sur votre machine. Vous pouvez ensuite cloner ce repository et installer les dépendances en exécutant la commande `npm install`.

Il est également nécessaire de définir dans un fichier `.env` à la racine du projet votre `MONGO_URI=` et votre `PORT=`

## Job Model

```
 company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  apply: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  logoBackground: {
    type: String,
    default: "",
  },
  requirements: {
    content: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  role: {
    content: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    }
  }
```

### Améliorations possibles

- Routes et CRUD pour des users.
- Lier chaque job à un user.
