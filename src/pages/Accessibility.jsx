
import React from 'react'
export default function Accessibility(){
  return (<section>
    <h1>Accessibility Statement</h1>
    <p>We aim to meet WCAG 2.1 AA. Features include: keyboard focus styles, skip link, labels for inputs, and semantic HTML.</p>
    <ul>
      <li>Color contrast ≥ 4.5:1 for text</li>
      <li>Forms have programmatically associated labels</li>
      <li>Alt text for images that convey meaning</li>
      <li>ARIA landmarks: banner, navigation, main, contentinfo</li>
    </ul>
  </section>)
}
