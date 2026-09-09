# NOVA — Design & Technical Strategy Note

The core strategy behind NOVA was to translate the precision of a high-end performance marketing agency into a tangible digital experience. Rather than relying on noisy layouts typical of the marketing industry, we adopted a visual language inspired by Apple and Linear: minimal copy, extreme editorial typography, intentional whitespace, and smooth, cinematic motion.

### Design Decisions
To achieve a "premium" feel, we stripped away visual clutter.
- **Typography as Interface**: Utilizing Inter with tight tracking on large headings, the text becomes the primary design element.
- **Subtle Depth**: Instead of flat colors, we used glassmorphism and deep vignette gradients to create physical space.
- **Intentional Restraint**: We limited the color palette to black, white, and gray, reserving vivid color exclusively for the animated `GradientOrb` and CTAs.

### Technical Architecture
The application uses Next.js 15 and Tailwind CSS v4 for high performance and strict typing.
- **Motion System**: Framer Motion strictly handles `opacity` and `transform` CSS properties. This ensures animations run on the GPU, eliminating layout shifts (CLS = 0) and maintaining a 70ms Total Blocking Time.
- **Progressive Enhancement**: We integrated `useReducedMotion` across components to respect user OS preferences, providing instant rendering for those who prefer static interfaces.
- **Lead Generation**: The form bypasses complex backends by hooking into a Google Apps Script endpoint via React Hook Form and Zod, ensuring robust validation while keeping the repository serverless.

This combination of restrained aesthetics and precise engineering creates a digital footprint engineered to convert.
