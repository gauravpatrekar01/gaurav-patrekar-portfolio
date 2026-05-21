---
title: "CSS Grid vs Flexbox: When to Use Each"
description: "A comprehensive comparison of CSS Grid and Flexbox with practical examples and use cases."
date: "2026-04-30"
tags: ["CSS", "Frontend", "Web Design", "Tutorial"]
cover: "/images/blog/css-grid-flexbox.jpg"
featured: false
author: "Gaurav Patrekar"
---

# CSS Grid vs Flexbox: When to Use Each

Flexbox and Grid are two powerful CSS layout tools. Understanding when to use each will make you a better web developer.

## Flexbox Basics

Flexbox is a one-dimensional layout system. It distributes items in a row or column with flexible sizing.

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

### When to Use Flexbox

- **Navigation bars**: Distribute items horizontally
- **Card layouts**: Center content within cards
- **Form layouts**: Align form elements
- **Centering content**: Both horizontal and vertical
- **One-dimensional layouts**: Items in a single row or column

```css
/* Navigation Example */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-items {
  display: flex;
  gap: 2rem;
}
```

## Grid Basics

Grid is a two-dimensional layout system. It divides the container into rows and columns.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
}
```

### When to Use Grid

- **Page layouts**: Create complex multi-row/column layouts
- **Dashboards**: Arrange widgets in a grid
- **Image galleries**: Create responsive grids
- **Two-dimensional layouts**: When you need rows AND columns
- **Asymmetrical layouts**: Different sized items in different areas

```css
/* Dashboard Example */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Practical Comparison

### Example 1: Navigation

**Flexbox** is perfect for navigation:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
```

### Example 2: Page Layout

**Grid** is perfect for complex page layouts:

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 2rem;
  min-height: 100vh;
}

.header {
  grid-column: 1 / -1;
}

.footer {
  grid-column: 1 / -1;
}
```

### Example 3: Cards in a Row

**Flexbox** works well:

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1;
  min-width: 250px;
}
```

### Example 4: Responsive Grid

**Grid** is powerful:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

## Combining Grid and Flexbox

You can use both together:

```css
/* Grid for page structure */
.app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Flexbox for header items */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid for main content */
.main {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

/* Flexbox for cards */
.cards {
  display: flex;
  gap: 1rem;
}
```

## Responsive Design

### Flexbox Response

```css
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
}
```

### Grid Response

```css
@media (max-width: 768px) {
  .page {
    grid-template-columns: 1fr;
  }
}
```

## Decision Tree

1. **Is it one-dimensional?** → Use **Flexbox**
2. **Is it a complex layout?** → Use **Grid**
3. **Is it a navigation?** → Use **Flexbox**
4. **Is it a page structure?** → Use **Grid**
5. **Do you need both?** → **Combine them!**

## Conclusion

- **Flexbox**: One-dimensional, simple layouts, components
- **Grid**: Two-dimensional, complex layouts, structure

Most modern layouts use both! Master both and you'll handle any layout challenge.
