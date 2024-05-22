# newhorizons-wiki

## Description

## Article parsers

An article's front matter may include the `parser` attribute. If that is the case, the article can be ran through a corresponding parser from `@newhorizons/core`. For example:

```yaml
---
parser: character-origin
---
# ...
```

Parsers enrich the article with information that is directly pulled from the game data in realtime. This way, articles will always show up-to-date information when displaying any kind of game data.

To see what kind of parsers are available, refer to [this]() document.
