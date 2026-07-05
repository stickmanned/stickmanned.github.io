export type ProjectCategory =
  "Featured" | "Hardware" | "Web Apps" | "Games" | "Experiments";

export type Project = {
  slug: string;
  title: string;
  year: string;
  dateISO: string;
  image: string;
  href: string;
  externalHref?: string;
  categories: ProjectCategory[];
  tags: string[];
  blurb: string;
};

export type CaseStudy = Project & {
  eyebrow: string;
  summary: string;
  links: { label: string; href: string }[];
  sections: { title: string; body: string[]; bullets?: string[] }[];
  gallery: { src: string; alt: string; caption: string }[];
};

export const socials = [
  { label: "GitHub", href: "https://github.com/stickmanned" },
  { label: "YouTube / FHC Tech", href: "https://www.youtube.com/@fhctech" },
  {
    label: "Discord",
    href: "https://discordapp.com/users/911011264120119336/",
  },
];

export const featuredProjects: Project[] = [
  {
    slug: "pine-a64-gaming-pc",
    title: "Pine A64 Gaming PC",
    year: "2026",
    dateISO: "2026-07-02",
    image: "/design-assets/pinea64.jpeg",
    href: "/projects/pine-a64-gaming-pc/",
    externalHref: "https://github.com/stickmanned/Pine-A64-Gaming-PC",
    categories: ["Featured", "Hardware"],
    tags: ["Hardware", "CAD / OpenSCAD", "Linux", "3D Print"],
    blurb:
      "A Pine A64 single-board computer converted into a custom-cooled, 3D-printed cloud gaming PC that streams games over Moonlight.",
  },
  {
    slug: "blossom",
    title: "Blossom",
    year: "2026",
    dateISO: "2026-04-02",
    image: "/design-assets/blossom.png",
    href: "/projects/blossom/",
    externalHref: "https://github.com/stickmanned/Blossom",
    categories: ["Featured", "Web Apps"],
    tags: ["Chrome Extension", "JavaScript", "UI"],
    blurb:
      "A gamified Chrome extension that grows a virtual garden while you focus, with a timer, distraction blocking, and a coin-based garden shop.",
  },
  {
    slug: "ai-nerf-aimbot",
    title: "AI Nerf Gun Aimbot",
    year: "2025",
    dateISO: "2025-03-15",
    image: "/design-assets/nerf.png",
    href: "/projects/ai-nerf-aimbot/",
    externalHref: "https://github.com/stickmanned/AI-Nerf-gun-Aimbot",
    categories: ["Featured", "Hardware", "Experiments"],
    tags: ["Computer Vision", "Python", "Arduino"],
    blurb:
      "An automatic Nerf blaster aimbot using camera detection, tracking, motion prediction, and pan/tilt servo control.",
  },
  {
    slug: "spacegoose",
    title: "SpaceGoose",
    year: "2025",
    dateISO: "2025-04-05",
    image: "/design-assets/spacegoose.png",
    href: "/projects/spacegoose/",
    externalHref: "https://fraserhackclub.itch.io/spacegoose",
    categories: ["Featured", "Games"],
    tags: ["Game", "Game Jam"],
    blurb:
      "A game-jam project about a goose retrieving the all-mighty Golden Egg from D00M Duck through intergalactic obstacles.",
  },
  {
    slug: "lamp-pro",
    title: "Lamp Pro",
    year: "2025",
    dateISO: "2025-10-16",
    image: "/design-assets/lamppro.png",
    href: "/projects/lamp-pro/",
    categories: ["Featured", "Hardware", "Experiments"],
    tags: ["CAD", "AutoCAD", "Fusion 360"],
    blurb:
      "An AutoCAD lamp design combining the Mac Pro perforation pattern with a Noctua fan-grille-inspired top and bottom.",
  },
  {
    slug: "ncase-m2",
    title: "NCASE M2 SFF Build",
    year: "2025",
    dateISO: "2025-08-24",
    image: "/design-assets/ncase.jpg",
    href: "/projects/ncase-m2/",
    categories: ["Featured", "Hardware"],
    tags: ["Hardware", "PC Build", "SFF"],
    blurb:
      "A compact daily-driver PC build in the NCASE M2 balancing high-end parts, thermals, acoustics, and cable management.",
  },
];

