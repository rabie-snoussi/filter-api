# Solution e-commerce de Focus

Le projet consiste à avoir une API MVP pour afficher des produits afin de mesurer l’appétence du marché.

## Initialisation du projet

* S'assurer d'avoir MongoDB installé.
* Modifier le fichier "/shared/config.js" si besoin.
* Puis lancer les commandes suivantes:
```
 $ npm install                # Installation des packages
 $ npm run populate           # Insertion des données dans la base
 $ npm run start              # Démarrage du projet
```

## Structure du projet

Pour offrir la possibilité d'étendre le projet facilement ainsi que sont maintient, le projet a été structuré comme la suivante:

```
FocusApp
  ├── server.js                             # Fichier principale pour le démarrage du projet
  ├── controllers
  │     ├──  product.js                     # Controlleur product
  │     └──  userLog.js                     # Controlleur userLog
  ├── logs             
  │     └──  combined.log                   # Contient le log des erreurs survenues
  ├── middleware
  │     ├──  dbConnect.js                   # Connexion vers la base de donnée
  │     └──  logger.js                      # Log les erreurs dans "/logs/combined.log" 
  ├── models
  │     ├──  product.js                     # Modèle Product
  │     └──  userLog.js                     # Modèle UserLog
  ├── routes
  │     └──  product.js                     # Route vers "/products"
  ├── scripts
  │     ├──  populate.js                    # Script qui inject les données Products et UserLogs à la base de donnée
  │     ├──  stats.js                       # Script qui génère les statistiques sur les connexions à L'API
  │     └──  mockupData
  │             ├──  PRODUCTS.json          # Données des produits 
  │             └──  USER_LOGS.json         # Données sur les connexions des utilisateurs       
  ├── shared
  │     └──  config.js                      # La config de la base de donnée et le Port utilisé dans l'application
  └──  tmp                           
        └──  statistics.txt                 # Généré par le script "/scripts/stats.js"
                                            # Le fichier contient les informations sur les connexions par jour à L'API
                                            # ainsi que d'autres informations comme le navigateur et le type d'OS utilisé

```

## L'API

L'API est accessible via "/products", elle offre la possibilité de paginer et de filtrer sur les produits afin d'optimiser le temps de réponse ainsi que de rendre son utilisation plus flexible, si aucun paramètre n'est introduit on utilise les valeurs par défauts.

Les paramètres utilisés sont:
* skip: Nombre d'éléments à ignorés (par défaut: 0)
* take: Nombre d'éléments à afficher (par défaut: 25)
* like: Chaîne de caractères utilisés pour filtrer par le nom du produit (par défaut aucun filtre n'est appliqué)
* minPrice: Le prix minimale du produit (par défaut: 0)
* maxPrice: Le prix maximale du produit (par défault: INFINITY)

Exemple d'utilisation:
```
"/products?skip=10&take=10&minPrice=250&maxPrice=500"
```
Dans l'exemple ci-dessus, on va récupérer une liste de 10 produits dont le prix est entre 250 et 500, en ignorant les 10 premiers éléments.

A chaque connexion, l'application collecte les informations de l'utilisateur pour calculer la fréquence de connexions, les données récoltées sont: l'adresse IP, le navigateur, le type d'OS, la date de connexion.

## Scripts

Deux scripts ont été ajouté dans le projet, le premier (populate.js) étant pour remplir notre base de donnée afin de pouvoir commencer à utiliser l'application, en utilisant les deux fichiers "PRODUCTS.json" et "USER_LOGS.json", on l'utilisera qu'une seule fois, et cela lors de l'initialisation du projet avec la commande suivante:

```
$ npm run populate
```

Le deuxième script sera utilisé pour créer un document contenant les informations sur les connexions par jour à L'API, et cela avec la commande suivante:

```
$ npm run stats
```

Le document sera généré dans "/tmp" sous le nom de "statistics.txt".

Ci-dessous un exemple d'affichage du document:

```
[2021-05-29]
Unique users: 6		Total number of requests: 11

[2021-05-30]
Unique users: 7		Total number of requests: 10

[2021-05-31]
Unique users: 6		Total number of requests: 13

[2021-06-01]
Unique users: 4		Total number of requests: 7

[2021-06-02]
Unique users: 8		Total number of requests: 22

[2021-06-03]
Unique users: 8		Total number of requests: 19

[2021-06-04]
Unique users: 6		Total number of requests: 12

[2021-06-05]
Unique users: 7		Total number of requests: 14

[2021-06-06]
Unique users: 5		Total number of requests: 11

[2021-06-07]
Unique users: 8		Total number of requests: 19

[2021-06-08]
Unique users: 7		Total number of requests: 16

[2021-06-09]
Unique users: 7		Total number of requests: 15

[2021-06-10]
Unique users: 7		Total number of requests: 13

[2021-06-11]
Unique users: 7		Total number of requests: 15

[2021-06-12]
Unique users: 5		Total number of requests: 9

[2021-06-13]
Unique users: 6		Total number of requests: 12

[2021-06-14]
Unique users: 4		Total number of requests: 6

[2021-06-15]
Unique users: 7		Total number of requests: 14

[2021-06-16]
Unique users: 7		Total number of requests: 10


Used browsers:
[Chrome]: 726
[Opera]: 80
[Mozilla Firefox]: 194


Used OS:
[Linux]: 122
[Windows 8]: 545
[Windows 7]: 333
```
