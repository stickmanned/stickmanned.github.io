# Master Prompt for AI Design Apps

Copy and paste the full prompt below into Claude Design, Google Stitch, or a similar AI design app.

---

## Master Prompt

Design and generate a complete personal portfolio website for **William Wen**.

William is a high school student builder with a strong interest in hardware projects, software, web apps, games, writing, and community leadership. The site should make visitors think: **this person is capable, technical, creative, self-directed, and worth remembering.**

Primary audiences:
- Friends and peers who should find the site cool and memorable.
- Admissions reviewers who need to quickly understand William's initiative and range.
- Internship reviewers who need evidence of technical ability, communication, and project follow-through.
- General visitors who are judging the site quickly and deciding whether William seems impressive.

Primary goal:
Create a sleek, modern, minimal, professional portfolio that feels Apple-like and premium, while also including a memorable interactive experience. The interaction should make the projects feel alive, but it must not distract from the core purpose: showing William's strongest work clearly.

The website should feel like:
- A premium student builder portfolio.
- A calm Apple-style product page.
- A modern interactive project showcase.
- A technical portfolio with personality.

The website should **not** feel like:
- A generic dark developer portfolio.
- A game where the visitor has to work before understanding the content.
- A scrapbook where hobbies and pets appear before the strongest accomplishments.
- A flashy animation demo that hides the actual projects.
- A landing page that talks about the site instead of showing the real portfolio.

## Core Positioning

Use this positioning idea throughout the design:

**William Wen builds hardware experiments, web apps, games, and community projects.**

Suggested hero copy:

**William Wen**
Hardware-focused student builder creating web apps, games, and physical computing projects.

Supporting copy:
I build projects across hardware, software, games, writing, and community. My best work combines curiosity, technical problem-solving, and a habit of turning ideas into real things.

Primary calls to action:
- View Projects
- View Resume
- Contact

Secondary links:
- GitHub
- YouTube / FHC Tech
- Writing
- Experience

## Required Site Structure

Create a full website, not just a hero section.

Required top-level navigation:
- Home
- Projects
- Experience
- Writing
- About
- Resume
- Contact

Avoid dropdown-first navigation. Use direct navigation links that are easy to understand. On mobile, use a clean menu.

Recommended URL structure:
- `/`
- `/projects/`
- `/projects/pine-a64-gaming-pc/`
- `/projects/blossom/`
- `/projects/ai-nerf-aimbot/`
- `/projects/spacegoose/`
- `/projects/lamp-pro/`
- `/projects/ncase-m2/`
- `/experience/`
- `/writing/`
- `/about/`
- `/resume/`
- `/contact/`

## Homepage Requirements

The homepage must be the strongest page. It should immediately explain who William is and show his best work.

Homepage sections, in order:

1. **Hero**
   - William's name.
   - Clear positioning line.
   - Short supporting copy.
   - Primary CTAs.
   - Interactive project constellation or 2.5D background.

2. **Featured Projects**
   - Show flagship work immediately.
   - Use large visual project cards.
   - Do not require the visitor to select a category before seeing projects.
   - Include Pine A64, Blossom, AI Nerf Aimbot, SpaceGoose, Lamp Pro, and NCASE M2 or another hardware build.

3. **Builder Range**
   - Show William's range across hardware, web apps, games, writing, and leadership.
   - Use compact cards or a horizontal capability strip.

4. **Experience and Achievements Preview**
   - Hackathons, events, awards, club leadership, and notable milestones.
   - Use a polished timeline or compact proof grid.

5. **Selected Writing**
   - Show writing as a strength, but not above projects.
   - Include a few selected pieces with cover images and short descriptions.

6. **About Preview**
   - Short personal section with hobbies and personality.
   - Pets and hobbies are welcome here, but they should not dominate the first impression.

7. **Final Contact CTA**
   - Clear links to resume, email, GitHub, YouTube, and contact.

## Signature Interactive Concept

Create a memorable hero interaction called the **Project Constellation**.

The Project Constellation should be a subtle 2.5D or lightweight 3D scene behind or beside the hero copy. It should represent William's project universe.

Objects/nodes to include:
- Pine A64 Gaming PC: small circuit board, chip, or compact case object.
- Blossom: glassy flower, garden tile, or focus-app node.
- AI Nerf Aimbot: target reticle, camera module, or vision marker.
- SpaceGoose: game badge, tiny spacecraft, or playful goose-themed icon.
- Lamp Pro: perforated lamp or CAD object.
- NCASE M2 PC: compact PC cube or small hardware object.

