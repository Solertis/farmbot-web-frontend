var oldCache = localStorage && localStorage["FARMBOT_DESIGNER_CACHE"];
if (oldCache) {
  export var initialState = JSON.parse(oldCache)
} else {
  export var initialState = {
      leftMenu: {
        component: 'PlantInventory',
        tab:       'Plants'
      },
      global: {
        plants: [],
        planting_area: {
                         _id: "56154f3e766f6c5789020000",
                         device_id: "56154f2f766f6c5789010000",
                         length: 300,
                         width: 600
                       },
        selectedPlant: {}
      }
    };
}

