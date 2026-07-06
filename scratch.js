function getConstellationLayout(viewportWidth) {
  if (viewportWidth < 760) return { scale: 0, opacity: 0 };
  
  const containerMaxWidth = 1180;
  const leftMargin = viewportWidth > containerMaxWidth ? (viewportWidth - containerMaxWidth) / 2 : 0;
  const leftPadding = Math.max(18, Math.min(44, viewportWidth * 0.04));
  const textWidth = 625;
  
  const textRightEdge = leftMargin + leftPadding + textWidth + 20; // 20px safety buffer
  
  const projectRadius = 380; 
  const rightPadding = 30;
  
  let scale = (viewportWidth - textRightEdge - rightPadding) / (projectRadius * 2);
  
  if (scale > 1) scale = 1;
  if (scale < 0.6) return { scale: 0, opacity: 0 };
  
  const centerX = viewportWidth - rightPadding - (projectRadius * scale);
  
  return { centerX, scale, opacity: 1, textRightEdge };
}

for (let w = 1920; w >= 700; w -= 10) {
  const layout = getConstellationLayout(w);
  if (layout.opacity > 0) {
    const leftEdge = layout.centerX - 380 * layout.scale;
    const actualTextEdge = layout.textRightEdge - 20; // actual text edge without buffer
    
    if (leftEdge < actualTextEdge) {
      console.log(`OVERLAP at W=${w}! LeftEdge=${leftEdge}, TextRightEdge=${actualTextEdge}`);
    } else {
      console.log(`OK at W=${w}. LeftEdge=${leftEdge}, TextEdge=${actualTextEdge}, Scale=${layout.scale.toFixed(2)}, CenterX=${layout.centerX.toFixed(0)}`);
    }
  } else {
    console.log(`HIDDEN at W=${w}`);
  }
}
