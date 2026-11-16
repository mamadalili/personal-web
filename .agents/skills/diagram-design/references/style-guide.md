# Style Guide

Use the host article’s typography, colors and reading direction. The site loads Vazirmatn locally and the reader selects the theme. Its live tokens are in [portfolio.css](../../../../public/portfolio.css) and [color-mode.css](../../../../public/color-mode.css). This guide is the site’s working copy for diagrams.

### Semantic roles

| Role | Purpose | Light | Dark |
| --- | --- | --- | --- |
| `paper` | Figure or node surface | #ffffff | #191e2a |
| `paper-2` | Secondary surface | #f6f6f9 | #232938 |
| `ink` | Text and main marks | #292634 | #f1f1f7 |
| `ink-strong` | Text on solid accent | #ffffff | #10131c |
| `muted` | Labels and connections | #575568 | #b4bbcc |
| `soft` | Secondary annotation | #626073 | #abb0c2 |
| `rule` | Decorative division | #eeedf2 | #394153 |
| `rule-solid` | Axis, outline or boundary carrying meaning | #797784 | #858da3 |
| `accent` | The branch or comparison in focus | #1c0998 | #c2b5ff |
| `accent-tint` | Focal node surface | #efedff | #302b46 |
| `link` | An actionable destination | #1c0998 | #c2b5ff |

Use the host’s `--surface`, `--ink`, `--purple` and `--pale` for those roles. On a dark page, keep the drawing on a dark surface. Label meaningful differences in words as well as color. For multi-series data, preserve the article’s series identities in both languages; use direct labels, different markers or line styles to distinguish them. Allow 4.5:1 contrast for regular text and 3:1 for meaningful strokes against their actual background.

## Typography

| Role | Family | Size at reading width | Weight | Use |
| --- | --- | --- | --- | --- |
| `title` | Vazirmatn, Segoe UI, Tahoma, sans-serif | Match the article’s section heading | 700 | The reader’s question |
| `node-name` | Same as article | 15–18px | 600 | Action, state or series |
| `sublabel` | Same as article | 13–15px | 400 | Units and context |
| `eyebrow` | Same as article | 13–14px | 500 | Category if needed |
| `arrow-label` | Same as article | 13–15px | 500 | Transition or condition |
| `callout` | Same as article | 15–17px | 500 | Short reading of a result |

### Font source

Font source: system

In the page, inherit the site’s first-party font. For a portable proof use a locally installed font with the fallback stack above. Reflow long Persian or English labels at phone width. Keep Persian script joined with natural spacing. Localize values and units; keep the direction of a numeric axis consistent with its labels.

## Geometry and motion

Draw one relationship at a time. Use the selected type’s reference for its geometry, keep connectors clear of labels and use a short caption for the text equivalent. In Persian, mirror a reading sequence where it helps; keep every letter and numeral upright. In a chart, reveal the marks through the site’s shared entrance. The caption, values and controls stay readable from the first response. The complete figure is legible with reduced motion, keyboard input and JavaScript disabled.
