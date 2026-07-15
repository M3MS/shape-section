# Shape Section

A custom Gutenberg block (`wp-theme-fse/shape-section`) for building a hero/section layout with a background image and flexible content alignment, including a separate image for mobile.

## What it does

- Renders a `<section>` with a background image on one side and editable content (heading, text, buttons) on the other, via `InnerBlocks`.
- Content alignment can be set to left or right, which mirrors/flips the layout and the image's clip-path shape on larger screens.
- Supports an optional, separate background image for mobile viewports, each with its own focal point (position).
- Desktop image and mobile image each support a custom focal point via `FocalPointPicker`, stored as CSS custom properties (`--image-left`, `--image-top`, `--mobile-image-left`, `--mobile-image-top`) and applied in `style.scss`.
- Registers block supports for wide/full alignment, margin/padding/blockGap spacing, and background color.

## Files

| File | Purpose |
|---|---|
| `block.json` | Block metadata: name, attributes, supports, and asset references. |
| `index.js` | Registers the block with WordPress (`registerBlockType`), wiring up `edit`/`save` and importing styles. |
| `edit.js` | Editor UI: `InspectorControls` panels for content alignment, background image, and mobile background image (with focal point pickers), plus the `InnerBlocks` template. |
| `save.js` | Frontend markup persisted to post content: renders the desktop/mobile images and `InnerBlocks.Content`. |
| `style.scss` | Frontend (and editor, via `@use`) styles — mobile-first layout, clip-path shapes, and responsive breakpoints at 900px and 1400px. |
| `editor.scss` | Editor-only stylesheet; currently just re-uses `style.scss`. |

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `backgroundImage` | object | Desktop background image (`id`, `url`, `alt`, `srcset`, `sizes`, `width`, `height`). |
| `imagePosition` | object \| null | Focal point `{ x, y }` (0–1) for the desktop image; `null` means no custom position set. |
| `mobileBackgroundImage` | object | Optional background image shown only on mobile, same shape as `backgroundImage`. |
| `mobileImagePosition` | object \| null | Focal point for the mobile image. |
| `contentAlignment` | string | `left` (default) or `right`. Controls layout direction and image clip-path on desktop. |

## Layout behavior

- **Mobile (< 900px):** image stacks above the content, using `mobileBackgroundImage` if set (otherwise falls back to `backgroundImage`), clipped with a circular mask.
- **Desktop (≥ 900px):** image and content sit side by side (50/50), reversed when `contentAlignment` is `left`. The image is clipped into a large circular shape whose position depends on alignment.
- **Large screens (≥ 1400px):** the circular clip-path expands to fully round out the image edge.

## Requirements

This directory contains only the block's source files (no `package.json`/build config) — it's meant to be placed inside a theme or plugin's blocks folder that's built with `@wordpress/scripts` (`wp-scripts build`/`start`), since `block.json` references compiled `index.js`, `index.css`, and `style-index.css` output. Registering it also requires the WordPress PHP side to call `register_block_type()` (or equivalent) pointing at this block's `block.json`.

## Usage

Once built and registered, the block appears in the inserter under the **Design** category as "Shape Section". Add it, choose a background image (and optionally a mobile-specific one), set the focal point if needed, and pick left/right content alignment from the sidebar.