Interaction behavior:
- The constellation gently reacts to cursor movement on desktop.
- Project nodes subtly rotate, glow, or lift on hover.
- Hovering a node shows a small preview label with project name and one-line summary.
- Clicking a node opens the related project case study.
- On scroll, objects should separate slightly and transition into the Featured Projects section.
- On mobile, replace the freeform constellation with a swipeable featured-project carousel or a simplified static composition.

Important:
- The interactive scene must never block the headline, CTAs, or navigation.
- The site must still work if the 3D or animated layer does not load.
- The interaction should feel polished and quiet, not chaotic.

## Visual Design Direction

Design style:
- Sleek
- Modern
- Minimal
- Premium
- Apple-like
- Slightly futuristic
- Project-first

Use a restrained visual system:
- Background: off-black, soft white, or alternating premium light/dark sections.
- Primary dark: `#08090B`
- Primary light: `#F5F7FA`
- Ink: `#111827`
- Muted text: `#8A94A6`
- Accent: electric cyan/blue such as `#4CC9F0` or calibrated blue such as `#2E74B5`
- Borders: very subtle, not pure white outlines everywhere.
- Cards: 8px border radius, clean spacing, soft depth.
- Buttons: clear text CTAs, not endless rounded pill buttons.

Typography:
- Use a clean modern sans-serif similar to Inter, SF Pro, or Helvetica Neue.
- Use large confident display type in the hero.
- Use readable body text with generous line height.
- Do not scale type wildly with viewport width.
- Do not use negative letter spacing.

Layout:
- Use strong whitespace.
- Use left-aligned text for long content.
- Use centered text only where it improves the composition.
- Create a clear content hierarchy with section rhythm.
- Make project images large and prominent.
- Use direct scan-friendly blocks for reviewers.

Avoid:
- Purple/blue generic AI gradient overload.
- Dark mode with only white borders.
- Every element inside a rounded pill.
- Nested cards inside cards.
- Long centered paragraphs.
- Empty category states.
- Hiding primary content behind tabs, dropdowns, or playful mechanics.

## Motion and Interaction System

Use motion to create a premium feeling, but keep it controlled.

Recommended motion patterns:
- Hero project constellation with cursor response.
- Subtle parallax depth between background, project objects, and text.
- Project cards with small lift, tilt, and highlight on hover.
- Scroll-revealed section headings with masked line reveal or word lighting.
- Sticky project preview on project pages.
- Smooth but fast transitions between sections.

Depth model:
- Depth 0: far background, subtle grid/noise/atmosphere.
- Depth 1: glow, light sweeps, soft highlights.
- Depth 2: midground project companion objects.
- Depth 3: main project objects and featured visuals.
- Depth 4: text, navigation, buttons, labels.
- Depth 5: foreground cursor halo or tiny interaction accents.

Accessibility and performance rules:
- Include a reduced-motion version.
- Do not animate essential information.
- Animate only transform, opacity, filter, or clip-path.
- Avoid animating layout properties like width, height, top, or left.
- Keep mobile interactions simpler than desktop interactions.
- Use lazy loading for images below the fold.
- Decorative animated layers should be marked decorative in implementation.

## Projects Content

The Projects page should be a true work hub.

Required project categories:
- Featured
- Hardware
- Web Apps
- Games
- Experiments
- Writing or Creative Work, if useful

Project card fields:
- Project name
- One-line impact statement
- Image or visual preview
- Tags or tech stack
- Year or date
- Link to case study

Featured projects to prioritize:

1. **Pine A64 Gaming PC**
   - Custom-cooled, 3D-printed, single-board-computer cloud gaming PC.
   - Should feel like a serious hardware flagship project.

2. **Blossom**
   - Productivity Chrome extension with gamified focus and virtual garden growth.
   - Strong for software, UI, and hackathon proof.

3. **AI Nerf Gun Aimbot**
   - Computer vision / ML flavored hardware project.
   - Great for showing technical ambition.

4. **SpaceGoose**
   - Game jam project.
   - Good for showing game design and creativity.

5. **Lamp Pro**
   - AutoCAD / 3D design lamp inspired by Mac Pro and Noctua patterns.
   - Good for CAD/design/manufacturing interest.

6. **NCASE M2 PC Build**
   - Small form factor PC build.
   - Good for hardware taste and technical detail.

## Project Case Study Template

Every serious project page should follow this structure:

1. **Project Hero**
   - Project name.
   - One-line outcome.
   - Large image, video, or interactive preview.
   - Links: demo, GitHub, writeup, download, or related source.

2. **Problem**
   - What was the challenge or idea?
   - Why did this project matter?

3. **What I Built**
   - Clear explanation of the final project.
   - Use diagrams or annotated visuals if helpful.

4. **My Role**
   - What William personally designed, coded, built, tested, or documented.

5. **Tech Stack**
   - Hardware, languages, tools, frameworks, libraries, CAD software, or platforms.

