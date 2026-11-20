# What YOU still need to do (I cannot do these for you)

1. **Personal details:** fill name, roll number, section in README.md, REPORT_DRAFT.md.
2. **Run it yourself:** `npm install`, `npm run dev`, click through everything at 390 px and 1280 px (Chrome DevTools), console open. Fix anything odd. I tested the build, the rule tests and a server-side render of every route, but not in a real browser.
3. **Investigation (Task 1):** open a real restaurant website, find three REAL problems, take screenshots, and write them in the report. Edit DECISIONS.md "Problem" lines to match what you saw.
4. **GitHub with real history (do NOT upload everything at once).** Suggested milestone commits:
   - `git init` -> commit 1: Vite setup, `src/data/menu.js`, README skeleton
   - commit 2: components, routes, menu page with search/filter/sort, details page
   - commit 3: cart, checkout form, `orderRules.js`, validation
   - commit 4: CartBar, responsive CSS, accessibility fixes, loader + persistence
   - commit 5: edge cases, `tests/orderRules.test.js`, README, DECISIONS.md, deployment config
   Add files in stages (`git add <folder>`) as you actually work. Get the final hash with `git rev-parse HEAD`.
5. **Deploy:** push to GitHub, import on Vercel (vercel.json is included) or Netlify (`public/_redirects` is included). Build command `npm run build`, output `dist`. Then open `/items/m01` directly and refresh to check nested routes.
6. **Report:** add screenshots, export REPORT_DRAFT.md to PDF.
7. **ZIP:** name it `RollNo_Name_Section_A#02.zip` without node_modules and dist.
8. **Viva:** read every file once. Be able to change a constant (e.g. MAX_PER_ITEM in orderRules.js), modify a function, and explain useState, useEffect cleanup, props, keys, and why rules live in a separate file.