export const extraProjects: Project[] = [
  {
    slug: "amp-cover",
    title: "AMP Cover for IRGG Amplifier",
    year: "2025",
    dateISO: "2025-08-22",
    image: "/img/projects/amp.jpg",
    href: "#",
    categories: ["Hardware", "Experiments"],
    tags: ["3D Print"],
    blurb:
      "A custom 3D-printed cover for the IRGG amplifier to reduce screen glare from the exposed display.",
  },
  {
    slug: "pet-simulator",
    title: "Pet Simulator X/99",
    year: "2021",
    dateISO: "2021-11-17",
    image: "/img/projects/petsim.png",
    href: "https://scratch.mit.edu/projects/585019016/",
    externalHref: "https://scratch.mit.edu/projects/585019016/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "A Scratch version of the popular Pet Simulator franchise, built without lootboxes.",
  },
  {
    slug: "chaotic-war-simulator",
    title: "Chaotic War Simulator",
    year: "2023",
    dateISO: "2023-04-25",
    image: "/img/projects/war.png",
    href: "https://www.roblox.com/games/13252286370/NEW-Chaotic-War-Simulator",
    externalHref:
      "https://www.roblox.com/games/13252286370/NEW-Chaotic-War-Simulator",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb: "A Roblox fighting game with players, tanks, and many weapons.",
  },
  {
    slug: "beyblade-masters-2",
    title: "Beyblade Masters 2",
    year: "2023",
    dateISO: "2023-10-01",
    image: "/img/projects/bey2.png",
    href: "https://scratch.mit.edu/projects/898648380/",
    externalHref: "https://scratch.mit.edu/projects/898648380/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A sequel to Beyblade Masters with better graphics and gameplay.",
  },
  {
    slug: "simple-rng-template",
    title: "Simple RNG Template",
    year: "2024",
    dateISO: "2024-09-15",
    image: "/img/projects/rng.png",
    href: "https://scratch.mit.edu/projects/1032120179/",
    externalHref: "https://scratch.mit.edu/projects/1032120179/",
    categories: ["Games", "Experiments"],
    tags: ["Scratch"],
    blurb: "A simple Scratch RNG template inspired by Sol's RNG.",
  },
  {
    slug: "ultimate-easy-obby",
    title: "Ultimate Easy Obby",
    year: "2023",
    dateISO: "2023-04-22",
    image: "/img/projects/obby.png",
    href: "https://www.roblox.com/games/13222151199/Ultimate-Easy-Obby",
    externalHref: "https://www.roblox.com/games/13222151199/Ultimate-Easy-Obby",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb: "A simple, colorful, fun, and easy Roblox obby.",
  },
  {
    slug: "car-racing-extreme",
    title: "Car Racing EXTREME",
    year: "2020",
    dateISO: "2020-05-15",
    image: "/img/projects/car.png",
    href: "https://www.roblox.com/games/5035555315/Car-Racing-EXTREME",
    externalHref: "https://www.roblox.com/games/5035555315/Car-Racing-EXTREME",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb:
      "A Roblox racing game where players choose cars and explore the map.",
  },
  {
    slug: "ninja-legends",
    title: "Ninja Legends (Scratch)",
    year: "2019",
    dateISO: "2019-10-10",
    image: "/img/projects/ninja.png",
    href: "https://scratch.mit.edu/projects/379935320/",
    externalHref: "https://scratch.mit.edu/projects/379935320/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "One of my first completed games on Scratch! A scrolling game inspired by Flappy Bird and Ninja Legends on Roblox.",
  },
  {
    slug: "epic-tonk-battles",
    title: "Epic TONK Battles (Scratch)",
    year: "2020",
    dateISO: "2020-02-01",
    image: "/img/projects/tonk.png",
    href: "https://scratch.mit.edu/projects/382982145/",
    externalHref: "https://scratch.mit.edu/projects/382982145/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "You are a 'TONK' trying to defeat the Battle Cats Base. Inspired by Battle Cats.",
  },
  {
    slug: "shopping-simulator",
    title: "Shopping Simulator (Scratch)",
    year: "2021",
    dateISO: "2020-03-01",
    image: "/img/projects/shopping.png",
    href: "https://scratch.mit.edu/projects/383212412/",
    externalHref: "https://scratch.mit.edu/projects/383212412/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A simulation game about clicking to earn money and buy items.",
  },
  {
    slug: "egg-hatching-template",
    title: "Egg Hatching Template (Scratch)",
    year: "2021",
    dateISO: "2021-04-07",
    image: "/img/projects/egg.png",
    href: "https://scratch.mit.edu/projects/512618597/",
    externalHref: "https://scratch.mit.edu/projects/512618597/",
    categories: ["Games", "Experiments"],
    tags: ["Scratch"],
    blurb: "A Scratch game template for egg hatching mechanics.",
  },
  {
    slug: "scratch-manhunt-2",
    title: "Scratch Manhunt 2 (Scratch)",
    year: "2021",
    dateISO: "2021-08-16",
    image: "/img/projects/man.png",
    href: "https://scratch.mit.edu/projects/561123051/",
    externalHref: "https://scratch.mit.edu/projects/561123051/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "A manhunt where you are the black cat who is trying to escape from the white cats.",
  },
  {
    slug: "beyblade-masters",
    title: "Beyblade Masters! (Scratch)",
    year: "2021",
    dateISO: "2021-08-25",
    image: "/img/projects/bey1.png",
    href: "https://scratch.mit.edu/projects/558891308/",
    externalHref: "https://scratch.mit.edu/projects/558891308/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A fast paced game about beyblade battles!",
  },
  {
    slug: "pet-simulator-classic",
    title: "Pet Simulator X/99 CLASSIC (Scratch)",
    year: "2022",
    dateISO: "2022-01-10",
    image: "/img/projects/classicps.png",
    href: "https://scratch.mit.edu/projects/608004574/",
    externalHref: "https://scratch.mit.edu/projects/608004574/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "Classic and barebones version of Pet Simulator on Scratch.",
  },
  {
    slug: "save-the-floppa",
    title: "Save the Floppa (Roblox)",
    year: "2022",
    dateISO: "2022-06-13",
    image: "/img/projects/floppa.png",
    href: "https://www.roblox.com/games/9904577356/Save-The-Floppa",
    externalHref: "https://www.roblox.com/games/9904577356/Save-The-Floppa",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb: "A bad guy has your floppa! Complete the obby to save him!",
  },
  {
    slug: "bigwars",
    title: "BigWars! (Roblox)",
    year: "2022",
    dateISO: "2022-06-29",
    image: "/img/projects/bed.png",
    href: "https://www.roblox.com/games/10069456821/HUGE-UPDATE-BigWars",
    externalHref:
      "https://www.roblox.com/games/10069456821/HUGE-UPDATE-BigWars",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb: "A normal fighting game but everything is HUGE...",
  },
  {
    slug: "just-drive",
    title: "Just Drive! (Scratch)",
    year: "2021",
    dateISO: "2021-09-01",
    image: "/img/projects/drive.png",
    href: "https://scratch.mit.edu/projects/565507379/",
    externalHref: "https://scratch.mit.edu/projects/565507379/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "A 2D driving game where you collect coins when driving. Made during a scratch online class.",
  },
  {
    slug: "ontheground-war",
    title: "Ontheground War! (Roblox)",
    year: "2023",
    dateISO: "2023-05-01",
    image: "/img/projects/ontheground.png",
    href: "https://www.roblox.com/games/13321917161/RELEASE-Ontheground-War",
    externalHref:
      "https://www.roblox.com/games/13321917161/RELEASE-Ontheground-War",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb:
      "A spin-off of popular Roblox game 'The Underground War', but ON THE GROUND!",
  },
  {
    slug: "climb-stairs",
    title: "Climb Stairs and Reach new Heights (Roblox)",
    year: "2023",
    dateISO: "2023-02-04",
    image: "/img/projects/stair.png",
    href: "https://www.roblox.com/games/12380151331/RAINBOW-Climb-Stairs-and-Reach-new-Heights",
    externalHref:
      "https://www.roblox.com/games/12380151331/RAINBOW-Climb-Stairs-and-Reach-new-Heights",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb:
      "A F2P game which has tons of unique stuff combined together and stairs, of course.",
  },
  {
    slug: "pet-square-root",
    title: "Pet Square Root Simulator",
    year: "2023",
    dateISO: "2023-05-09",
    image: "/img/projects/pet.png",
    href: "https://scratch.mit.edu/projects/673941645/",
    externalHref: "https://scratch.mit.edu/projects/673941645/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A fun take on Pet Simulator and Pet Multiplication.",
  },
  {
    slug: "superhero-story",
    title: "Superhero Story (Scratch School Project)",
    year: "2023",
    dateISO: "2023-11-05",
    image: "/img/projects/superhero.png",
    href: "https://scratch.mit.edu/projects/789620634/",
    externalHref: "https://scratch.mit.edu/projects/789620634/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A Scratch Story about saving AMOGUS from Cyborg Cat.",
  },
  {
    slug: "pet-simulator-hardcore",
    title: "Pet Simulator X/99 Hardcore! (Scratch)",
    year: "2023",
    dateISO: "2023-02-23",
    image: "/img/projects/pshc.png",
    href: "https://scratch.mit.edu/projects/808938210/",
    externalHref: "https://scratch.mit.edu/projects/808938210/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb:
      "My biggest Scratch game - A Scratch version of the popular Pet Simulator franchise, but without lootboxes. [HARDCORE EDITION]",
  },
  {
    slug: "escape-the-skibi",
    title: "Escape The Skibi The Toilet Obby! (Roblox)",
    year: "2023",
    dateISO: "2023-06-17",
    image: "/img/projects/skibi.png",
    href: "https://www.roblox.com/games/13783874206/Escape-The-Skibi-The-Toilet-Obby",
    externalHref:
      "https://www.roblox.com/games/13783874206/Escape-The-Skibi-The-Toilet-Obby",
    categories: ["Games"],
    tags: ["Roblox"],
    blurb:
      "OH NO! You watched too many YoTub shorts on Skibi Toilet!!! Now your thoughts are real!",
  },
];

