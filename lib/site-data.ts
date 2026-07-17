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
  emoji?: string;
};

export type CaseStudy = Project & {
  eyebrow: string;
  summary: string;
  links: { label: string; href: string }[];
  sections: {
    title: string;
    body: string[];
    bullets?: string[];
    links?: { label: string; href: string }[];
  }[];
  galleryHeading?: {
    title: string;
    eyebrow?: string;
    centered?: boolean;
  };
  gallery: { src: string; alt: string; caption: string }[];
  video?: {
    title: string;
    embedUrl: string;
    iframeTitle: string;
    centered?: boolean;
  };
  components?: {
    heading: string;
    note?: string;
    listHref?: string;
    rows: { type: string; item: string; price: string }[];
    total?: string;
    totalNote?: string;
  };
  changelog?: { date: string; note: string }[];
};

export type SocialIcon =
  | "github"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "discord"
  | "mail";

export const socials: {
  label: string;
  href: string;
  icon: SocialIcon;
  display?: string;
}[] = [
  { label: "GitHub", href: "https://github.com/stickmanned", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/william-wen-9371633bb/",
    icon: "linkedin",
    display: "William Wen",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stickmanned/",
    icon: "instagram",
    display: "@stickmanned (William Wen)",
  },
  {
    label: "YouTube / FHC Tech",
    href: "https://www.youtube.com/@fhctech",
    icon: "youtube",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/911011264120119336/",
    icon: "discord",
  },
];

export const featuredProjects: Project[] = [
  {
    slug: "pine-a64-gaming-pc",
    emoji: "🕹️",
    title: "Pine A64 Gaming PC",
    year: "2026",
    dateISO: "2026-07-02",
    image: "/img/projects/pine-a64-gaming-pc/finished_case_fan_spinning.jpeg",
    href: "/projects/pine-a64-gaming-pc/",
    externalHref: "https://github.com/stickmanned/Pine-A64-Gaming-PC",
    categories: ["Featured", "Hardware"],
    tags: ["Hardware", "CAD / OpenSCAD", "Linux", "3D Print"],
    blurb:
      "I turned an old Pine A64 board into a custom-cooled, 3D-printed Moonlight gaming client with DietPi, wiring, CAD, and DRM/KMS debugging.",
  },
  {
    slug: "blossom",
    emoji: "🌸",
    title: "Blossom",
    year: "2026",
    dateISO: "2026-04-02",
    image: "/img/projects/blossom/repo/icon-128.png",
    href: "/projects/blossom/",
    externalHref: "https://github.com/stickmanned/Blossom",
    categories: ["Featured", "Web Apps"],
    tags: ["Chrome Extension", "Manifest V3", "JavaScript", "Local Storage"],
    blurb:
      "A Manifest V3 focus extension where I turned timers, blocked sites, coins, tree growth, and a draggable garden into one small productivity game.",
  },
  {
    slug: "ai-nerf-aimbot",
    emoji: "🎯",
    title: "AI Nerf Gun Aimbot",
    year: "2025",
    dateISO: "2025-03-15",
    image: "/design-assets/nerf.png",
    href: "/projects/ai-nerf-aimbot/",
    externalHref: "https://github.com/stickmanned/AI-Nerf-gun-Aimbot",
    categories: ["Featured", "Hardware", "Experiments"],
    tags: ["Computer Vision", "Python", "Arduino", "OpenCV"],
    blurb:
      "A webcam-to-Arduino aiming prototype that uses MediaPipe pose tracking, serial commands, and two servos to point a Nerf turret at a detected target.",
  },
  {
    slug: "spacegoose",
    emoji: "🪿",
    title: "SpaceGoose",
    year: "2025",
    dateISO: "2025-04-05",
    image: "/design-assets/spacegoose.png",
    href: "/projects/spacegoose/",
    externalHref: "https://fraserhackclub.itch.io/spacegoose",
    categories: ["Featured", "Games"],
    tags: ["Godot", "GDScript", "Game Jam"],
    blurb:
      "A Godot platformer built for Hack Club's Juice game jam, with planets, juice powerups, inventory, weapons, and a final Doom Duck boss.",
  },
  {
    slug: "lamp-pro",
    emoji: "💡",
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
    emoji: "🖥️",
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
    emoji: "🔊",
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
    emoji: "🐾",
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
    emoji: "⚔️",
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
    emoji: "🌀",
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
    emoji: "🎲",
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
    emoji: "🟩",
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
    emoji: "🏎️",
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
    emoji: "🥷",
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
    emoji: "💥",
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
    emoji: "🛒",
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
    emoji: "🥚",
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
    emoji: "🐈‍⬛",
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
    emoji: "🌀",
    title: "Beyblade Masters! (Scratch)",
    year: "2021",
    dateISO: "2021-08-25",
    image: "/img/projects/bey1.png",
    href: "https://scratch.mit.edu/projects/558891308/",
    externalHref: "https://scratch.mit.edu/projects/558891308/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A fast-paced game about Beyblade battles.",
  },
  {
    slug: "pet-simulator-classic",
    emoji: "🐾",
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
    emoji: "🐱",
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
    emoji: "💣",
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
    emoji: "🚗",
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
    emoji: "🪖",
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
    emoji: "🪜",
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
      "A free-to-play game that combines many different mechanics with stairs, of course.",
  },
  {
    slug: "pet-square-root",
    emoji: "➗",
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
    emoji: "🦸",
    title: "Superhero Story (Scratch School Project)",
    year: "2023",
    dateISO: "2023-11-05",
    image: "/img/projects/superhero.png",
    href: "https://scratch.mit.edu/projects/789620634/",
    externalHref: "https://scratch.mit.edu/projects/789620634/",
    categories: ["Games"],
    tags: ["Scratch"],
    blurb: "A Scratch story about saving AMOGUS from Cyborg Cat.",
  },
  {
    slug: "pet-simulator-hardcore",
    emoji: "🔥",
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
    emoji: "🚽",
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
      "Oh no. You watched too many YouTube Shorts about Skibi Toilet. Now your thoughts are real.",
  },
];

export const allProjects = [...featuredProjects, ...extraProjects];

