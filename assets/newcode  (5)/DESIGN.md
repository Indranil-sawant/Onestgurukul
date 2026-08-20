---
name: Lumina Academic System
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#4d4632'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#7f7660'
  outline-variant: '#d1c6ab'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#eec200'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#ac2a5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffc0cf'
  on-tertiary-container: '#a52458'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c5'
  on-tertiary-fixed: '#3f001b'
  on-tertiary-fixed-variant: '#8c0a46'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system establishes a high-tier academic atmosphere that balances the rigor of elite education with a nurturing, contemporary warmth. The brand personality is authoritative yet approachable, mimicking the precision of leading technology firms like Apple and Stripe while maintaining the vibrant energy of a premium learning environment.

The design style is **Modern Minimalism with Glassmorphic accents**. It prioritizes high breathing room and a strict 8pt spacing rhythm to ensure clarity. The aesthetic relies on "Warm Vanilla" surfaces to create a more inviting, high-end alternative to stark white or dark modes, evoking the feel of premium stationary and sophisticated architectural spaces. Visual interest is driven by subtle depth, micro-interactions, and a sophisticated interplay between structured charcoal and luminous golden highlights.

## Colors

The palette is anchored by **Charcoal Black** for structural elements and high-contrast typography, ensuring professional weight. **Golden Yellow** serves as the primary action color, symbolizing the "light of knowledge" and optimism. **Pre-Primary Pink** is used sparingly as a high-energy accent for creative sections, early-childhood modules, or specific call-to-actions.

The primary background strategy utilizes **Warm Vanilla Mode** instead of pure white. This reduces eye strain and reinforces a premium, "classic-modern" editorial feel. 

- **Primary:** #FACC15 (Golden Yellow) - Use for primary buttons, active states, and highlights.
- **Secondary:** #111111 (Charcoal Black) - Use for headers, text, and structural borders.
- **Accent:** #FF6B9D (Pre-Primary Pink) - Use for playful highlights and creative categories.
- **Base:** #FFF9D9 (Warm Vanilla) - Main application background.
- **Surface:** #FFF3B0 (Vanilla Card) - Secondary surfaces and card containers.

## Typography

The typography system pairs **Libre Caslon Text** for headings with **Hanken Grotesk** for functional text. This juxtaposition creates an "Elite Academic" feel—the Serif provides historical authority and prestige, while the Sans-Serif offers modern, tech-forward legibility.

- **Headings:** Use Libre Caslon Text with tight letter-spacing for large displays. Maintain high contrast by using Charcoal Black (#111111).
- **Body:** Use Hanken Grotesk. It provides a clean, neutral canvas that balances the decorative nature of the serif.
- **Labels:** Always uppercase with increased letter spacing for small metadata and overlines to maintain a disciplined, organized appearance.

## Layout & Spacing

The system follows a strict **8pt Grid** to ensure mathematical harmony. Layouts should utilize generous whitespace ("Luxury Gap") to separate distinct conceptual areas.

- **Grid:** A 12-column fluid grid for desktop with 24px gutters. On mobile, transition to a single column with 16px side margins.
- **Alignment:** Content is generally center-aligned for marketing pages and left-aligned for functional dashboards.
- **Padding:** Use `lg` (48px) or `xl` (80px) vertical padding between major sections to emphasize the minimalist, high-end aesthetic.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and soft, ambient shadows rather than harsh borders.

- **Glassmorphism:** Navigation bars and floating modals use a backdrop filter (`blur: 12px`) with a high-transparency fill of the surface color (`alpha: 0.7`). A 1px border of `rgba(17, 17, 17, 0.08)` provides definition.
- **Hover States:** Interactive elements (cards, buttons) should utilize a "Lift and Glow" effect. On hover, elements translate -4px Y-axis and gain a soft, wide shadow with a slight color tint matching the element's primary tone.
- **Layers:** 
  - Level 0: Background (#FFF9D9)
  - Level 1: Standard Cards (#FFF3B0)
  - Level 2: Floating Navigation / Popovers (Glassmorphic)

## Shapes

The shape language is fluid and modern. Standard containers use a **16px radius**, while large feature cards and hero sections utilize a **24px radius**. 

- **Standard Elements:** 8px (Buttons, Inputs).
- **Cards:** 16px.
- **Feature Sections:** 24px.
- **Interactive Pill:** Use fully rounded (999px) for tags and chips to contrast against the structured grid.

## Components

### Buttons
- **Primary:** Background #FACC15, Text #111111, Bold Hanken Grotesk. 8px radius. Subtle bottom-heavy shadow.
- **Secondary:** Transparent background, 1.5px border of #111111.
- **Ghost:** No background or border, becomes #FFF3B0 on hover.

### Navigation
- **Sticky Glass Header:** 72px height, 12px backdrop blur, #FFF9D9 at 70% opacity. 1px bottom border stroke.

### Interactive Cards
- **Structure:** 16px padding, #FFF3B0 background. 
- **Interaction:** On hover, apply a 20px blur shadow of #FACC15 at 15% opacity. Scale element to 1.02x for a "tactile" feel.

### Input Fields
- **Style:** Minimalist. Only a bottom border (2px) of #111111 for a sophisticated, "form-like" look, or a light-filled container (#FFF3B0) with 8px radius for dashboard contexts.

### Progress Indicators
- Use the **Pre-Primary Pink** (#FF6B9D) for progress bars and completion states to provide a sense of reward and creativity.

### Motion & Transitions
- **Scroll Reveals:** Sections should fade in and slide up (20px) as they enter the viewport.
- **Parallax:** Subtle 5-10% speed variance on background decorative elements (abstract academic shapes) to create depth during scroll.