export const allProjects = [...featuredProjects, ...extraProjects];

export const caseStudies: CaseStudy[] = [
  {
    ...featuredProjects[0],
    eyebrow: "Hardware flagship",
    summary:
      "Converting a low-power ARM64 Pine A64 board into a custom-cooled cloud and retro gaming PC.",
    links: [
      {
        label: "Project repo",
        href: "https://github.com/stickmanned/Pine-A64-Gaming-PC",
      },
      {
        label: "Demo video",
        href: "https://photos.app.goo.gl/yZgWkz5E3pNsgPrR7",
      },
      {
        label: "Bill of materials",
        href: "https://github.com/stickmanned/Pine-A64-Gaming-PC/blob/main/Pine%20A64%20PC%20Bill%20of%20Materials.csv",
      },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "The Pine A64 is a cheap 2GB ARM64 board with almost no game-rendering capability, but it can become a useful gaming client if the heavy rendering is offloaded to a host PC.",
          "The build had to keep the board cool, make hardware-accelerated video decode work under Linux, and package everything into an enclosure that felt like a real product.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A DietPi-based Moonlight streaming client with active Noctua cooling, a 12V fan rail boosted from the 5V supply, a momentary power switch on the EXP header, and a custom 3D-printed enclosure.",
          "The board streams games from a host gaming PC while the Pine A64 handles video decode and input.",
        ],
      },
      {
        title: "My Role",
        body: [
          "William handled the physical assembly, wiring, CAD modeling, custom OpenSCAD keycap work, software bring-up, DRM/KMS debugging, and documentation.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "Pine A64 2GB Rev B running DietPi",
          "Moonlight / moonlight-qt",
          "Noctua NF-A6x25 FLX fan and MT3608 boost converter",
          "Fusion 360, OpenSCAD, KeyV2, PLA 3D printing",
        ],
      },
      {
        title: "Build Process",
        body: [
          "The project moved through teardown, cooling, OS setup, video decode debugging, CAD enclosure design, final wiring, and the custom keycap.",
          "A key software fix was forcing HDMI to 1080p before Linux started with video=HDMI-A-1:1920x1080@60, then running Moonlight directly on DRM/KMS instead of through a desktop.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The Allwinner A64 graphics stack exhausted contiguous memory during display initialization until the HDMI mode and desktop stack were simplified.",
          "Physical issues included USB hot-plug brownouts, a fan-mount pillar blocking the fan, and tight cable management inside the shell.",
        ],
      },
      {
        title: "Result",
        body: [
          "A working low-power cloud gaming client that boots into Moonlight, stays actively cooled, and has reproducible CAD, firmware config, wiring schematic, BOM, and devlog artifacts.",
        ],
      },
    ],
    gallery: [
      {
        src: "https://raw.githubusercontent.com/stickmanned/Pine-A64-Gaming-PC/main/Photos/cad_final_render_fan_angle.png",
        alt: "Fusion 360 render of the finished enclosure",
        caption: "Fusion 360 enclosure render",
      },
      {
        src: "https://raw.githubusercontent.com/stickmanned/Pine-A64-Gaming-PC/main/Photos/final_assembly_fan_and_board.jpeg",
        alt: "Fan mounted inside the printed enclosure next to the Pine A64 board",
        caption: "Fan and board assembly",
      },
      {
        src: "https://raw.githubusercontent.com/stickmanned/Pine-A64-Gaming-PC/main/Photos/moonlight_streaming_verified.jpeg",
        alt: "Moonlight streaming session running on the connected display",
        caption: "Moonlight streaming verified",
      },
    ],
  },
  {
    ...featuredProjects[1],
    eyebrow: "Chrome extension",
    summary:
      "A local-first productivity extension that turns focus sessions into a growing virtual garden.",
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/blossom/nenigencnjokhofbmogblicfieakgplj",
      },
      { label: "GitHub", href: "https://github.com/stickmanned/Blossom" },
      { label: "Privacy policy", href: "/projects/blossom/privacy-policy/" },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "Blossom started from the idea that staying on task could feel more like a game and less like being nagged by a timer.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A Manifest V3 Chrome extension with a focus timer, distraction blocking, local garden state, coins, shop purchases, and multiple tree species with visual growth stages.",
        ],
      },
      {
        title: "My Role",
        body: [
          "William designed and built Blossom with Paya Maroufi during Equinox Vancouver, then cleaned it up, drew additional tree species and growth stages, and published it to the Chrome Web Store.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "Manifest V3 Chrome extension",
          "Vanilla JavaScript, HTML, CSS",
          "Webpack via Chrome Extension CLI",
          "chrome.storage.local for local-first data",
        ],
      },
      {
        title: "Build Process",
        body: [
          "The extension uses a popup UI for timer, plot, and shop interactions; a background service worker for session state and coins; and content scripts for the focus overlay on blocked domains.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The product needed to block distractions while preserving user trust, so focus duration, coins, garden layout, and blocklists stay local in the browser.",
        ],
      },
      {
        title: "Result",
        body: [
          "Blossom placed second at the Equinox Vancouver Hackathon, shipped publicly on the Chrome Web Store, and is open source under the MIT license.",
        ],
      },
    ],
    gallery: [
      {
        src: "/design-assets/blossom.png",
        alt: "Blossom project visual",
        caption: "Garden focus product visual",
      },
    ],
  },
  {
    ...featuredProjects[2],
    eyebrow: "Computer vision hardware",
    summary:
      "A Scrapyard 2025 prototype for autonomous target detection, tracking, and Nerf blaster aiming.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/stickmanned/AI-Nerf-gun-Aimbot/",
      },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "The project goal was an autonomous Nerf blaster that detects targets, predicts motion, and actuates aim.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A camera-feed-to-control-loop system: detection, tracking, motion prediction, and servo-driven pan/tilt actuation.",
        ],
      },
      {
        title: "My Role",
        body: [
          "William worked on the hardware platform, Python and Arduino C++ control code, and the documented face-tracking API/code path.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "Arduino UNO microcontroller",
          "Tower Pro servos",
          "12V battery source",
          "Python and Arduino C++",
        ],
      },
      {
        title: "Build Process",
        body: [
          "The documented control flow initializes servo positions, receives target coordinates over serial, constrains each axis, steps the servos toward the target, and fires.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "Future improvements listed in the original writeup include a custom 3D-printed shroud, on-device quantized model, ballistic curve calibration, and a live-feed web dashboard.",
        ],
      },
      {
        title: "Result",
        body: [
          "A Scrapyard Vancouver 2025 submission demonstrating a complete hardware/software loop for vision-guided aiming.",
        ],
      },
    ],
    gallery: [
      {
        src: "/img/projects/nerf.png",
        alt: "AI Nerf Gun Aimbot prototype",
        caption: "Prototype image from the project archive",
      },
    ],
  },
  {
    ...featuredProjects[3],
    eyebrow: "Game jam",
    summary:
      "A Hack Club Juice 2025 game-jam entry about a goose, the Golden Egg, and intergalactic obstacles.",
    links: [
      {
        label: "Play on itch.io",
        href: "https://fraserhackclub.itch.io/spacegoose",
      },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "SpaceGoose was made for Juice 2025, a Hack Club game jam in Shanghai.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A game where you play a goose trying to retrieve the all-mighty Golden Egg from the D00M Duck and return it to the Golden Goose while facing intergalactic obstacles.",
        ],
      },
      {
        title: "My Role",
        body: [
          "The old site lists SpaceGoose as William's game-jam project; the public itch.io page is the source link for the playable build.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: ["Game jam build", "itch.io release"],
      },
      {
        title: "Build Process",
        body: [
          "This is intentionally a lighter case study because the old repo has no dedicated SpaceGoose writeup.",
        ],
      },
      {
        title: "Result",
        body: [
          "A shipped game-jam entry and a concrete example of William's game development work.",
        ],
      },
    ],
    gallery: [
      {
        src: "/img/projects/spacegoose.png",
        alt: "SpaceGoose screenshot",
        caption: "SpaceGoose project image",
      },
    ],
  },
  {
    ...featuredProjects[4],
    eyebrow: "CAD study",
    summary:
      "An AutoCAD lamp design using a Mac Pro-inspired side pattern and a Noctua fan-grille-inspired top and bottom.",
    links: [
      {
        label: "Mac Pro hole reference",
        href: "https://saccade.com/blog/2019/06/how-to-make-apples-mac-pro-holes/",
      },
      {
        label: "Noctua grille model",
        href: "https://www.printables.com/model/1096961-high-efficiency-noctua-120mm-fan-grill",
      },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "The assignment needed at least two distinct lamp designs, so William chose the Mac Pro perforation pattern for the sides and a Noctua fan grille motif for the top and bottom.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A complete lamp panel design in AutoCAD, with top, bottom, and side pieces based on imported, simplified, traced, and exported geometry.",
        ],
      },
      {
        title: "My Role",
        body: [
          "William imported STL references into Fusion 360, reduced meshes, created mesh-section sketches, exported DXF geometry, scaled and centered it in AutoCAD, then constructed the Mac Pro-inspired hole pattern.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "Fusion 360",
          "AutoCAD",
          "DXF workflow",
          "2D geometric construction",
        ],
      },
      {
        title: "Build Process",
        body: [
          "For the top and bottom, William converted a Noctua grille model into 2D sketch geometry. For the sides, he adapted J. Peterson's Mac Pro hole math into a 2D approximation.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The Mac Pro holes are 3D, so the 2D version uses ellipses and construction geometry to approximate how the inner holes appear from the front.",
        ],
      },
      {
        title: "Result",
        body: [
          "A completed CAD lamp design with documented math, reference links, and panel-by-panel process imagery.",
        ],
      },
    ],
    gallery: [
      {
        src: "/img/projects/LampPro/4.png",
        alt: "Centered fan grille pattern in the lamp template",
        caption: "Noctua-inspired top/bottom pattern",
      },
      {
        src: "/img/projects/LampPro/13.png",
        alt: "Completed side panel Mac Pro-style pattern",
        caption: "Side panel pattern",
      },
      {
        src: "/img/projects/LampPro/14.png",
        alt: "Final Lamp Pro design with all panels",
        caption: "Final panel layout",
      },
    ],
  },
  {
    ...featuredProjects[5],
    eyebrow: "Small form factor PC",
    summary:
      "A compact high-performance daily-driver PC build inside the 12.6-litre NCASE M2.",
    links: [
      {
        label: "PCPartPicker list",
        href: "https://pcpartpicker.com/list/CQcvcx",
      },
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "The build set out to fit a high-performance CPU and GPU combination into a compact chassis while keeping thermals, overclocking, acoustics, and cable management acceptable.",
        ],
      },
      {
        title: "What I Built",
        body: [
          "A small-form-factor daily-driver PC in the NCASE M2 using an AMD Ryzen 9 9950X3D, Gigabyte Gaming OC RTX 5070 Ti, Asus ROG Strix B850-I, 64GB DDR5-6000 CL30 memory, and a Corsair SF850.",
        ],
      },
      {
        title: "My Role",
        body: [
          "William selected the parts, assembled the system, documented component tradeoffs, tuned overclocking, and recorded future airflow and cable-management improvements.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "AMD Ryzen 9 9950X3D",
          "Gigabyte Gaming OC GeForce RTX 5070 Ti",
          "NCASE M2",
          "Corsair iCUE LINK TITAN 280 RX",
          "Corsair SF850 SFX PSU",
        ],
      },
      {
        title: "Build Process",
        body: [
          "The original writeup emphasizes reading the case manual and build videos before assembly, because the compact case makes cable management and fan clearance especially important.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "Cables can block AIO fans or airflow in the NCASE M2, and vertical GPU mounting requires a separate PCIe riser cable.",
        ],
      },
      {
        title: "Result",
        body: [
          "The documented performance notes report Roblox running smoothly at 4K 240 FPS and BeamNG.drive averaging 100 FPS at 4K Ultra settings.",
        ],
      },
    ],
    gallery: [
      {
        src: "/img/pc2.jpg",
        alt: "NCASE M2 PC interior during build",
        caption: "Interior build view",
      },
      {
        src: "/img/pc1.jpg",
        alt: "Daily driver PC exterior",
        caption: "Exterior setup",
      },
    ],
  },
];

