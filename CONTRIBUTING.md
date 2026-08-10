# Contributing to PagePatch

Thanks for helping improve PagePatch. Small, focused changes are easiest to review.

## Before opening an issue

- Check whether the problem also happens in the [hosted demo](https://pagepatch.evoltex.com.br/demo/index.html?edit-mode).
- Search existing issues before creating a new one.
- Do not include private webpage content, exported requests, credentials, or customer data.

## Local setup

```bash
npm ci
npm test
```

The source lives in `src/pagepatch.js`. Run `npm run build` after changing it so `dist/` and `deploy/` stay in sync.

## Pull requests

1. Explain the user problem and the behavior you changed.
2. Add or update a regression test when behavior changes.
3. Run `npm test` and `npm run check`.
4. Keep unrelated formatting and refactors out of the pull request.
5. Include a screenshot for visible interface changes.

By contributing, you agree that your work will be released under the MIT License.

