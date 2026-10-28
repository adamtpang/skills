---
name: mobile-style
description: Build or refactor application interfaces around familiar mobile-app interaction patterns, especially messaging lists, master-detail panes, touch controls, and responsive single-pane navigation.
---

# Mobile Style

Make the product feel like a focused native mobile app while using larger screens well. Preserve existing product behavior, data contracts, accessibility, and authorization boundaries.

## Shape the experience

- Start from the user's core loop and the app's real data. Remove page-level chrome that competes with that loop.
- Prefer familiar app anatomy over dashboard cards. For messaging, use a conversation list and a conversation detail view.
- On desktop, keep the conversation list in a stable-width sidebar and let the selected conversation fill the remaining space.
- On narrow screens, show one pane at a time. Opening a conversation replaces the list and exposes a clear back control. Do not stack a shortened list above the conversation.
- Keep the selected item, scroll position, and draft intact when the viewport changes.

## Build recognizable rows

- Give each list row stable tracks for avatar, content, and metadata so dynamic text cannot move the layout.
- Use the real profile image when the source provides one. Fall back to a deterministic initial and color when it does not.
- Put the contact or group name first, then a one-line message preview. Put time and unread or priority state at the trailing edge.
- Keep tap targets at least 44 by 44 CSS pixels. Use familiar icons with accessible labels for compact actions.

## Keep detail focused

- Use a compact identity header, a flexible scrolling content area, and a composer or primary action fixed to the bottom.
- Make messages visually distinguishable by sender without turning every surrounding section into a card.
- Preserve keyboard navigation, visible focus, semantic labels, and reduced-motion behavior.
- Avoid marketing copy, ornamental decoration, nested cards, and instructions that describe the interface inside the interface.

## Verify the result

- Test at approximately 390 by 844 and 1440 by 900.
- Confirm there is no horizontal overflow, text overlap, clipped controls, blank detail pane after selection, or inaccessible action.
- Confirm mobile back navigation and desktop selection both work with real and missing avatars, long names, long previews, loading states, and empty states.
