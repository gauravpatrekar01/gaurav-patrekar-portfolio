---
title: "React Hooks: Mastering useState and useEffect"
description: "A comprehensive guide to understanding and using React Hooks for state management and side effects."
date: "2026-05-10"
tags: ["React", "JavaScript", "Frontend", "Tutorial"]
cover: "/images/blog/react-hooks.jpg"
featured: true
author: "Gaurav Patrekar"
---

# React Hooks: Mastering useState and useEffect

React Hooks revolutionized how we write React components. Let's dive into the two most important hooks: `useState` and `useEffect`.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. Before hooks, you had to use class components to access these features.

## The useState Hook

`useState` allows you to add state to functional components.

### Basic Syntax

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Multiple State Variables

```javascript
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  );
}
```

## The useEffect Hook

`useEffect` allows you to perform side effects in function components.

### Running Once After Render

```javascript
import { useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty dependency array

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### Running on Every Render

```javascript
useEffect(() => {
  console.log('Component rendered');
  // No dependency array means it runs after every render
});
```

### Running When Dependencies Change

```javascript
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]); // Runs when 'count' changes
```

### Cleanup Function

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer running');
  }, 1000);

  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

## Common Patterns

### Fetch Data with Loading State

```javascript
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

## Best Practices

1. **Keep effects focused**: Each effect should do one thing
2. **Use dependency arrays**: Always specify dependencies
3. **Avoid infinite loops**: Be careful with dependencies
4. **Clean up resources**: Use cleanup functions for subscriptions and timers
5. **Don't call hooks conditionally**: Always call hooks at the top level

## Conclusion

Hooks are a powerful feature that makes React code more reusable and easier to understand. Master `useState` and `useEffect` and you'll be well on your way to becoming a React pro!