export const projectBySlug = new Map(
  caseStudies.map((project) => [project.slug, project]),
);

export type WritingEntry = {
  title: string;
  category: "Books" | "Essays" | "Short Stories" | "Other";
  date: string;
  dateISO: string;
  image: string;
  href: string;
  desc: string;
};

export const writingEntries: WritingEntry[] = [
  {
    title: "Penciled",
    category: "Books",
    date: "February 2, 2023",
    dateISO: "2023-02-02",
    image: "/img/writing/penciled.png",
    href: "https://www.amazon.ca/Penciled-William-Wen/dp/B0BTRRB4NT",
    desc: "A young man named Jeff and an old man fight to the death because of pencils.",
  },
  {
    title: "Skibidi Toilet and Me",
    category: "Books",
    date: "August 2024",
    dateISO: "2024-08-01",
    image: "/img/writing/skibidi.png",
    href: "/files/writing/Skibidi%20Toilet%20and%20Me.pdf",
    desc: "Little John's first time going to the toilet takes a strange turn.",
  },
  {
    title: "Small Steps for a Climate Crisis",
    category: "Essays",
    date: "2024",
    dateISO: "2024-05-12",
    image: "/img/writing/crisis.png",
    href: "https://docs.google.com/document/d/1kXjQNyiscQn2zaWMtxfgl-uwdmnqZ8j-wsJJY0dZCqQ/edit?usp=sharing",
    desc: "A Queen's Commonwealth Essay Competition 2024 Gold-winning essay about climate action.",
  },
  {
    title: "Effects of Taking Notes",
    category: "Essays",
    date: "2024",
    dateISO: "2024-01-01",
    image: "/img/writing/notes.png",
    href: "https://docs.google.com/document/d/133Gx530xCur-tqxwMq65CfT_cdxnfIQPvUEPgTGnytQ/edit?usp=sharing",
    desc: "Benefits and techniques of note-taking.",
  },
  {
    title: "The Hidden Library",
    category: "Short Stories",
    date: "April 2022",
    dateISO: "2022-04-28",
    image: "/img/writing/library.png",
    href: "https://docs.google.com/document/d/1Vg4WUR2eI49q6RSFtwnJ27lmEdM4v1OAHE1H1WW-8hU/edit?usp=sharing",
    desc: "Jeff discovers a secret library hidden in Port Coquitlam.",
  },
  {
    title: "Life Could be a Dream",
    category: "Short Stories",
    date: "December 2023",
    dateISO: "2023-12-03",
    image: "/img/writing/dream.png",
    href: "https://docs.google.com/document/d/17dOIWRotI5EKF77DqKtdoxq7Op_2cllZFmjrC1ceMIk/edit?usp=sharing",
    desc: "A surreal dream sequence spanning multiple bizarre worlds.",
  },
  {
    title: "Terry Fox Marathon of Hope",
    category: "Other",
    date: "October 2023",
    dateISO: "2023-10-11",
    image: "/img/writing/terry.png",
    href: "https://docs.google.com/document/d/1_u3tNfh71rrF9q_yqp74NRPda8s0MoMKP-YbHv3xseM/edit?usp=sharing",
    desc: "A reflection on the impact of Terry Fox and his legacy.",
  },
  {
    title: "Sharpened",
    category: "Books",
    date: "Releasing 2026",
    dateISO: "2026-12-31",
    image: "/img/writing/sharpened-preview.png",
    href: "#",
    desc: "John discovers that the infamous 'Old Man' is his dad, and he's up to no good again.",
  },
  {
    title: "Robot or Pet",
    category: "Essays",
    date: "2021",
    dateISO: "2021-01-01",
    image: "/img/writing/RobotOrPet.png",
    href: "https://docs.google.com/document/d/1qmLBrQGOliGVrQhjREj_h7ib8N8W971hQ-XSGcq2TSY/edit?usp=sharing",
    desc: "Would you prefer a robot or a pet?",
  },
  {
    title: "How to Win a Machine War",
    category: "Essays",
    date: "2021",
    dateISO: "2021-02-01",
    image: "/img/writing/MachineWar.png",
    href: "https://docs.google.com/document/d/1IbFCpA5Z_EapKIu-6FtjLQOTsPazfwwokKnuBDPPaTg/edit?usp=sharing",
    desc: "Fast-paced guide: strategies, weapons, defenses, programming tactics.",
  },
  {
    title: "Is it Okay to Lie?",
    category: "Essays",
    date: "2021",
    dateISO: "2021-03-01",
    image: "/img/writing/oktolie.png",
    href: "https://docs.google.com/document/d/1dYbIF7R_OrczupnDycO5JvvUmW42PunIz5b-NtZyW1c/edit?usp=sharing",
    desc: "Is it okay to lie? Is lying good? Is lying bad?",
  },
  {
    title: "Homework or Video Games?",
    category: "Essays",
    date: "2022",
    dateISO: "2022-01-05",
    image: "/img/writing/homeworkorgames.png",
    href: "https://docs.google.com/document/d/1rxHmTZHcjXJBjcG0S16C1nAXT45stf9QE2IORg5yoSM/edit?usp=sharing",
    desc: "Should you play video games or do homework?",
  },
  {
    title: "Comparing studying online with going to study at school",
    category: "Essays",
    date: "2022",
    dateISO: "2022-02-01",
    image: "/img/writing/studyonlineoratschool.png",
    href: "https://docs.google.com/document/d/1EfWTIWS07nuw1z1l95KM0w_du6T3bwBfK2fF9ov0B9A/edit?usp=sharing",
    desc: "Should you study online or at school?",
  },
  {
    title: "Benefits of Healthy Eating",
    category: "Essays",
    date: "2022",
    dateISO: "2022-03-01",
    image: "/img/writing/healthyeating.png",
    href: "https://docs.google.com/document/d/12TNl3uMhbY0dmiGk38JT2xSm3MyuzoGeW0bixqIu0WY/edit?usp=sharing",
    desc: "What should you eat to stay healthy? Benefits explained.",
  },
  {
    title: "Why I Hate School Uniforms",
    category: "Essays",
    date: "2022",
    dateISO: "2022-04-01",
    image: "/img/writing/schooluniforms.png",
    href: "https://docs.google.com/document/d/1B8_fqtBB6syTfwRa7onj1b2DC2OD5KXrqmdZbahBRJc/edit?usp=sharing",
    desc: "Reasons why I dislike school uniforms.",
  },
  {
    title: "Should you get your driver's license at or after 16 years old?",
    category: "Essays",
    date: "2022",
    dateISO: "2022-05-01",
    image: "/img/writing/driverslicense.png",
    href: "https://docs.google.com/document/d/1Vtma3LEy_y-qq45k7uxVAibg2ioBEaOpEtTiAmvGl2I/edit?usp=sharing",
    desc: "Why I think you should get it after 16.",
  },
  {
    title: "Banff National Park",
    category: "Essays",
    date: "2022",
    dateISO: "2022-06-01",
    image: "/img/writing/Banff.png",
    href: "https://docs.google.com/document/d/1ZfUnCeZV22DZqt4eYDUkLccXvwUeyzIOhA9DYORQ4oU/edit?usp=sharing",
    desc: "Places to visit in Banff National Park.",
  },
  {
    title: "Summer Heat or Winter Cold?",
    category: "Essays",
    date: "2022",
    dateISO: "2022-07-01",
    image: "/img/writing/hotorcold.png",
    href: "https://docs.google.com/document/d/10_87bPSMTCMfjUi7e5TZI7XXYsFi9Hxzm8HNNh5ySTI/edit?usp=sharing",
    desc: "Why I prefer winter temperatures.",
  },
  {
    title: "Why Limiting TV Time Helps Kids Stay Healthy and Focused",
    category: "Essays",
    date: "2022",
    dateISO: "2022-08-01",
    image: "/img/writing/tvlimits.png",
    href: "https://docs.google.com/document/d/1ykI2bkTIHwU0-VVBzfkrwT3EcZrlJTrswHoXEF8GFRI/edit?usp=sharing",
    desc: "Why I think there should be limits on TV time.",
  },
  {
    title: "Orlando Destinations",
    category: "Essays",
    date: "2023",
    dateISO: "2023-01-01",
    image: "/img/writing/orlando.png",
    href: "https://docs.google.com/document/d/1LWFU0mNGcyg29CY84GZ6rSqLTjKQoGWsgM8H54eZS3g/edit?usp=sharing",
    desc: "Attractions and culture of Orlando, Florida.",
  },
  {
    title: "Comparing Charlottetown and Coquitlam",
    category: "Essays",
    date: "2023",
    dateISO: "2023-02-01",
    image: "/img/writing/cc.png",
    href: "https://docs.google.com/document/d/1NWD2rPLPoiUccm0LLLPEMjOD4BXjt38fPVlz5lk7Eeo/edit?usp=sharing",
    desc: "Comparison of two Canadian cities.",
  },
  {
    title: "Why Smartphones Are the Best Invention of Our Time",
    category: "Essays",
    date: "2023",
    dateISO: "2023-03-01",
    image: "/img/writing/smartphones.png",
    href: "https://docs.google.com/document/d/13468pTSWeQlU2VsZ5nMdn2E1rL7hY00f7YplIlUnMpI/edit?usp=sharing",
    desc: "Arguing smartphones are the best invention.",
  },
  {
    title: "How to Sell Stuff for a Profit",
    category: "Essays",
    date: "2023",
    dateISO: "2023-04-01",
    image: "/img/writing/selling.png",
    href: "https://docs.google.com/document/d/1elK6vyUkF7q_RvDrgXifpD2n65j7dusZlwly-JCAuck/edit?usp=sharing",
    desc: "Tips and strategies for selling at a profit.",
  },
  {
    title: "Amazon VS eBay",
    category: "Essays",
    date: "2023",
    dateISO: "2023-05-01",
    image: "/img/writing/amazon_vs_ebay.png",
    href: "https://docs.google.com/document/d/1omOXJ0S7QTP2UoPYWtkinHFym4tST4LP7QYzbeCJQsw/edit?usp=sharing",
    desc: "Platform comparison for selling/buying.",
  },
  {
    title: "Why You Should Disagree with Your Parents",
    category: "Essays",
    date: "2024",
    dateISO: "2024-02-01",
    image: "/img/writing/parent.png",
    href: "https://docs.google.com/document/d/1JXCYJL_vJ5dl8R4_9WjVZYx3Qf9oFUA0tlJOw7y6sOo/edit?usp=sharing",
    desc: "Importance of independent thinking.",
  },
  {
    title: "Défis Virtels (résumé)",
    category: "Other",
    date: "September 2024",
    dateISO: "2024-09-24",
    image: "/img/writing/defis.png",
    href: "https://docs.google.com/document/d/1LhU0OHRdJamEYxheQblcrt3jBr310Bvm1aOIh27S3WA/edit?usp=sharing",
    desc: "Un résumé de livre français Défis Virtuels",
  },
  {
    title: "7 Sacred Teachings - Wisdom",
    category: "Other",
    date: "June 2024",
    dateISO: "2024-06-18",
    image: "/img/writing/7.png",
    href: "https://docs.google.com/document/d/1l7KE96N9rypEU4dJZvAPA8ir8o3psyELJT1LHoV11z8/edit?usp=sharing",
    desc: "Why I chose wisdom for the 7 sacred teachings",
  },
  {
    title: "Lorax réponse (FR)",
    category: "Other",
    date: "October 2024",
    dateISO: "2024-10-28",
    image: "/img/writing/lorax.png",
    href: "https://docs.google.com/document/d/1eDEBmzAyvycNJM5827dQ3abUypLQ45qCCRE4fowWIw8/edit?usp=sharing",
    desc: "La réponse du question Lorax",
  },
];

