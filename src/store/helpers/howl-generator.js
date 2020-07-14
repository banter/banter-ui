import { Howl } from 'howler';

export default function generateHowl(discussion) {
  const { episodePlaybackUrl, startTimeMillis, endTimeMillis } = discussion;

  return new Howl({
    html5: true,
    src: episodePlaybackUrl,
    sprite: {
      clip: [startTimeMillis, (endTimeMillis - startTimeMillis)],
    },
  });
}