6. **Build Process**
   - Research, sketches, prototypes, iteration, constraints, and decisions.

7. **Challenges**
   - Hard technical or design problems.
   - Tradeoffs and what changed.

8. **Result**
   - Demo, award, usage, outcome, lesson, or proof.

9. **Gallery**
   - Images with concise captions.

10. **Related Project or CTA**
   - Link to another project, resume, or contact.

The case studies should feel like evidence, not just image dumps.

## Experience Page

Design an Experience page that combines:
- Events
- Hackathons
- Leadership
- Awards
- Achievements
- Notable milestones

Use a polished timeline or grouped proof system.

The page should answer:
- What has William participated in?
- What has he led?
- What has he won or been recognized for?
- How does this connect to his projects?

Avoid starting with buttons that reveal empty states. Show useful content immediately.

## Writing Page

Design Writing as a polished secondary section.

Goals:
- Show communication skill.
- Show intellectual curiosity.
- Keep it organized and readable.

Suggested structure:
- Featured writing first.
- Then categories: books, essays, short stories, other.
- Each writing card includes title, cover image, short description, year, and link.

Writing should not outrank flagship projects on the homepage.

## About Page

Design the About page to show personality after credibility.

Include:
- Short bio.
- Coding journey.
- Hardware and PC building interests.
- 3D modeling / 3D printing.
- Games and creative work.
- Community involvement.
- Pets and personal warmth.

Tone:
- Friendly.
- Confident.
- Not overly formal.
- Still polished.

Do not make the About page feel childish. It can be warm and personal while still looking premium.

## Resume and Contact

Resume page:
- Show a clean resume preview.
- Include a clear download button.
- Avoid fixed giant image sizing that breaks on mobile.
- Include a short summary above the resume.

Contact page:
- Email.
- GitHub.
- YouTube.
- Discord if appropriate.
- Short line inviting project, internship, admissions, or collaboration contact.

## Asset Guidance

Use project images as the primary visual material.

Important current asset considerations:
- Some images are large and should be optimized before implementation.
- Keep screenshots and project photos as complete images when they are content.
- Only create transparent cutouts for objects that need to float in the hero constellation.
- Pets and hobby photos should be lazy-loaded and lower on the site.

For generated design mockups, use placeholders that clearly map to real assets:
- `portrait: William photo`
- `project: Pine A64 photo`
- `project: Blossom screenshot`
- `project: AI Nerf Aimbot image`
- `project: SpaceGoose screenshot`
- `project: Lamp Pro photo`
- `project: NCASE M2 PC photo`
- `writing: book or essay cover`

## AI Design App Output Requirements

Generate:
- A complete responsive website design.
- Desktop and mobile layouts.
- Homepage.
- Projects hub.
- Project case-study template.
- Experience page.
- Writing page.
- About page.
- Resume/contact surfaces.
- Design system tokens.
- Component states.
- Motion notes.
- Accessibility notes.

If the design app can generate code:
- Use semantic HTML.
- Use CSS custom properties for color, spacing, and type.
- Keep JavaScript interactions progressive.
- Make the interactive hero optional and fault-tolerant.
- Include reduced-motion handling.
- Do not add unnecessary production dependencies.

If the design app only generates visuals:
- Produce high-fidelity desktop and mobile mockups.
- Include annotations for interactions.
- Include the design system and component inventory.
- Include a handoff note for developers.

## Negative Prompt

Do not create:
- A generic dark portfolio with neon gradients.
- A site where the first screen only says "welcome to my website."
- A site where hobbies, pets, or random personal content appear before projects.
- A design that hides all work behind category buttons.
- A fullscreen game interface as the main navigation.
- A design dominated by purple gradients, glass blobs, or decorative orbs.
- A cluttered page full of equal-weight cards.
- A layout with long centered paragraphs everywhere.
- A site that looks like a template rather than a custom builder portfolio.
- A design that depends on motion to understand the content.
- A design that invents achievements, roles, metrics, or project results.

## Acceptance Checklist

The design is successful if:
- A reviewer understands William's identity and strengths within 10 seconds.
- The strongest projects are visible without clicking filters.
- The site feels sleek, modern, minimal, and premium.
- The interactive hero is memorable but not distracting.
- The project case-study template makes William's process and skill clear.
- The navigation is simple and direct.
- The design works on mobile.
- The design has a reduced-motion fallback.
- The design can still work if 3D fails to load.
- The writing and personal sections support the portfolio instead of competing with the projects.
- The final impression is: William is a capable student builder with unusually strong initiative and taste.

## Final Instruction

Create the design as if it will become William's main public portfolio for admissions, internships, friends, and collaborators. Make it polished enough for professional reviewers, interactive enough to be memorable, and structured enough that the projects remain the star.