export type ExperienceItem = {
  title: string;
  date: string;
  dateISO: string;
  kind: "Hackathon" | "Leadership" | "Award" | "Trip" | "Talk" | "Tech";
  image: string;
  desc: string;
  href?: string;
};

export const experienceItems: ExperienceItem[] = [
  {
    title: "Project Stellar Hackathon",
    date: "June 2026",
    dateISO: "2026-06-07",
    kind: "Hackathon",
    image: "/img/event/Project%20Stellar.JPG",
    desc: 'A hackathon about "shooting for the stars"; William built Alien Dating Simulator.',
  },
  {
    title: "Dr. Charles Best Secondary School Honours With Distinction",
    date: "2026",
    dateISO: "2026-06-01",
    kind: "Award",
    image: "/img/award/honours%20with%20distinctions.JPG",
    desc: "Received after getting A (86%+) in 8+ courses at school.",
  },
  {
    title: "Equinox Vancouver Hackathon",
    date: "March 2026",
    dateISO: "2026-03-28",
    kind: "Hackathon",
    image: "/img/event/Equinox.png",
    desc: "Built Blossom and placed second at a nature-themed hackathon.",
    href: "/projects/blossom/",
  },
  {
    title: "Juice 2025",
    date: "April 2025",
    dateISO: "2025-04-05",
    kind: "Hackathon",
    image: "/img/event/juice.jpg",
    desc: "A Hack Club game jam in Shanghai, China; William built SpaceGoose.",
    href: "/projects/spacegoose/",
  },
  {
    title: "Scrapyard Vancouver 2025",
    date: "March 2025",
    dateISO: "2025-03-15",
    kind: "Hackathon",
    image: "/img/event/scrapyard.png",
    desc: "Hack Club's worldwide build-something-fun hackathon; William made AI Nerf Gun Aimbot.",
    href: "/projects/ai-nerf-aimbot/",
  },
  {
    title: "BCSLC 2024",
    date: "October 2024",
    dateISO: "2024-10-25",
    kind: "Leadership",
    image: "/img/event/bcslc.png",
    desc: "BC's annual student leadership conference with leaders from around the province.",
  },
  {
    title: "Queen's Commonwealth Essay Competition - Gold",
    date: "2024",
    dateISO: "2024-06-01",
    kind: "Award",
    image: "/img/award/essay.jpg",
    desc: 'Recognized for "Small Steps for a Climate Crisis."',
    href: "https://docs.google.com/document/d/1kXjQNyiscQn2zaWMtxfgl-uwdmnqZ8j-wsJJY0dZCqQ/edit?usp=sharing",
  },
  {
    title: "Youth4Action CHAMP",
    date: "2024-2025",
    dateISO: "2024-01-01",
    kind: "Leadership",
    image: "/img/event/youth.png",
    desc: "A Metro Vancouver program designed to empower youth leaders to make the region more sustainable.",
  },
  {
    title: "Democracy and me art contest - 1st place",
    date: "2019",
    dateISO: "2019-01-01",
    kind: "Award",
    image: "/img/award/democracy.jpg",
    desc: "A democracy-themed art contest; 1st place in the grade K-4 category.",
  },
  {
    title: "Spark 2024",
    date: "April 2024",
    dateISO: "2024-04-22",
    kind: "Talk",
    image: "/img/event/spark.jpg",
    desc: "'Spark' is a sustainability event focused on climate change and environmental awareness.",
  },
  {
    title: "Québec 2024",
    date: "February 2024",
    dateISO: "2024-02-24",
    kind: "Trip",
    image: "/img/event/quebec.jpg",
    desc: "Citadel Middle School french-immersion trip to Québec, Canada.",
  },
  {
    title: "Youth Tech Day 2024",
    date: "September 2024",
    dateISO: "2024-09-07",
    kind: "Tech",
    image: "/img/event/techday.jpg",
    desc: "Youth Tech Day hosted by Geek Squad, featuring various tech-related activities.",
    href: "https://lttstore.com",
  },
];

export const stats = [
  { value: 29, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "", label: "Hardware builds" },
  { value: 5, suffix: "", label: "Hackathons & game jams" },
  { value: 8, suffix: "+", label: "Years building" },
];

export const toolbox = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "C++",
  "HTML / CSS",
  "React",
  "Godot",
  "Unity",
  "Roblox / Luau",
  "Scratch",
  "AutoCAD",
  "OpenSCAD",
  "3D Printing",
  "Git",
];

export const featuredWritings: WritingEntry[] = writingEntries.filter((w) =>
  ["Penciled", "Small Steps for a Climate Crisis", "The Hidden Library"].includes(w.title)
);
