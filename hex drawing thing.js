        var regionBorder = [
            convertPixelToLeaflet(regionCenter['x']-mapWidth/2, regionCenter['y']),
            convertPixelToLeaflet(regionCenter['x']-mapWidth/4,regionCenter['y']+mapHeight/2  ),
            convertPixelToLeaflet(regionCenter['x']+mapWidth/4, regionCenter['y']+mapHeight/2 ),
            convertPixelToLeaflet(regionCenter['x']+mapWidth/2,regionCenter['y']),
            convertPixelToLeaflet(regionCenter['x']+mapWidth/4,regionCenter['y']-mapHeight/2 ),
            convertPixelToLeaflet(regionCenter['x']-mapWidth/4,regionCenter['y']-mapHeight/2 ),
            ];

            L.polygon(regionBorder, {
            color: "black",
            opacity: 0.2,
            fillOpacity: 0,
            //pane:'regionLabelsPane'
            }).addTo(map);