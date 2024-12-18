---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: /images/git-scm-icon.svg
# some information about your slides (markdown enabled)
title: "Webinaire : Comprendre et bien utiliser 'git rebase'"
info: |
  Découvrez tout le potentiel de cette commande complexe mais fabuleuse !
favicon: /images/favicon.png
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Comprendre et bien utiliser <br/> "git rebase"

Webinaire de présentation et démonstration de la commande

<a href="https://comprendre-git.com/fr/" target="blank">comprendre-git.com</a>

---
transition: fade-out
layout: image-right
image: /images/photo.webp
---

# Qui suis-je ?

Maxime Bréhin, 14 ans d’expérience avec Git, dont 8 ans en tant que formateur Git, JavaScript, React.

Un parcours professionnel varié : développeur, chef de projet, directeur technique, ingénieur R&D, formateur.

Créateur de [Technolowgic](https://technolowgic.com/), pour l'accompagnement des entreprises et collectivités à l'éco-conception et la sobriété numérique.

Militant pour un [numérique acceptable](https://louisderrac.com/numerique-acceptable/).

---
layout: center
---

# Entrons directement dans le vif du sujet !

---
transition: fade-out
---

# Ne confonds pas `rebase` et `merge`

Chaque commande existe pour servir une fonction donnée.

Pour simplifier :

- `merge` marque l'intégration de travaux d'une branche à une autre ;
- `rebase` permet de mettre à jour une branche, parfois "au dessus" d'une autre.

Pour en savoir plus, on a [un article détaillant tout ça](https://comprendre-git.com/fr/commandes/bien-utiliser-git-merge-et-rebase/) !

---

# À quoi sert la commande `rebase` ?

<v-clicks>

- **Supprimer** des commits
- **Ré-ordonner** des commits
- **Fusionner** des commits
- **Découper** des commits
- **Reformuler des messages** de commits
- **Ajouter des modifications ou des fichiers** à des commits
- **Déplacer des portions d'historique** (intervalle de commits explicite)
- Bref, **tout ce qu’on peut souhaiter** !

</v-clicks>

---

# Pourquoi s'embêter avec ce type de manipulation ?

Pour éviter d'avoir un historique pourri, et donc :

<v-clicks>

- **Faciliter la lecture du *log***
  - Plus concis, sans commits superflus / réciproques
  - Mieux séquencé
  - Mieux rédigé
  - Sujets mieux regroupés
- **Faciliter la récupération de thèmes**
  - *Cherry-picking*
  - *Merge / rebase* d’un intervalle continu de commits
  - Récupération d’une branche sans dépendance historique superflue
  - Réduit les risques de conflits hors-sujet
- Avoir l’air de super-héros 🦸‍♀️
  - « Elle réussit toujours du premier coup, et dans l’ordre en plus ! »

</v-clicks>

---

# Syntaxes

Beaucoup d'interfaces graphiques savent gérer les rebases classiques, mais rarement des situations complexes.
Seul le terminal permet d'exploiter tout son potentiel, mais il faut retenir la syntaxe.

```bash
git rebase nouvelle-base [branche-qui-rebase]
```

Par défaut, rebase le HEAD sur la nouvelle base.

On peut préciser l'intervalle explicitement, mais la syntaxe est velue :

```bash
git rebase --onto nouvelle-base commit-initial-exclu branche-qui-rebase
```

Et puis il y a pas mal d'options bien utiles : `--interactive` / `-i`, `--rebase-merges` / `-r`…

Regarde aussi [notre fiche du glossaire dédiée au rebase](https://comprendre-git.com/fr/glossaire/git-rebase-c-est-quoi/).


---

# Ça fonctionne comment ?

Le rebase **rejoue chaque commit** sur la nouvelle base, ce qui revient à faire une série de *cherry-picks*.

Dont risques de conflits, comme d’habitude.

S’il y en a, rebase vous donne la main pour le résoudre avant de continuer.

Quand rebase vous donne la main et que vous avez terminé :

```bash
git rebase --continue
git rebase --abort
git rebase --skip
```

---

# Visuellement, ça donne ça !

<GitGraph graph="rebase" />


---

# Défaire un rebase, c'est facile !

Le rebase n'est pas déstructif, on peut donc faire revenir l'étiquette de branche à sa position d'avant, en 1 petite commande :

```bash
git reset --keep [branche-courante]@{1}
```

Attention à vérifier avant ça que tu es sur la bonne branche (le *reflog* est ton ami).

<GitGraph graph="cancel-rebase" />


--- 

# Ajouter des fichiers ou correction à un commit

Avec le bon alias, il suffit de 

- ajouter les fichiers/modification au stage (un `git add …` quoi !)
- de lancer l'alias : `git commit autofixup le-commit-à-corriger`

Pour configurer l'alias en question : 

```bash
git config --global alias.autofixup '!git commit --fixup $1 && git rebase --autosquash --interactive --rebase-merges $1~1 && echo "autofixup finished"'
```

[Cet article](https://comprendre-git.com/fr/astuces/git-protip-autofixup/) te donne tous les détails.

---

# Ça marche aussi avec l'édition des anciens messages

On a déjà `commit --amend` pour le dernier commit en date, 

et pour les autres, on fera encore avec un alias 

```bash
git autoreword le-commit-à-corriger
```

Ensuite, on édite le message ouvert dans notre éditeur, on ferme, et c'est tout bon !

Pour configurer l'alias : 

```bash
git config --global alias.autoreword '!git commit --fixup reword:$1 && GIT_EDITOR=true && git rebase --autosquash --interactive --rebase-merges $1~1 && echo "autoreword finished"'
```

Là aussi, on a [un article qui t'explique tout](https://comprendre-git.com/fr/astuces/git-protip-autoreword/) !


---

# Pull en mode rebase

Le rebase s'invite même lors de la récupération du travail distant.

Pourquoi ? Pour t'éviter de pourrir ton historique en retranscrivant chaque nouveauté sur ta branche sous forme de fusion.

Ça ne demande qu'une toute petite configuration.

**Mais attention**, tout le monde doit l'avoir !

```bash
git config --global pull.rebase merges
```

Ça aussi, c'est détailé dans [un article](https://comprendre-git.com/fr/glossaire/git-rebase-c-est-quoi/#pull-%2B-rebase-%3D-%E2%9D%A4%EF%B8%8F).

---
layout: end
---


# Merci

Besoin d'une formation, d'être accompagné ?
Il suffit de demander !

<a href="mailto:contact@comprendre-git.com">contact@comprendre-git.com</a>

[comprendre-git.com](https://comprendre-git.com)
