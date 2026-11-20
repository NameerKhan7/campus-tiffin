# Frontend decisions

Reference: https://bundukhan.pk/menu; reviewed 20 November 2026 in Chrome at 1280 px and 390 px, delivery branch DHA Lahore. Findings below describe the captured menu and branch-selection views, not every page or every branch of the reference site.

## Decision 1: Combined filters in shared state
| Field | Content |
|---|---|
| Problem | The captured listing offers category selection and search, but no visible diet selector or price-sort control. Comparing suitable meals on a budget requires scanning cards. |
| Decision | Combine search, category, diet and sort. Keep them in App state so opening an item and returning preserves the comparison. |
| Alternative | URL query parameters for shareable, refresh-persistent filters. |
| Reason | Students can narrow meals by both budget and diet without repeatedly rebuilding a selection. |
| Tradeoff | Filters survive route navigation but reset on full refresh; App owns more state. |
| Code location | src/App.jsx (filters/updateFilter); src/components/FilterBar.jsx (FilterBar); src/utils/filterItems.js (filterAndSort) |
| Evidence | Set Vegetarian + Meals + price ascending; search daal; open Daal and return. Filters remain. Screens: reference-menu-desktop.png, filters-1280.png, filters-390.png. |

## Decision 2: Comparison information on every card
| Field | Content |
|---|---|
| Problem | The captured soup cards show image, name, starting price and add action, with no visible calorie, dietary or explicit nut-allergen tags. |
| Decision | Show price, calories, diet, spice, nut warnings and stock as text labels on each Campus Tiffin card. Repeat facts in details. |
| Alternative | Put nutritional and availability facts only on item details. |
| Reason | Early comparison reduces repeated detail visits; a nut conflict is also enforced at checkout. |
| Tradeoff | Cards are taller. Nutrition and allergy values are fictional demo data, not verified restaurant data. |
| Code location | src/components/ItemCard.jsx (ItemCard); src/pages/ItemDetailsPage.jsx (ItemDetailsPage); src/rules/orderRules.js (findNutConflicts/getOrderIssues) |
| Evidence | Compare menu cards, then add Almond Halwa and tick nut allergy in checkout. Tags are visible; warning names Halwa. Screens: reference-menu-desktop.png, menu-1280.png, menu-390.png, allergy-block-390.png. |

## Decision 3: Delivery conditions before checkout
| Field | Content |
|---|---|
| Problem | Neither the captured initial branch-selection dialog nor the captured menu viewport states a delivery fee or minimum-order threshold. The cost cannot be calculated from those views. |
| Decision | State the Rs 800 delivery minimum, Rs 150 fee and Rs 2000 free-delivery threshold on home/menu. A fixed order bar shows the current subtotal and remaining amount. |
| Alternative | Reveal all fulfilment conditions at checkout. |
| Reason | A customer can adjust an order before reaching a checkout block. |
| Tradeoff | The fixed bar consumes mobile space. Extra footer clearance keeps lower controls reachable. |
| Code location | src/components/CartBar.jsx (CartBar); src/rules/orderRules.js (getDeliveryHint/checkDelivery); src/styles/global.css (.cart-bar/.site-footer) |
| Evidence | Add one Rs 300 Daal; read the Rs 500 shortfall; select delivery at checkout. Below-minimum order is blocked. Screens: reference-delivery-dialog.png, delivery-hint-390.png, delivery-block-390.png. |

