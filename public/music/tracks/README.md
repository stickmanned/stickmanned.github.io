# Playlist tracks

Put MP3 files in this folder, then add them to `musicTracks` in
`lib/music.ts`:

```ts
export const musicTracks: MusicTrack[] = [
  { title: "My Song", src: "/music/tracks/my-song.mp3" },
];
```

The mini player stays hidden until at least one track is registered.
