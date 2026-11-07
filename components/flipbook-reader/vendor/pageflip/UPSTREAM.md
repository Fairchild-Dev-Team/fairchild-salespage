# page-flip (StPageFlip)

- Package: `page-flip` 2.0.7 (MIT)
- Upstream: https://github.com/Nodlik/StPageFlip
- Used via a local React wrapper in `src/viewer/FlipbookViewer.tsx` instead of `react-pageflip`.
- `showCover: true` in spread mode so page 1 opens alone as the front cover and the last page is the back cover.
- No blank filler pages are inserted; PDF pages map 1:1.
- Reader always starts on page 1 (front cover) unless `initialPage` is set.
- Do not call `updateFromHTML` when the render window moves; page shells stay mounted.
