export type MusicTrack = {
  title: string;
  src: string;
  /**
   * Optional cover-art override. When omitted, the player looks for a
   * matching image in public/music/art/ (same basename as the track, .jpg)
   * — these are extracted from each MP3's embedded cover — and falls back to
   * a placeholder if none is found.
   */
  art?: string;
};

/**
 * Playlist for the mini player. Add MP3s to public/music/tracks/ and
 * list them here, e.g.
 *   { title: "Track Name", src: "/music/tracks/track-name.mp3" },
 * The player only renders when this list is non-empty.
 */
export const musicTracks: MusicTrack[] = [
  { title: "Welcome To The Party and Slaughter Music Box-Destiny mashup  (Tower Defense Simulator x Arsenal)", src: "/music/tracks/Website - 001 - Welcome To The Party and Slaughter Music Box-Destiny mashup  (Tower Defense Simulator x Arsenal).mp3" },
  { title: "(Remix) Block Tales OST - Bigfoot", src: "/music/tracks/Website - 002 - (Remix) Block Tales OST - Bigfoot.mp3" },
  { title: "(Remix) The Diluvian Mechanism - Deepwoken", src: "/music/tracks/Website - 003 - (Remix) The Diluvian Mechanism - Deepwoken.mp3" },
  { title: "Forlorn", src: "/music/tracks/Website - 004 - Forlorn.mp3" },
  { title: "Battle Against A True Hero", src: "/music/tracks/Website - 005 - Battle Against A True Hero.mp3" },
  { title: "His Theme", src: "/music/tracks/Website - 006 - His Theme.mp3" },
  { title: "Death By Glamour", src: "/music/tracks/Website - 007 - Death By Glamour.mp3" },
  { title: "Can You Really Call This A Hotel, I Didn't Receive A Mint On My Pillow Or Anything", src: "/music/tracks/Website - 008 - Can You Really Call This A Hotel, I Didn't Receive A Mint On My Pillow Or Anything.mp3" },
  { title: "Catswing", src: "/music/tracks/Website - 009 - Catswing.mp3" },
  { title: "Hammer of Justice", src: "/music/tracks/Website - 010 - Hammer of Justice.mp3" },
  { title: "Castle Funk", src: "/music/tracks/Website - 011 - Castle Funk.mp3" },
  { title: "Ruder Buster", src: "/music/tracks/Website - 012 - Ruder Buster.mp3" },
  { title: "Pandora Palace", src: "/music/tracks/Website - 013 - Pandora Palace.mp3" },
  { title: "My Castle Town", src: "/music/tracks/Website - 014 - My Castle Town.mp3" },
  { title: "Rude Buster", src: "/music/tracks/Website - 015 - Rude Buster.mp3" },
  { title: "Scarlet Forest", src: "/music/tracks/Website - 016 - Scarlet Forest.mp3" },
  { title: "Field of Hopes and Dreams", src: "/music/tracks/Website - 017 - Field of Hopes and Dreams.mp3" },
  { title: "PLACE TO BE - YELETEZ | PHIGHTING OST", src: "/music/tracks/Website - 018 - PLACE TO BE - YELETEZ | PHIGHTING OST.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Duck Hunting", src: "/music/tracks/Website - 019 - (Official) Tower Defense Simulator OST - Duck Hunting.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Subzero (Frost Spirit Theme)", src: "/music/tracks/Website - 020 - (Official) Tower Defense Simulator OST - Subzero (Frost Spirit Theme).mp3" },
  { title: "EARTHQUAKE", src: "/music/tracks/Website - 021 - EARTHQUAKE.mp3" },
  { title: "GRAIN OF PAIN", src: "/music/tracks/Website - 022 - GRAIN OF PAIN.mp3" },
  { title: "THE MOST WANTED", src: "/music/tracks/Website - 023 - THE MOST WANTED.mp3" },
  { title: "Hardcore Collapes - Hardcore Boss and Universal Collapes mashup (Tower Defense Simulator x Terraria)", src: "/music/tracks/Website - 024 - Hardcore Collapes - Hardcore Boss and Universal Collapes mashup (Tower Defense Simulator x Terraria).mp3" },
  { title: "(Official) Tower Defense Simulator OST - Totality (Umbra's Theme)", src: "/music/tracks/Website - 025 - (Official) Tower Defense Simulator OST - Totality (Umbra's Theme).mp3" },
  { title: "(Official) Tower Defense Simulator OST - It's Getting Frosty", src: "/music/tracks/Website - 026 - (Official) Tower Defense Simulator OST - It's Getting Frosty.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Equinox (Awakened Fallen King Theme)", src: "/music/tracks/Website - 027 - (Official) Tower Defense Simulator OST - Equinox (Awakened Fallen King Theme).mp3" },
  { title: "(Official) Tower Defense Simulator OST - Betrayal", src: "/music/tracks/Website - 028 - (Official) Tower Defense Simulator OST - Betrayal.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Heresy! (Executioner's Theme)", src: "/music/tracks/Website - 029 - (Official) Tower Defense Simulator OST - Heresy! (Executioner's Theme).mp3" },
  { title: "(Official) Tower Defense Simulator OST - Gun Slinging Madness (Gunslinger's Theme)", src: "/music/tracks/Website - 030 - (Official) Tower Defense Simulator OST - Gun Slinging Madness (Gunslinger's Theme).mp3" },
  { title: "(Official) Tower Defense Simulator OST - Charleston", src: "/music/tracks/Website - 031 - (Official) Tower Defense Simulator OST - Charleston.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Wox The Fox Theme", src: "/music/tracks/Website - 032 - (Official) Tower Defense Simulator OST - Wox The Fox Theme.mp3" },
  { title: "(Remix REMAKE) (Instrumental) Block Tales OST - Cruel King", src: "/music/tracks/Website - 033 - (Remix REMAKE) (Instrumental) Block Tales OST - Cruel King.mp3" },
  { title: "SEE YOU ON", src: "/music/tracks/Website - 034 - SEE YOU ON.mp3" },
  { title: "CALL OF THE HEIGHTS", src: "/music/tracks/Website - 035 - CALL OF THE HEIGHTS.mp3" },
  { title: "ALLEGRO ESPRESSO", src: "/music/tracks/Website - 036 - ALLEGRO ESPRESSO.mp3" },
  { title: "(Concept) Phantom's Cataclysm OST- Drink 'N Draw - Deadeye's theme", src: "/music/tracks/Website - 037 - (Concept) Phantom's Cataclysm OST- Drink 'N Draw - Deadeye's theme.mp3" },
  { title: "Doors OST -  Here I Come (Bendy DRD remix)", src: "/music/tracks/Website - 038 - Doors OST -  Here I Come (Bendy DRD remix).mp3" },
  { title: "Phighting OST - The Flipside (Remix)", src: "/music/tracks/Website - 039 - Phighting OST - The Flipside (Remix).mp3" },
  { title: "Phighting OST - Dueling Winds (Remix)", src: "/music/tracks/Website - 040 - Phighting OST - Dueling Winds (Remix).mp3" },
  { title: "RETIREMENT FUNDS", src: "/music/tracks/Website - 041 - RETIREMENT FUNDS.mp3" },
  { title: "TURBULENCE", src: "/music/tracks/Website - 042 - TURBULENCE.mp3" },
  { title: "SIX FEET UNDER", src: "/music/tracks/Website - 043 - SIX FEET UNDER.mp3" },
  { title: "HOSTEL TAKEOVER", src: "/music/tracks/Website - 044 - HOSTEL TAKEOVER.mp3" },
  { title: "IRON HORSE", src: "/music/tracks/Website - 045 - IRON HORSE.mp3" },
  { title: "Ehyu Ahnida", src: "/music/tracks/Website - 046 - Ehyu Ahnida.mp3" },
  { title: "\"Undertow\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick", src: "/music/tracks/Website - 047 - \"Undertow\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick.mp3" },
  { title: "\"Gum by the Fire\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick", src: "/music/tracks/Website - 048 - \"Gum by the Fire\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick.mp3" },
  { title: "\"Snow Bubbles\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick", src: "/music/tracks/Website - 049 - \"Snow Bubbles\" Roblox, Bubble Gum Simulator - (Original Soundtrack) by BSlick.mp3" },
  { title: "Flower Castle", src: "/music/tracks/Website - 050 - Flower Castle.mp3" },
  { title: "Garden of Hopes and Dreams", src: "/music/tracks/Website - 051 - Garden of Hopes and Dreams.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Wave 45 Theme", src: "/music/tracks/Website - 052 - (Official) Tower Defense Simulator OST - Wave 45 Theme.mp3" },
  { title: "ASGORE (tacto flip)", src: "/music/tracks/Website - 053 - ASGORE (tacto flip).mp3" },
  { title: "RUDE BUSTER (Arrangement)", src: "/music/tracks/Website - 054 - RUDE BUSTER (Arrangement).mp3" },
  { title: "(Remix???) Tower Defense Simulator OST - Skibidi, but I made it better.", src: "/music/tracks/Website - 055 - (Remix???) Tower Defense Simulator OST - Skibidi, but I made it better..mp3" },
  { title: "(Remix - Instrumental Version) Dummies vs Noobs OST -  Imperishable Valour - Sparta's theme", src: "/music/tracks/Website - 056 - (Remix - Instrumental Version) Dummies vs Noobs OST -  Imperishable Valour - Sparta's theme.mp3" },
  { title: "(Remix) Tower Defense Simulator OST - Gold Titan", src: "/music/tracks/Website - 057 - (Remix) Tower Defense Simulator OST - Gold Titan.mp3" },
  { title: "(Remix remake) (25k Special, Part 1) Tower Defense Simulator OST - Raze The Void", src: "/music/tracks/Website - 058 - (Remix remake) (25k Special, Part 1) Tower Defense Simulator OST - Raze The Void.mp3" },
  { title: "(Remix REMAKE) Dummies vs Noobs OST - Powerplay - Hermes' theme", src: "/music/tracks/Website - 059 - (Remix REMAKE) Dummies vs Noobs OST - Powerplay - Hermes' theme.mp3" },
  { title: "TIX BLASTERZ - KEY AFTER KEY | PHIGHTING OST", src: "/music/tracks/Website - 060 - TIX BLASTERZ - KEY AFTER KEY | PHIGHTING OST.mp3" },
  { title: "caffeine rush", src: "/music/tracks/Website - 061 - caffeine rush.mp3" },
  { title: "Naktigonis - Sin-Smelted Scoriae (Deepwoken OST)", src: "/music/tracks/Website - 062 - Naktigonis - Sin-Smelted Scoriae (Deepwoken OST).mp3" },
  { title: "(Official) Tower Defense Simulator OST - Liminal Oblivion", src: "/music/tracks/Website - 063 - (Official) Tower Defense Simulator OST - Liminal Oblivion.mp3" },
  { title: "(Official) Tower Defense Simulator OST - Lunar Overture", src: "/music/tracks/Website - 064 - (Official) Tower Defense Simulator OST - Lunar Overture.mp3" },
  { title: "Forgotten Dreams", src: "/music/tracks/Website - 065 - Forgotten Dreams.mp3" },
  { title: "Espresso", src: "/music/tracks/Website - 066 - Espresso.mp3" },
  { title: "Determination", src: "/music/tracks/Website - 067 - Determination.mp3" },
  { title: "Bossa Break!", src: "/music/tracks/Website - 068 - Bossa Break!.mp3" },
  { title: "Naktigonis - Oscillation (Deepwoken OST)", src: "/music/tracks/Website - 069 - Naktigonis - Oscillation (Deepwoken OST).mp3" },
  { title: "Nuvole bianche", src: "/music/tracks/Website - 070 - Nuvole bianche.mp3" },
];
