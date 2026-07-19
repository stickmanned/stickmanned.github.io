# stickmanned.github.io, williamwen.xyz
## My Personal Website!!

This is my personal website, where I showcase all my work: projects, writing, events, and more! I recently remade the entire website, migrating from HTML/CSS to React/Next.js, which was a fun learning experience.

##	Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** CSS
- **Deployment:** GitHub Pages
- **Domain:** gen.xyz (williamwen.xyz)

## Motivation
I wanted to create a website that would be a portfolio for all my work: projects, writing, events, and everything else about me. I also wanted to learn a bit of Next.js and React along the way since they are powerful tools to make interactive and visually appealing websites. Previously, this website consisted of only static HTML/CSS elements, which was lacking in both the web design aspect as well as the overall experience. My goal for this (V2) version of my website was to make the experience as polished as possible with fun interactivity, smooth animations, and a design that is modern, classy, and organized.

## How it Works

This website is built on Next.js using the App Router. The UI is constructed with custom, reusable React components. All portfolio content, such as projects, writing, and experience, is structured and managed as raw data inside `lib/site-data.ts` to keep the UI components clean and data-driven. The final output is statically exported using Next.js's static export feature and then hosted on GitHub Pages.

### Design
![Green theme](/img/README/site%20green.png)

![Blue theme](/img/README/site%20blue.png)

![Monochrome theme](/img/README/site%20monochrome.png)

I spent most of the time on the design of the website.
When the user first lands on the homepage, they are greeted with a constellation of my projects, in rings orbiting a 3D model of my head. You can drag the head around to play with it, which adds a nice touch to my website.

Once you scroll down a bit, you will see my stats, like how many projects I've made and how many hackathons I've attended. 

If you scroll down even more, you will find what I like to call "mini pages", which are essentially previews of all the pages, such as previews of the project page, writing page, etc. Because most people won't click on any of the page buttons on the top header and would just scroll down, this ensures that they don't miss out on anything important, and let them know if they want to learn more about a specific part of me, I have an entire webpage about that.

![knowledge graph](/img/README/knowledgeGraph.png)

I am really proud of the knowledge graph I made, which are bubbles that bounce around a box while containing everything I know which are also clickable and brings to the appropriate pages. It was really hard trying to optimize the physics and the lines connecting them together so that everything looks like they are related to each other. 

![gallery](/img/README/Gallery.png)

Last but not least, I added an interactive 3D art gallery to show off my projects in a never seen before 3D view. The user can interact with each project and walk around, just like how a real gallery would.

## AI Use
AI was used as a tool in the process of building this website, not as the main focus. I used it to help me migrate from static HTML/CSS to React/Next.js, and implement the 3D gallery as it was tedious work for me to do all that by hand. It also helped me when I had errors and problems in my code since i'm just getting the hang of React and Next.js. Everything else was done by myself, including the design work, the code of the pages, and all the written content of the website.

### This project was submitted for the Hack Club Horizons 2026.





