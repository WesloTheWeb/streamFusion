# ABOUT LEARNING
This is a markdown file that comprises of my learning of media encoding libraries and technology. This project was
purposefully small in scope with an emphasis on embedded media streaming libaries -- both of which I do not normally
use but have always had an interest in streaming.

I am happy to share my learnings. I will try to keep this as up-to-date as possible, as well as fact checked and
reviewed by AI to ensure accuracy and stick to the point.

## Library Terms
1. HLS (HTTP Live Streaming): Used by both YouTube and Twitch. YouTube offers HLS streams for their live content, and Twitch uses HLS as their primary streaming protocol. Many VODs (Video On Demand) from both platforms are also available in HLS format.

2. DASH (Dynamic Adaptive Streaming over HTTP): Used primarily by YouTube for their on-demand content. Twitch has historically used HLS more, but they may support DASH in some contexts as well.


## API Rules
1. Apparently YouTube only allows playback through:
- Their own embedded player (iframe)
- Their official APIs
So I had to create a YouTube component with the iFrame

## General
- A lot goes on into codec and media players especially switching between formats.