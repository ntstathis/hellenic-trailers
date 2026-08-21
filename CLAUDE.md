# Working agreements for this repository

## Branching

- **Work on the `dev` branch.** New work goes there by default — commit to `dev`
  and push it, rather than starting somewhere else.
- **Do not create new branches unless there is a real reason to.** No
  `claude/<topic>` branch per task. If a change genuinely needs its own branch
  (say, something risky that must not sit on `dev` while it is unfinished), say
  why first and ask.
- `main` is what the live site serves: pushing to `main` deploys
  hellenictrailers.gr through GitHub Pages in ~2 minutes. Merge `dev` into
  `main` when the owner asks, not on your own initiative.
- Note: this environment's git proxy refuses branch **deletions**
  (`git push origin :branch` fails with "remote end hung up"), and the GitHub
  tools available here have no delete-branch operation. Branch cleanup is done
  by hand at <https://github.com/ntstathis/hellenic-trailers/branches>.

## Secrets

This repository is **public**. Never commit tokens, API keys or account
identifiers. Credentials live only in the Claude Code cloud environment
variables — see [`MARKETING.md`](MARKETING.md), "Where credentials live".

## Publishing

Never post publicly (Facebook, Instagram, LinkedIn, Google Business) or send a
newsletter without the owner's explicit approval for that specific item.

## Context

- [`MARKETING.md`](MARKETING.md) — the owner's playbook: every marketing
  channel, what is done, what is pending, and where each credential lives.
- [`.claude/skills/publish-news/SKILL.md`](.claude/skills/publish-news/SKILL.md)
  — the `/publish-news` workflow that publishes one news item to the website,
  Facebook, Instagram and the newsletter in a single run.
