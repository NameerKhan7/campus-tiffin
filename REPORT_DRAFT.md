# Assignment 02 Report: Campus Tiffin
(Fill the YOUR-... parts, add screenshots, then export to PDF. Keep it short.)

## 1. Student and project details
| Item | Value |
|---|---|
| Name / Roll no / Section | YOUR NAME / YOUR ROLL NO / YOUR SECTION |
| Business name | Campus Tiffin |
| Repository | YOUR-GITHUB-LINK |
| Deployment | YOUR-DEPLOY-LINK |
| Final commit hash | PASTE-HASH |

## 2. Business profile
| Element | Detail |
|---|---|
| Identity | Campus Tiffin: home-style meals, weekly bundles, sides and chai |
| Audience | University students in Islamabad on a budget |
| Operating area | Pickup from H-11 kitchen; delivery to G-11, H-11, H-12, I-8, F-10 |
| Main customer task | Choose meals, build an order, choose pickup or delivery and confirm |
| Business goal | Completed orders (simulated) |
| Offering | 13 items: 7 meals, 2 weekly bundles, 4 sides and drinks |

## 3. Operating rules
| Rule | Exact condition | Where users are told | App behaviour | Boundary case |
|---|---|---|---|---|
| Availability | Max 5 of one item and never more than stock left | Menu top note, details page, card message | "+" and "Add" disabled; message shown | Item with 3 left: 3 allowed, 4 blocked |
| Eligibility | Nut allergy ticked: no "Contains nuts" items | Tag on cards, hint beside checkbox | Warning box lists items; order cannot be placed | One nut item + allergy ticked = blocked; remove it = allowed |
| Pricing/fulfilment | Delivery min Rs 800; fee Rs 150, free from Rs 2000; pickup no min/fee; listed areas only | Home, menu top, sticky bar, checkout | Below Rs 800 delivery is blocked with "Add Rs X more" | Rs 800 allowed, Rs 799 blocked; Rs 2000 = free delivery |

## 4. Reference-site investigation (YOU MUST COMPLETE WITH REAL EVIDENCE)
Pick one real food/restaurant website. For each problem add URL, screenshot, task, what goes wrong, business consequence, and how Campus Tiffin fixes it.
Suggested problems to look for (use them ONLY if you actually observe them; otherwise find your own):
1. Listings leave out comparison information (calories, dietary info, stock).
2. Minimum order or delivery fee appears only at checkout.
3. Filters or selections reset after opening an item and going back.

Template per problem: **URL:** ... | **Screenshot:** ... | **Task:** ... | **Observed:** ... | **Possible consequence (opinion, not statistic):** ... | **Our fix:** ...

## 5. Frontend decisions
Copy the three tables from `DECISIONS.md`.

## 6. Implemented application
Add screenshots (390 px and 1280 px) with short annotations: home, menu with filters, details, cart, checkout with errors, confirmation, error + retry state, empty-results state.

## 7. Verification
**Automated test:** `node --test` result: 7 tests, 7 pass, 0 fail (tests/orderRules.test.js; tests the same functions the app imports).

**Edge-case checklist (fill the Observed column yourself in Chrome/Edge with the console open):**
| Case | Action | Expected | Observed |
|---|---|---|---|
| Loading failure | Demo controls: simulate failure, reload, open Menu | Error message + working Try again | |
| Changed availability | Add Karahi x3, Daal x3, Keema; tick change availability; reload | Items fixed/removed and notice explains | |
| Empty results | Search "pizza" | "No items match" + Clear all filters | |
| Empty dataset | Simulate empty menu; reload | "Menu is empty" message | |
| Invalid URL | Open /items/zzz | "We could not find that item" + link back | |
| Invalid form | Submit checkout empty | Specific errors; other inputs kept | |
| Delivery boundary | Subtotal Rs 799 vs Rs 800 with delivery | 799 blocked, 800 allowed | |
| Nut allergy | Add Almond Halwa, tick allergy | Blocked with item named | |
| Quantity limit | Add one item 6 times | 6th blocked with message | |
| Refresh persistence | Add items, refresh | Order is restored | |
| Keyboard | Tab through menu to checkout | All controls reachable, focus visible | |

**Improvements check:** for each of the 3 problems, record actions, expected, observed.

## 8. Limitations
No real photos; stock not reduced after an order; filters reset on full refresh; everything simulated.
