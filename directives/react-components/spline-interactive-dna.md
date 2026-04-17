# Interactive Spline 3D Implementation (DNA Model)

This directive defines the standard for implementing high-performance, interactive 3D elements using Spline in React projects, based on the implementation in the Mariana Bermudes project.

## Core Features
1. **Performance Optimization**: Uses `IntersectionObserver` to pause/stop the Spline application when outside the viewport.
2. **Visual Integration**: Uses CSS Masking (`linear-gradient`) to create seamless top/bottom fades.
3. **Layout Overlap**: Uses negative margins and high z-index layers to allow the 3D model to interact with surrounding text/components.

## Implementation Details

### 1. The React Component Logic
```tsx
import Spline from '@splinetool/react-spline';
import { useEffect, useRef, useState } from 'react';

// ... inside component
const splineAreaRef = useRef<HTMLDivElement>(null);
const [splineApp, setSplineApp] = useState<{ play?: () => void, stop?: () => void } | null>(null);

// Performance Observer
useEffect(() => {
  if (!splineApp || !splineAreaRef.current) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (typeof splineApp.play === 'function') splineApp.play();
      } else {
        if (typeof splineApp.stop === 'function') splineApp.stop();
      }
    });
  }, { threshold: 0, rootMargin: '100px' });

  observer.observe(splineAreaRef.current);
  return () => observer.disconnect();
}, [splineApp]);
```

### 2. Styling and Interaction
The element is wrapped in a container with a `mask-image` to prevent hard edges:

```tsx
<div className="relative z-10 w-full h-full"
     style={{
       WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
       maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
     }}>
  <Spline 
    scene="https://prod.spline.design/23mP4RppmrjsD4Yo/scene.splinecode" 
    onLoad={(spline) => {
      spline.setBackgroundColor('#faf6f0'); // Match site background
      setSplineApp(spline);
    }}
  />
</div>
```

### 3. Positioning Pattern
To achieve the "split screen" feel where the 3D model is on the right and space is reserved on the left:
1. Container: `flex flex-col md:flex-row`
2. Left Placeholder: `hidden md:block w-1/2`
3. Right Spline: `w-full md:w-1/2`

## Usage in Other Projects
Run the companion execution script `execution/generate_spline_interactive.py` to generate the boilerplate code for a new 3D section.
