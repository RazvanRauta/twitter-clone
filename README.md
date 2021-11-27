# Twitter Clone with Next.js + Tailwind CSS + TypeScript

## Usage Guide

### 1. Change defaults

There are some things you need to change including title, urls, favicons, etc.

Find all comments with !STARTERCONF, then follow the guide.

Don't forget to change the package name in package.json

### 2. Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

## Snippets

This starter is equipped with workspace-snippets, it is encouraged to use it, especially the `np` and `rc`

### Next.js Page

File inside `src/pages` will be the webpage route, there are 2 things that need to be added in Next.js page:

1. Seo component
2. Layout class to give constraint to viewport width. [Read more about layout class](https://theodorusclarence.com/blog/tailwindcss-best-practice#1-using-layout-class-or-container).

Snippets: `np`

```tsx
import * as React from 'react';
import Seo from '@/components/Seo';
export default function TestPage() {
  return (
    <>
      <Seo templateTitle='Test' />
      <main>
        <section className=''>
          <div className='layout'></div>
        </section>
      </main>
    </>
  );
}
```

### React Components

To make a new component, It is encouraged to use `export default function`. Because when we need to rename it, we only need to do it once.

Snippets: `rc`

```tsx
import * as React from 'react';
export default function Component() {
  return <div></div>;
}
```

### Import React

Snippets: `ir`

```tsx
import * as React from 'react';
```

### Import Next Image

Snippets: `imimg`

```tsx
import Image from 'next/image';
```

### Import Next Link

Snippets: `iml`

```tsx
import Link from 'next/link';
```

### useState Hook

Snippets: `us`

```tsx
const [state, setState] = React.useState(initialState);
```

### useEffect Hook

Snippets: `uf`

```tsx
React.useEffect(() => {}, []);
```

### useReducer Hook

Snippets: `ur`

```tsx
const [state, dispatch] = React.useReducer(someReducer, {});
```

### useRef Hook

Snippets: `urf`

```tsx
const someRef = React.useRef();
```

### Region Comment

It is really useful when we need to group code. It is also collapsible in VSCode

Snippets: `reg`

```tsx
//#region  //*============== FORM SUBMIT
//#endregion  //*============== FORM SUBMIT
```

You should also use [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension.
