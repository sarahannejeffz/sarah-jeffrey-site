# Sarah Jeffrey — Personal Portfolio & Academic Showcase

ISDS 4125: Analysis and Design of Information Systems | Fall 2026  
E.J. Ourso College of Business, Louisiana State University

- **Live Website:** [https://sarahannejeffz.github.io/sarah-jeffrey-site/](https://sarahannejeffz.github.io/sarah-jeffrey-site/)
- **GitHub Repository:** [https://github.com/sarahannejeffz/sarah-jeffrey-site](https://github.com/sarahannejeffz/sarah-jeffrey-site)

---

## Project Overview

This project is a personal professional website built using Google's Antigravity IDE and native web technologies (HTML5, Vanilla CSS3, and JavaScript). The site implements a **hybrid architecture**:
1. **`index.html` (Hub Page):** Single-page overview containing all four core sections required by the rubric: **Profile**, **Skills**, **Experience**, and **Contact**, augmented with key quantitative impact metrics.
2. **`resume.html` (Subpage):** Comprehensive academic and career qualifications, highlighting a 3-pillar breakdown of 12 LSU courses across ISDS and Marketing, professional experience, leadership, and a downloadable PDF resume.
3. **`project.html` (Subpage):** In-depth technical case study of an E-Commerce Predictive Analytics & Customer Segmentation Engine, detailing business objectives, system architecture, data pipelines, and quantitative results.
4. **`styles.css` & `theme.js`:** Shared modern design system featuring glassmorphism, responsive CSS grid/flexbox layouts, WCAG-compliant contrast, and an interactive dark/light mode toggle with preference persistence.

---

## Technical Reflection

During development, I did not understand why our dark/light theme switch script initially caused a jarring "flash of unstyled content" (FOUC) when switching between pages—the screen would briefly flicker white before snapping to dark mode. I asked the agent why this happened even though the preference was saved in `localStorage`. The agent explained that because each HTML document renders independently and executes deferred scripts only after the DOM is constructed, the browser paints default light styles before reading `localStorage`. To solve this, the agent added a small, synchronous inline script in the `<head>` of every page (`index.html`, `resume.html`, and `project.html`) that immediately inspects `localStorage` and applies the `data-theme` attribute directly to `document.documentElement` before the browser performs its first paint. This taught me how browser parsing and rendering pipelines work, and why execution timing in the document lifecycle is critical for styling consistency.