export const caseStudies: CaseStudy[] = [
  {
    ...featuredProjects[0],
    eyebrow: "Hardware / Hack Club Horizons",
    summary:
      "I turned a low-power Pine A64 single-board computer into a custom-cooled, custom-enclosed gaming client, then documented the whole process from teardown to final Moonlight streaming test.",
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
      {
        label: "Build timelapses",
        href: "https://drive.google.com/drive/folders/1OZEimO6eNiohD2dQr07wJ2Tfkh4ZQb1m?usp=sharing",
      },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "This project started as a simple question: could I make an old Pine A64 feel like a tiny gaming PC if I stopped asking it to render games locally and instead treated it like a purpose-built streaming appliance?",
          "The answer became a full hardware and software build. I used a Pine A64 2GB Rev B board running DietPi, streamed games from a host PC with Moonlight, added active cooling with a Noctua 60 mm fan, wired a real external power button, and designed a custom 3D-printed enclosure around the board.",
          "I built it for Hack Club Horizons, so the project also had to be reviewable and reproducible. The repo includes the hourly devlog, CAD files, wiring schematic, firmware config, BOM, photos, and final assembly notes instead of just a finished glamour shot.",
        ],
      },
      {
        title: "Why I Built It",
        body: [
          "I wanted to build something that sat between a normal PC build and a small embedded project. The Pine A64 is not powerful in the way a gaming machine usually is, which made it interesting: the project was not about brute force, it was about constraints, routing, thermals, Linux graphics, and packaging.",
          "The main idea was to prove that the board could become a useful cloud gaming client if the hard rendering work happened on a stronger host PC. That meant my job was to make the Pine A64 boot reliably, decode and display the stream, stay cool, handle input, and live inside a case that felt intentional.",
          "It also mattered to me as a portfolio project because it shows the messy middle of engineering: reading pinouts, debugging boot failures, changing the software architecture when the first approach is wrong, revising CAD after a part does not physically fit, and writing down enough detail that someone else can understand the build.",
        ],
      },
      {
        title: "The Build Process",
        body: [
          "I started by removing the stock acrylic enclosure and exposing the Pine A64 board so I could plan the thermal and mounting layout. From there I finalized the BOM around a Noctua NF-A6x25 FLX fan, copper heatsinks, an MT3608 boost converter, jumper wiring, M3 hardware, a Cherry MX-compatible momentary switch, and 3D printing materials.",
          "Before wiring anything permanently, I mapped the board headers. The fan power path used the Pi-2 bus 5 V and GND pins as the input side for the MT3608 boost converter, while the external power button connected to the EXP header pin 5, `Pwr/Stb Sw`, and pin 6, `GND`. I deliberately used the power-button signal instead of putting a switch in series with the main 5 V line, because hard-cutting power while DietPi is running can corrupt the microSD card.",
          "On the software side I flashed DietPi, worked through HDMI and boot problems, and moved toward a minimal Moonlight setup. The important fix was forcing HDMI to `1920x1080@60` in `/boot/dietpiEnv.txt` before Linux started, which kept the Allwinner A64 DRM/KMS display stack from exhausting the CMA memory pool. I also removed the XFCE desktop path so Moonlight could run closer to an appliance-style setup instead of carrying a full desktop environment in the background.",
          "The enclosure was designed in Fusion 360 using imported reference geometry, a Noctua fan model, and a Cherry MX switch model. I designed fan mounting pillars, a side power-button cutout, a top fan opening with chamfered edges, and separate top and bottom shells. After a test print showed the fan could not slide past all four pillars, I revised the CAD by removing one pillar while keeping enough structure for the fan to mount securely.",
          "One small detail turned into its own mini project: the sourced keycaps were too large for the cutout I had designed. Instead of remodeling a cap from scratch, I used the KeyV2 OpenSCAD library to generate a smaller 16 mm by 16 mm Cherry-compatible keycap with a 7 mm depth and an engraved power icon.",
        ],
      },
      {
        title: "Technical Decisions",
        body: [
          "The build split power into two roles: the Pine A64 stayed on a regulated 5 V supply, and the Noctua fan got its own 12 V rail from the MT3608 boost converter. The golden rule in the devlog was that 12 V powers only the fan and never touches the Pine A64 headers.",
          "For networking and streaming, the project leaned on Moonlight and a host gaming PC. Ethernet was preferred over Wi-Fi for lower latency and stability. The Pine A64 handled the client side: boot, display output, input devices, and the streaming session.",
          "For reproducibility, I committed the DietPi boot snippet, Moonlight autostart block, KMS/input udev rule, installer script, wiring schematic, Fusion 360 archive, STL/3MF exports, BOM, and devlog. That documentation became part of the engineering work, not an afterthought.",
        ],
        bullets: [
          "Pine A64 2GB Rev B running DietPi",
          "Moonlight / moonlight-qt streaming from a host gaming PC",
          "Allwinner A64 DRM/KMS display stack with a 1080p HDMI boot cap",
          "Noctua NF-A6x25 FLX fan, copper heatsinks, and MT3608 boost converter",
          "EXP header momentary power switch instead of hard-cutting main power",
          "Fusion 360 enclosure, OpenSCAD KeyV2 keycap, STL/3MF print exports",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The hardest part was not one single bug. It was the way small constraints stacked on top of each other. Early bring-up had black-screen HDMI failures, USB hotplug brownouts, unreliable network discovery, and repeated boot instability. I had to switch between hardware isolation, better power delivery, SSH-first setup, router/DHCP detective work, and display debugging just to get a stable path into the board.",
          "Moonlight exposed another constraint: the Pine A64 is a very limited client. The devlog records an early stream running at about 2 FPS when the system fell back to software decoding. Re-enabling the modern display path and capping HDMI at 1080p improved the situation, but the project also made clear that the graphics stack, Mali-400 driver limitations, startup races, and rendering backend choices all mattered.",
          "The autostart flow went through several experiments. EGLFS helped move away from a desktop, but it also brought cursor and SDL display issues. I added delay logic, fixed runtime directory problems, and installed a udev rule so the normal DietPi user could access DRM and input devices. The devlog is honest that after Hour 11 the stack was functionally correct but architecturally misaligned; the final repo files document the cleaner boot, udev, and autostart setup used for review.",
          "The physical build had its own version of that same lesson. A CAD design can look clean and still fail when the fan physically cannot slide into place. The power button needed a custom keycap because the real cutout was smaller than the keycaps I had. Even cable routing mattered, so the final assembly uses hot glue for strain relief and to keep wiring away from the heatsinks.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "Technically, I learned how much embedded Linux work happens below the visible app. A gaming stream is not just Moonlight launching successfully. It depends on boot resolution, memory allocation, DRM/KMS availability, input permissions, startup timing, display backend behavior, and power stability.",
          "I also learned to treat hardware documentation as a design tool. The pinout work in Hour 2 shaped the whole electrical architecture: where the fan power came from, where the power button signal went, and why the 12 V fan rail had to stay separate from the board.",
          "Personally, this project taught me to keep going after the first version technically works but still feels wrong. The build improved because I kept writing down failures, checking assumptions, and letting real test results change the design.",
        ],
      },
      {
        title: "Final Result / Current Status",
        body: [
          "The final build is a working low-power Moonlight gaming client inside a custom 3D-printed enclosure. The power button starts and shuts down the board, the fan spins immediately and moves air across the heatsinks, DietPi boots into the Moonlight launch flow, and the completed enclosed unit streamed a live session from the host PC end-to-end.",
          "What worked: the active cooling, the separate 12 V fan rail, the EXP-header power button, the revised enclosure, the custom keycap, the 1080p HDMI boot cap, and the final assembly process. What did not work cleanly at first: the desktop-based approach, early HDMI handling, hot-plug USB behavior, EGLFS/rendering experiments, and the first four-pillar fan mount.",
          "If I kept improving it, I would focus on making the startup architecture more service-based, testing latency and frame pacing more formally, and refining the enclosure for easier maintenance. Even with those next steps, this is one of my stronger portfolio projects because it shows the full loop: concept, sourcing, wiring, OS bring-up, CAD, printing, debugging, final testing, and documentation.",
        ],
      },
    ],
    galleryHeading: {
      title: "Gallery",
      centered: true,
    },
    gallery: [
      {
        src: "/img/projects/pine-a64-gaming-pc/teardown_bare_board.jpg",
        alt: "Bare Pine A64 board after removing the stock acrylic enclosure",
        caption: "Bare-board teardown",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/noctua_fan.jpg",
        alt: "Noctua NF-A6x25 FLX 12V fan used for active cooling",
        caption: "Noctua 12V fan",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/bom_sourcing_cart.png",
        alt: "Sourcing cart for power, thermal, and prototyping hardware",
        caption: "BOM sourcing",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_inner_pillars.png",
        alt: "Fusion 360 view of internal mounting pillars for the cooling fan",
        caption: "Fan mounting pillars",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_power_button.png",
        alt: "Fusion 360 side-panel cutout for the Cherry MX power switch",
        caption: "Power-button cutout",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_top_cutout.png",
        alt: "Fusion 360 top cover with chamfered fan cutout",
        caption: "Top fan cutout",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_pillar_fix.png",
        alt: "CAD revision showing the fan clearance fix after removing one pillar",
        caption: "Pillar clearance fix",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/final_wiring_hardware.jpeg",
        alt: "MT3608 boost converter, USB cable, and Dupont wiring staged for final wiring",
        caption: "Final wiring hardware",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/pi2_bus_fan_power_wiring.jpeg",
        alt: "Fan power leads soldered to the Pi-2 bus header power and ground pins",
        caption: "Pi-2 bus fan power tap",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/power_switch_lead_soldering.jpeg",
        alt: "Power switch leads being soldered while the switch is held in a printed jig",
        caption: "Power switch soldering",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/exp_header_power_button_wiring.jpeg",
        alt: "Power button leads connected to the EXP header with hot glue strain relief",
        caption: "EXP header power button",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/final_assembly_fan_and_board.jpeg",
        alt: "Fan mounted inside the printed enclosure next to the Pine A64 board",
        caption: "Fan and board assembly",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cable_management_hot_glue.jpeg",
        alt: "Fan leads and MT3608 secured inside the shell with hot glue",
        caption: "Cable management",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/finished_case_fan_spinning.jpeg",
        alt: "Finished enclosure with the fan spinning through the top cutout",
        caption: "Finished enclosure",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/moonlight_streaming_verified.jpeg",
        alt: "Moonlight streaming session running on a connected display",
        caption: "Moonlight verified",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/openscad_keycap_custom_dimensions.png",
        alt: "OpenSCAD KeyV2 configuration for the custom power-button keycap",
        caption: "OpenSCAD keycap dimensions",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/keycap_slicer_power_icon.png",
        alt: "Slicer preview of the custom keycap with an engraved power icon",
        caption: "Power-icon keycap preview",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_final_render_fan_angle.png",
        alt: "Fusion 360 render of the final enclosure from the fan side",
        caption: "Final CAD render, fan angle",
      },
      {
        src: "/img/projects/pine-a64-gaming-pc/cad_final_render_button_angle.png",
        alt: "Fusion 360 render of the final enclosure from the power-button side",
        caption: "Final CAD render, button angle",
      },
    ],
  },
  {
    ...featuredProjects[1],
    eyebrow: "Chrome extension / Equinox Vancouver Hackathon",
    summary:
      "I built and published a Chrome extension that turns focus time into a tiny garden: you plant a tree, stay away from blocked sites, earn coins, and use those coins to grow a larger, stranger forest.",
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
        title: "Overview",
        body: [
          "Blossom started from a feeling I kept running into: focus tools often feel like punishment. They tell you what not to do, but they do not give you much to look forward to. I wanted to build a focus extension that still blocked distractions, but made the process feel more like growing something.",
          "The result is a Manifest V3 Chrome extension with a popup-based focus timer, a draggable garden plot, planted trees that visually grow over time, a blocked-domain system, coins, a tree shop, garden expansion, and local progress stored in the browser.",
          "The version documented here is the built extension from the GitHub repo and the public Chrome Web Store listing. The repo describes Blossom as a gamified productivity companion: plant a seed, focus, avoid distractions, earn coins, and spend those coins on new tree variants.",
        ],
      },
      {
        title: "Why I Built It",
        body: [
          "I wanted the core action to be physical and visual, not just pressing start on another timer. In Blossom, starting a session means entering planting mode, choosing a tree type, and clicking a specific spot on the garden plot. That little interaction makes the session feel like it belongs somewhere.",
          "The project was also a good way to explore browser-extension architecture. I had to split work between a popup UI, a background service worker, a content script, and Chrome's local storage, while keeping the user experience simple enough to understand from a small extension window.",
          "For my portfolio, Blossom matters because it shows product thinking and implementation together. It is not only a JavaScript exercise; it has game mechanics, state persistence, UI animation, permissions, privacy considerations, and a public Web Store release.",
        ],
      },
      {
        title: "Product Flow",
        body: [
          "The main flow starts in the popup. I click the timer button, Blossom switches into planting mode, and I choose which tree to plant. Blossom is always available for free, while Fire and Glowberry come from the shop inventory.",
          "When I click the garden plot, the extension stores a new planted tree with a type, position, creation time, and active tree ID. The timer starts, the UI updates once per second, and the active tree changes stages as the session continues.",
          "When I stop the session, the background script calculates elapsed focus time, converts it into coins, finalizes the active tree's growth time, and adds the focused seconds to the lifetime total. The popup then animates the conversion by counting the timer down and counting coins up, with coin sounds layered in so stopping a session feels rewarding.",
        ],
      },
      {
        title: "How It Works",
        body: [
          "The background service worker is the source of truth for timer, currency, focus stats, and garden state. It stores those pieces under separate `chrome.storage.local` keys, sanitizes loaded values, and responds to popup messages such as `TIMER_GET_STATE`, `TIMER_TOGGLE`, `GARDEN_BUY_TREE`, and `GARDEN_EXPAND`.",
          "The popup script handles the interactive layer: rendering the timer, blocked-domain panel, shop, tree selector, garden viewport, planted tree sprites, and focus stats. It also manages planting mode, pan/drag behavior, purchase quantities, MAX buying, garden expansion, and the coin animation after a session ends.",
          "The content script handles the distraction blocker. It runs on pages, reads the local timer and blocklist state, normalizes the current hostname, and only applies the lock when a focus session is active and the current domain matches the user's blocked list. The lock blurs the page, disables interaction behind the overlay, and shows the message `Stay focused, you are doing great.` with the current focused time.",
        ],
      },
      {
        title: "Tech Stack",
        body: [
          "Blossom is intentionally local-first. The manifest uses the `storage` permission, the popup and background communicate through Chrome runtime messages, and the content script uses local state to decide whether the current tab should be blocked.",
        ],
        bullets: [
          "Manifest V3 Chrome extension",
          "Vanilla JavaScript, HTML, CSS",
          "Webpack via Chrome Extension CLI",
          "`chrome.storage.local` for timer, coins, focus stats, blocklist, inventory, and garden state",
          "Background service worker for state transitions and point calculations",
          "Content script for blocked-domain overlay during active focus sessions",
          "Popup UI with custom tree art, shop panels, draggable garden viewport, and coin sounds",
        ],
      },
      {
        title: "Game Mechanics",
        body: [
          "The tree system gives the timer a visible outcome. Blossom has five growth stages over an hour. Fire has three stages and earns 2 coins per minute. Glowberry has four stages, takes much longer to grow, and earns 5 coins per minute.",
          "Coins are not just a number in the corner. They unlock the shop loop: spend coins on special tree inventory, choose those trees for future sessions, and expand the garden when the original 6 by 6 tile world starts feeling cramped. Expansion costs scale up as the garden grows.",
          "The garden itself is stored as data rather than a static image. Each planted tree keeps percentage-based coordinates, so when the garden expands the background script can shift existing tree positions into the larger world instead of losing the layout.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The hardest part was making a tiny extension popup feel like a complete product. There are a lot of states hiding inside that small window: idle, planting, running, stopping, shopping, buying, blocked-domain editing, garden dragging, and garden expansion.",
          "Another challenge was keeping state reliable. A focus session can outlive the popup window, so the background worker has to preserve the timer start time and active tree. When the popup opens again, it asks for current state and reconstructs the visible timer, garden, coins, and shop from storage.",
          "The blocker also needed to be strict without feeling mysterious. I normalized domains, handled subdomains, watched storage changes, and polled once per second so the overlay still responds on single-page apps and changing browser state.",
          "The repo also shows a few rough edges I would improve next: the quickstart file is still mostly boilerplate from Chrome Extension CLI, and the extension has a hidden developer panel for testing coins/timer state that I would keep out of a polished public-facing build or guard more clearly.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "Technically, I learned how to design a browser extension as several cooperating pieces instead of one page of JavaScript. The popup is the interface, the background script is the state machine, and the content script is the part that touches the web page.",
          "I also learned that game mechanics need balancing even in small tools. Coin rates, tree costs, growth times, garden expansion costs, and purchase quantities all affect whether the loop feels motivating or confusing.",
          "Personally, this project taught me that productivity software can have a softer personality. Blossom still blocks distractions, but the main emotional hook is building a garden that proves I spent time focusing.",
        ],
      },
      {
        title: "Final Result / Current Status",
        body: [
          "Blossom is open source on GitHub and published on the Chrome Web Store. The public listing describes it as a focused garden for productivity, and the repo includes the extension source, manifest, popup UI, background worker, content script, tree art, coin art, garden tile, sounds, and build configuration.",
          "What worked well was the full loop: plant a tree, start focusing, block distractions, earn coins, buy new tree types, and expand the garden. What I would improve next is documentation, onboarding, extension-state cleanup, and more polished progression balancing as the garden gets larger.",
        ],
      },
    ],
    galleryHeading: {
      title: "Gallery",
      centered: true,
    },
    gallery: [
      {
        src: "/img/projects/blossom/store/store-screenshot-1.png",
        alt: "Chrome Web Store screenshot of the Blossom extension popup with timer and garden",
        caption: "Store screenshot - timer and garden",
      },
      {
        src: "/img/projects/blossom/store/store-screenshot-2.png",
        alt: "Chrome Web Store screenshot showing Blossom's garden and focus interface",
        caption: "Store screenshot - focus interface",
      },
      {
        src: "/img/projects/blossom/store/store-screenshot-3.png",
        alt: "Chrome Web Store screenshot showing Blossom's shop and progression UI",
        caption: "Store screenshot - shop and progression",
      },
      {
        src: "/img/projects/blossom/repo/icon-128.png",
        alt: "Blossom extension icon",
        caption: "Extension icon",
      },
      {
        src: "/img/projects/blossom/repo/garden-plot.png",
        alt: "Tile artwork used for Blossom's draggable garden plot",
        caption: "Garden plot tile",
      },
      {
        src: "/img/projects/blossom/repo/coin.png",
        alt: "Coin artwork used for Blossom's currency",
        caption: "Coin currency asset",
      },
      {
        src: "/img/projects/blossom/repo/blossom 1.png",
        alt: "Blossom starter tree first growth stage",
        caption: "Blossom tree - stage 1",
      },
      {
        src: "/img/projects/blossom/repo/blossom 2.png",
        alt: "Blossom starter tree second growth stage",
        caption: "Blossom tree - stage 2",
      },
      {
        src: "/img/projects/blossom/repo/blossom 3.png",
        alt: "Blossom starter tree third growth stage",
        caption: "Blossom tree - stage 3",
      },
      {
        src: "/img/projects/blossom/repo/blossom 4.png",
        alt: "Blossom starter tree fourth growth stage",
        caption: "Blossom tree - stage 4",
      },
      {
        src: "/img/projects/blossom/repo/blossom 5.png",
        alt: "Blossom starter tree final growth stage",
        caption: "Blossom tree - final stage",
      },
      {
        src: "/img/projects/blossom/repo/fire 1.png",
        alt: "Fire tree first growth stage",
        caption: "Fire tree - stage 1",
      },
      {
        src: "/img/projects/blossom/repo/fire 2.png",
        alt: "Fire tree second growth stage",
        caption: "Fire tree - stage 2",
      },
      {
        src: "/img/projects/blossom/repo/fire 3.png",
        alt: "Fire tree final growth stage",
        caption: "Fire tree - final stage",
      },
      {
        src: "/img/projects/blossom/repo/glow 1.png",
        alt: "Glowberry tree first growth stage",
        caption: "Glowberry tree - stage 1",
      },
      {
        src: "/img/projects/blossom/repo/glow 2.png",
        alt: "Glowberry tree second growth stage",
        caption: "Glowberry tree - stage 2",
      },
      {
        src: "/img/projects/blossom/repo/glow 3.png",
        alt: "Glowberry tree third growth stage",
        caption: "Glowberry tree - stage 3",
      },
      {
        src: "/img/projects/blossom/repo/glow 4.png",
        alt: "Glowberry tree final growth stage",
        caption: "Glowberry tree - final stage",
      },
    ],
  },
  {
    ...featuredProjects[2],
    eyebrow: "Computer vision hardware",
    summary:
      "I built a computer-vision aiming prototype that connects a webcam, Python pose tracking, serial communication, and an Arduino-controlled pan/tilt mount for a Nerf turret.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/stickmanned/AI-Nerf-gun-Aimbot/",
      },
      {
        label: "Demo video",
        href: "https://www.youtube.com/watch?v=meBMtv7MJ30",
      },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "This project was my attempt to make a Nerf blaster feel like it had its own vision system. The repo is small, but the core loop is real: a Python program watches the webcam, detects a person with MediaPipe Pose, chooses the nose landmark as the target, maps that screen position into servo angles, and sends those angles to an Arduino over serial.",
          "The Arduino side receives those target angles and moves two servos, one for horizontal aim and one for vertical aim. The code does not include an automated trigger, so I describe this honestly as an aiming prototype rather than a fully self-firing turret.",
        ],
      },
      {
        title: "Why I Built It",
        body: [
          "I wanted to explore the part of robotics that sits between software confidence and physical motion. It is one thing to draw a target point on a camera feed; it is another to turn that point into stable servo movement without jittering, overshooting, or fighting the limits of the mechanism.",
          "A Nerf aiming rig was a fun way to make that problem visible. The project let me connect computer vision, coordinate mapping, serial protocols, embedded code, and mechanical constraints in one compact build.",
        ],
      },
      {
        title: "How It Works",
        body: [
          "The Python script starts by auto-detecting a likely Arduino serial port, looking for device names such as `usbmodem` or `usbserial`. Once connected at 9600 baud, it sends an `INIT` command and asks the Arduino for its current default servo position.",
          "After that handshake, OpenCV opens the webcam at a 451 by 480 frame size and MediaPipe Pose runs on each frame. When pose landmarks are available, the script uses landmark 0, the nose, as the target. It converts the normalized landmark position into pixel coordinates, draws a green target marker for debugging, and maps the target point into servo angles.",
          "The horizontal mapping is inverted so movement in the camera frame corresponds to the physical direction of the turret. The vertical mapping stays normal, with the top of the frame mapped upward and the bottom mapped downward. The Python side also keeps the movement within a window around the Arduino's default position: X is allowed to move about 60 degrees each way, while Y is kept much tighter at about 10 degrees each way.",
        ],
      },
      {
        title: "Tech Stack",
        body: [],
        bullets: [
          "Python with OpenCV for webcam capture and debug display",
          "MediaPipe Pose for human landmark detection",
          "PySerial for USB serial communication",
          "Arduino sketch using the Servo library",
          "Two-servo pan/tilt control, with servos attached to Arduino pins 3 and 5",
          "A simple serial protocol: `INIT`, `DEFAULT,x,y`, and `newX,newY` angle commands",
        ],
      },
      {
        title: "Control Loop",
        body: [
          "The Arduino sketch starts both servos at 90 degrees and reports that default as `DEFAULT,90,90`. When it receives a new `x,y` command, it parses the values, constrains X between 30 and 150 degrees, and constrains Y between 80 and 100 degrees.",
          "I handled servo motion gradually instead of instantly jumping to the target. The Arduino moves each axis toward the new angle in small steps, using 2-degree increments when it is far away and 1-degree increments when it gets close, with a 10 ms delay inside the movement loop. That makes the motion smoother and reduces abrupt mechanical twitching.",
          "The Python side also avoids spamming repeated commands by remembering the previous X and Y angles. It only sends a new serial command when the mapped target angle changes, with a short 50 ms pause after each send.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The main challenge was translating camera coordinates into physical movement. The camera sees a flat frame, but the servos move through constrained angles, and the useful range is not symmetrical. The code reflects that by inverting the horizontal mapping and keeping the vertical range narrow.",
          "Another challenge was making the software and hardware agree about their starting point. Instead of hardcoding everything only on the Python side, the program asks the Arduino for its default position before calculating limits. That handshake made the system easier to reason about while testing.",
          "There are also limits in the current version. The repo does not show ballistic compensation, target prediction, automatic firing, or a finished enclosure. It is a working aiming loop and a strong prototype, but not a completed productized turret.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "This project taught me that robotics code has to be written with the physical system in mind. A detection model can update quickly, but servos need limits, smoothing, and a control protocol that does not flood the microcontroller.",
          "I also learned the value of visible debugging. Drawing the target point on the OpenCV frame made it much easier to see whether the vision system was wrong, the mapping was wrong, or the servo movement was wrong.",
          "As a portfolio project, this matters because it shows I can connect AI-style perception to hardware actuation. It is not just a model running in a notebook; it is software that talks to a real controller and moves a real mechanism.",
        ],
      },
      {
        title: "Final Result / Current Status",
        body: [
          "The final repo demonstrates a working webcam-to-servo aiming pipeline. Python detects the target, maps it into angles, and sends commands; the Arduino receives those commands, constrains them to safe ranges, and moves the pan/tilt servos smoothly.",
          "What worked well was the end-to-end connection between MediaPipe tracking and Arduino motion. What I would improve next is the rest of the turret system: a more documented mechanical mount, calibration tools, target filtering, latency testing, and, if I wanted it to become a true automated Nerf system, a separately designed and safely controlled firing mechanism.",
        ],
      },
    ],
    video: {
      title: "Video",
      embedUrl: "https://www.youtube.com/embed/meBMtv7MJ30",
      iframeTitle: "AI Nerf Gun Aimbot demo video",
      centered: true,
    },
    gallery: [],
  },
  {
    ...featuredProjects[3],
    eyebrow: "Godot platformer / Juice 2025",
    summary:
      "I helped build a Godot platformer for Juice 2025 where a spacefaring goose collects eggs, bread, juice powerups, and score across planet-themed levels before confronting Doom Duck for the Golden Egg.",
    links: [
      {
        label: "GitHub repo",
        href: "https://github.com/FraserHackClub/SpaceGoose",
      },
      {
        label: "Play on itch.io",
        href: "https://fraserhackclub.itch.io/spacegoose",
      },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "SpaceGoose is one of the most memorable games I build, started as a Hack Club Juice 2025 game-jam project. You play as a goose, travel through space, collect what you can such as bread and eggs, and eventually get the Golden Egg back from Doom Duck, which is the main objective of the game.",
          "The game has a main menu, level selector, persistent inventory, score-gated progression, multiple world scenes, custom pixel-art sprites, juice powerups, a weapon pickup, bullets and fireballs, hazards, teleporters, pause handling, and a final boss scene.",
          "SpaceGoose is a collaborative game-jam build built with my friends Paya and Harry. Because the repository lives under Fraser Hack Club and has many feature branches and pull requests from both me and my friends, I will summarize what we did together as a team.",
        ],
      },
      {
        title: "What We Built",
        body: [
          "We worked on a 2D platformer loop where movement, collection, survival, and level progression all feed into each other. The player goose can walk, jump, double-jump, crouch, glide, interact with level exits, collect eggs and bread for score, lose eggs on death, and carry progress between runs through an inventory save file.",
          "The game is organized around a sequence of level scenes, with each level being a different planet or part of the same planet, such as 3 levels on the moon. The tracked progression path includes 16 playable level entries, moving from early Earth-style stages into Moon, Mars, asteroid, and final boss areas. Score requirements gate later stages, so you will have to complete the same level multiple times to progress.",
          "The more playful systems are the juice powerups. Apple juice boosts speed, grape juice grants timed invincibility with a separate timer display and a cool rainbow effect on the goose, and orange juice works with the gun system by reloading fireballs when the player has picked up the weapon.",
        ],
      },
      {
        title: "The Process",
        body: [
          "We started from the core platformer feeling, with the very first stages based off a Godot platform tutorial. As the game went on, it became our own thing, and we built on that foundation. The goose had to stand out, responsive, and funny-looking without becoming impossible to control. That meant tuning speed, jump velocity, crouching, wall or invincibility jumps, gravity (the hardest part by far), and animation states so it could move through long tile-based levels and tight obstacle sections.",
          "Once the movement loop existed and tuned, We built outward into progression. We connected pickups to inventory counts, score, HUD labels, and local storage, then used that score to decide when the next level should load and when the level selector should appear instead. That made the game feel less like disconnected scenes and more like one campaign through the stars.",
          "The final pass was about making the game feel complete enough to ship for the game jam: menus, level selection, pause handling, help-sign toggles, juice UI, export presets for Windows, Linux, and web.",
        ],
      },
      {
        title: "Tech Stack",
        body: [
          "The project is built in Godot and scripted with GDScript. The repo uses Godot scenes for the player, pickups, hazards, level worlds, UI, camera, weapons, projectiles, and Doom Duck.",
        ],
        bullets: [
          "Godot 4.4 with the GL Compatibility renderer",
          "GDScript for movement, inventory, menus, camera logic, pickups, weapons, and boss behavior",
          "Godot `.tscn` scenes for levels, UI panels, characters, hazards, projectiles, and interactables",
          "`user://inventory.json` persistence for items, score, Golden Egg state, and current level",
          "Keyboard, mouse, and some controller input mappings for movement, shooting, pause, restart, help, and juice",
          "Export presets for Windows, Linux, and web builds",
        ],
      },
      {
        title: "Art/Music",
        body: [
          "Me, Paya, and Harry all contributed to the visual assets and animations, including the sprites for the goose and the final boss Doom Duck. I worked mainly on each map's enviornments and the enemies.",
          "We used the sound effects from YouTube and Meme Soundboard, while Paya created the OSTs for the Boss and main theme.",
        ],
      },
      {
        title: "Systems",
        body: [
          "The inventory system became the backbone. It stores eggs, bread, apple juice, orange juice, grape juice, score, current level, and whether the Golden Egg has been collected. That data is fetched when the main menu or a level loads, updated when items are collected or used, and committed before level transitions or game-over states.",
          "The level flow uses a central list of scene paths and score requirements. When you finish a level, leftover time converts into score, the game checks whether you have enough score for the next level, and then either loads the next scene or sends you to the level selector. That kept progression explicit and easier to debug.",
          "The powerup system sits on top of the same inventory. Juice items spawn in levels, animate as collectables, and then trigger different player effects through a small action map: speed for apple, fireball ammo for orange, and invincibility for grape.",
          "The weapon system is intentionally simple but useful: the gun stays hidden until picked up when you are at the mars level, rotates toward the mouse, reloads, tracks ammo, shoots bullet or fireball scenes from a barrel marker, and shakes when empty. That gave the boss fight and later levels a different rhythm from pure platforming.",
          "For the Doom Duck, I created it as a boss with health, chase behavior, jumps, spawned enemy ducks, body and head hit detection, rage/golden states, and a Golden Egg spawn on defeat. I created that as the final boss fight moment rather than just another static hazard.",
        ],
      },
      {
        title: "Challenges",
        body: [
          "The main challenge was the hour requirement. To participate in the Juice game jam, you must work at least 100 hours. That said, we had to work at least 2 hours a day since we only had about 2-3 months to complete the game and ship. This resulted in us spending excess time on features that we could have just cut to save time if we were not tracked for our progress; nevertheless, the game still remained fully functional with minimal bugs, and we managed to go to Shanghai for the game jam. ",
          "The hardest part was keeping a jam game from collapsing under its own ideas. A platformer with inventory, score gates, powerups, weapons, teleports, camera sections, menus, and a boss can get messy quickly, especially when scenes are being added in parallel.",
          "Another challenge was state. The player, main scene, level selector, camera, juice menu, and inventory file all need to agree about the current level and current items. We handled that by putting shared values in `Global`, saving inventory to JSON, and re-fetching inventory at important transitions.",
          "A challenge which occurs during collaboration was Git. We all had different ideas on the best way to utilize Git, so we had to spend a lot of time figuring out our Git workflow, such as how we were going to handle version control/branches, how we were going to split up the work, and how we were going to manage the codebase.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "I learned that game development is mostly systems agreeing with each other, and sometimes, collaboration may result in additional challenges and conflicts. The moment we added persistent inventory, every other part of the game had to respect it: pickups, UI labels, death, level completion, score gates, menus, and boss rewards.",
          "I also learned how much polish comes from small transitions. The finish sequence hides the goose, plays a blastoff animation and sound, counts remaining time into score, commits inventory, and then changes level. That kind of sequence makes progress feel earned.",
          "Most of all, SpaceGoose taught me how to ship inside constraints. A jam build does not have infinite time for architecture, but it still needs enough structure that new levels, items, and mechanics can be added without everything becoming impossible to reason about.",
        ],
      },
      {
        title: "Final Result / Current Status",
        body: [
          "SpaceGoose shipped as a playable itch.io game and has an open GitHub repo with source scenes, scripts, assets, export presets, tags, branches, and pull requests. The main branch is tagged through `v1.2.1`, which matches a project that kept getting bug fixes and polish after the earliest jam version.",
          "What worked well was the full game loop: move through levels, collect score items, use powerups, unlock later planets, pick up a weapon, and reach a final Doom Duck encounter. What I would improve next is documentation, scene organization, debug cleanup, and clearer contributor notes so the source is easier for someone new to understand.",
        ],
      },
    ],
    galleryHeading: {
      title: "Gallery",
      centered: true,
    },
    gallery: [
      {
        src: "/img/projects/spacegoose/loading.png",
        alt: "SpaceGoose loading art with the game title in pixel-art style",
        caption: "Loading / title art",
      },
      {
        src: "/img/projects/spacegoose/icon.png",
        alt: "SpaceGoose square app icon",
        caption: "Godot app icon",
      },
      {
        src: "/img/projects/spacegoose/goose-idle.png",
        alt: "Pixel-art idle sprite sheet for the player goose",
        caption: "Player goose sprite",
      },
      {
        src: "/img/projects/spacegoose/doom-duck.png",
        alt: "Pixel-art Doom Duck boss sprite",
        caption: "Doom Duck boss",
      },
      {
        src: "/img/projects/spacegoose/golden-goose.png",
        alt: "Pixel-art Golden Goose sprite",
        caption: "Golden Goose",
      },
      {
        src: "/img/projects/spacegoose/golden-egg.png",
        alt: "Pixel-art Golden Egg sprite",
        caption: "Golden Egg reward",
      },
      {
        src: "/img/projects/spacegoose/applejuice-icon.png",
        alt: "Apple juice powerup icon",
        caption: "Apple juice speed boost",
      },
      {
        src: "/img/projects/spacegoose/orangejuice-icon.png",
        alt: "Orange juice powerup icon",
        caption: "Orange juice fireball reload",
      },
      {
        src: "/img/projects/spacegoose/grapejuice-icon.png",
        alt: "Grape juice powerup icon",
        caption: "Grape juice invincibility",
      },
      {
        src: "/img/projects/spacegoose/moon-sky.png",
        alt: "Moon sky background asset from SpaceGoose",
        caption: "Moon background",
      },
      {
        src: "/img/projects/spacegoose/mars-sky.png",
        alt: "Mars sky background asset from SpaceGoose",
        caption: "Mars background",
      },
      {
        src: "/img/projects/spacegoose/asteroids.png",
        alt: "Asteroid planet selection artwork from SpaceGoose",
        caption: "Asteroid world art",
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
          "The assignment needed at least two distinct lamp designs, so I chose the Mac Pro perforation pattern for the sides and a Noctua fan grille motif for the top and bottom.",
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
          "I imported STL references into Fusion 360, reduced meshes, created mesh-section sketches, exported DXF geometry, scaled and centered it in AutoCAD, then constructed the Mac Pro-inspired hole pattern.",
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
          "For the top and bottom, I converted a Noctua grille model into 2D sketch geometry. For the sides, I adapted J. Peterson's Mac Pro hole math into a 2D approximation.",
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
      "My small form factor (SFF) daily driver in the NCASE M2 — fitting a Ryzen 9 9950X3D and RTX 5070 Ti into a chassis far smaller than a traditional ATX system, while keeping thermals, overclocking, and acoustics in check. Started May 2025, last updated August 24, 2025.",
    links: [
      {
        label: "PCPartPicker list",
        href: "https://pcpartpicker.com/list/CQcvcx",
      },
    ],
    sections: [
      {
        title: "Goal of the build",
        body: [
          "This build documents my small form factor (SFF) daily driver in the NCASE M2 PC case. I chose this platform to balance portability, thermals, and high-end performance in a volume far smaller than a traditional ATX system.",
          "The target: fit a high-performance CPU (9950X3D) and GPU (5070 Ti) combination into a compact chassis while maintaining acceptable thermals, overclocking headroom, and acoustics for software development, gaming, and content creation.",
        ],
      },
      {
        title: "Why these parts",
        body: [
          "A detailed rundown of the components and the reasoning behind each pick. Full pricing is in the parts list above.",
        ],
        bullets: [
          "CPU — AMD Ryzen 9 9950X3D: exceptional multi-threaded performance for gaming and productivity thanks to 16 cores / 32 threads plus the extra 3D V-Cache. AMD's most efficient Ryzen 9 yet, with outstanding performance per watt that can be cooled in an SFF build like this.",
          "CPU Cooler — Corsair iCUE LINK TITAN 280 RX: outstanding silence and performance from its in-house pump design and quiet magnetic RX fans. Being an iCUE LINK product makes cable management easier, and the software is decent.",
          "GPU — Gigabyte Gaming OC RTX 5070 Ti: excellent 1440p/4K ray-traced gaming. This version has one of the best coolers for quiet operation and good overclocking headroom, plus triple RGB rings around the fans that look great when vertically mounted.",
          "Motherboard — ASUS ROG Strix B850-I Gaming WiFi: feature-rich with robust power delivery and extensive connectivity without breaking the bank — one of the best Mini ITX options for compact builds.",
          "RAM — G.Skill Trident Z5 Neo RGB 64GB: high-performance and aesthetically pleasing with customizable RGB. 64GB gives ample headroom for gaming and multitasking, and 6000 MT/s CL30 is the sweet spot for Ryzen 7000/9000 CPUs.",
          "Storage — Samsung 990 Pro (1TB) + Corsair MP700 PRO (2TB): blazing-fast NVMe speeds for quick load times and responsiveness. The MP700 PRO is a good low-cost route to Gen 5 SSD speeds.",
          "Power Supply — Corsair SF850 (2024): a high-quality, fully modular SFX PSU that fits the compact case perfectly. Nothing to complain about besides the cables being a bit long and stiff, but manageable.",
          "Case — NCASE M2: compact and versatile with excellent airflow and cooling potential. Its modular design is easy to work with and accommodates high-end components and large GPUs without issue.",
          "Thermal Paste — Arctic MX-6: high thermal conductivity, easy to apply, and long-lasting — exactly what you want in an SFF build you don't want to re-paste often.",
        ],
      },
      {
        title: "Assembly",
        body: [
          "Build video coming soon. A few notes from putting this one together — the NCASE M2 is a rewarding but tricky case to build in.",
        ],
        bullets: [
          "Read the manual and watch case build videos first to familiarize yourself with the process; this case is difficult to build in.",
          "Cable management is VERY important. Without it, cables can stop the AIO fans from spinning or block airflow, and the interior looks messy with clutter.",
          "If you plan to vertically mount the GPU, buy the PCIe riser cable separately — it is not included with the case.",
        ],
      },
      {
        title: "Overclocking",
        body: [
          "Light overclocking is possible with the 9950X3D and the Gaming OC 5070 Ti even in a case this small.",
          "For the CPU, the motherboard's AI Overclocking does the job well enough — it automatically adjusts PBO settings and the voltage curve to reach a stable overclock while keeping thermals in check.",
          "For the GPU I used MSI Afterburner. ImWateringPSUs has two great step-by-step guides depending on whether you want to prioritize lower temperatures or maximum performance, and der8auer's deep dive covers the card's real overclocking limits:",
        ],
        links: [
          {
            label: "Undervolt for lower temps (ImWateringPSUs)",
            href: "https://www.youtube.com/watch?v=f_GSr-BwaBU",
          },
          {
            label: "Overclock to match a 5080 (ImWateringPSUs)",
            href: "https://www.youtube.com/watch?v=Zw89TEkN974",
          },
          {
            label: "Overclocking limits deep dive (der8auer)",
            href: "https://www.youtube.com/watch?v=_we_cvY2Zto",
          },
        ],
      },
      {
        title: "Performance",
        body: [
          "Runs any Roblox game smoothly at 4K and 240 FPS.",
          "BeamNG.drive runs great, averaging around 100 FPS at 4K Ultra settings.",
        ],
      },
      {
        title: "Future improvements",
        body: [],
        bullets: [
          "Custom-length, individually sleeved PSU cables.",
          "Add two fans under the GPU for better intake and airflow.",
          "Replace the AIO fans with better static-pressure fans.",
          "Tidy up cable management.",
        ],
      },
    ],
    components: {
      heading: "Parts list",
      note: "Prices include shipping, taxes, rebates, and discounts.",
      listHref: "https://pcpartpicker.com/list/CQcvcx",
      rows: [
        {
          type: "CPU",
          item: "AMD Ryzen 9 9950X3D 4.3 GHz 16-Core Processor",
          price: "≈$699.00",
        },
        {
          type: "CPU Cooler",
          item: "Corsair iCUE LINK TITAN 280 RX RGB 94.7 CFM Liquid CPU Cooler",
          price: "≈$179.99",
        },
        {
          type: "Motherboard",
          item: "Asus ROG STRIX B850-I GAMING WIFI Mini ITX AM5 Motherboard",
          price: "≈$349.99",
        },
        {
          type: "Memory",
          item: "G.Skill Trident Z5 Neo RGB 64 GB (2 x 32 GB) DDR5-6000 CL30",
          price: "≈$219.99",
        },
        {
          type: "Storage",
          item: "Samsung 990 Pro 1 TB M.2-2280 PCIe 4.0 X4 NVMe SSD",
          price: "≈$89.99",
        },
        {
          type: "Storage",
          item: "Corsair MP700 PRO 2 TB M.2-2280 PCIe 5.0 X4 NVMe SSD",
          price: "≈$169.99",
        },
        {
          type: "Video Card",
          item: "Gigabyte GAMING OC GeForce RTX 5070 Ti 16 GB Video Card",
          price: "≈$969.99",
        },
        {
          type: "Power Supply",
          item: "Corsair SF850 (2024) 850 W 80+ Platinum Fully Modular SFX",
          price: "≈$224.99",
        },
      ],
      total: "$2903.93",
      totalNote: "Total (without case)",
    },
    changelog: [
      { date: "2025-05-18", note: "Initial assembly & first boot." },
      { date: "2025-06-02", note: "Stable PBO / curve optimizer baseline." },
      { date: "2025-08-24", note: "Documentation page scaffold created." },
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
  kind: "Hackathon" | "Leadership" | "Award" | "Trip" | "Talk" | "Other Events";
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
    desc: 'I built Alien Dating Simulator for a hackathon themed around "shooting for the stars."',
  },
  {
    title: "Dr. Charles Best Secondary School Honours With Distinction",
    date: "2026",
    dateISO: "2026-06-01",
    kind: "Award",
    image: "/img/award/honours%20with%20distinctions.JPG",
    desc: "Received for earning A grades (86%+) in 8+ courses at school.",
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
    desc: "A Hack Club game jam in Shanghai, China, where I built SpaceGoose.",
    href: "/projects/spacegoose/",
  },
  {
    title: "Scrapyard Vancouver 2025",
    date: "March 2025",
    dateISO: "2025-03-15",
    kind: "Hackathon",
    image: "/img/event/scrapyard.png",
    desc: "Hack Club's worldwide build-something-fun hackathon, where I made AI Nerf Gun Aimbot.",
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
    desc: "Citadel Middle School French immersion trip to Québec, Canada.",
  },
  {
    title: "Youth Tech Day 2024",
    date: "September 2024",
    dateISO: "2024-09-07",
    kind: "Other Events",
    image: "/img/event/techday.jpg",
    desc: "Youth Tech Day hosted by Geek Squad, featuring various tech-related activities.",
  },
];

export const stats = [
  { value: 29, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "", label: "Hardware builds" },
  { value: 5, suffix: "", label: "Hackathons & game jams" },
  { value: 8, suffix: "+", label: "Years building" },
];

export const toolbox: { name: string; icon: string }[] = [
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "C++", icon: "⚙️" },
  { name: "HTML / CSS", icon: "🎨" },
  { name: "React", icon: "⚛️" },
  { name: "Godot", icon: "🤖" },
  { name: "Unity", icon: "🎮" },
  { name: "Roblox / Luau", icon: "🟥" },
  { name: "Scratch", icon: "🐱" },
  { name: "AutoCAD", icon: "📐" },
  { name: "OpenSCAD", icon: "📦" },
  { name: "3D Printing", icon: "🖨️" },
  { name: "Git", icon: "🌿" },
];

export const featuredWritings: WritingEntry[] = writingEntries.filter((w) =>
  ["Penciled", "Small Steps for a Climate Crisis", "The Hidden Library"].includes(w.title)
);
