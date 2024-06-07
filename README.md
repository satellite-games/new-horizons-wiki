# newhorizons-wiki

## Description

## Parser extensions

An article's front matter may include the `extensions` attribute. If that is the case, the article will be run through additional steps while being parsed. You can specify a single or multiple extensions (using a `yaml array`).

```yaml
---
extensions: character-origin
---
# ...
```

Parser extensions may enrich the article with information from other sources in realtime. They are commonly used to add game data from [@newhorizons/core](https://github.com/satellite-games/newhorizons-core) to the article. This happens on articles representing game object blueprints, for example.

You can find a list of all available parser extensions [here](/lib/services/parser/parser-extension.registry.ts).

When creating a new parser extension, please make sure you to follow these rules:

- The file `MUST` be located in `/lib/services/parser/extensions` and end on the `.pex.ts` file ending.

- The module `MUST` must export a function that implements `(article: string, path: WikiPath): Promise<string>`.
