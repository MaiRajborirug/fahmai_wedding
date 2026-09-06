const morningConfig = window.WEDDING_CONFIG;

window.WEDDING_CONFIG = Object.freeze({
  ...morningConfig,
  weddingDate: "2026-11-14T17:00:00+07:00",
  calendarFile: "./wedding-evening.ics",
  rsvpUrl: "https://forms.gle/ecHCnAM5dsDG1SSv8",
  venues: [
    {
      name: "Sailom Sangdad Homey Studio",
      address: "Sailom Sangdad Homey Studio",
      mapEmbedUrl: [
        "https://www.google.com/maps?q=13.8447731%2C100.64823",
        "&z=17&output=embed",
      ].join(""),
      directionsUrl: [
        "https://www.google.com/maps/place/Sailom+Sangdad+Homey+Studio/",
        "@13.8447731,100.6456497,17z/data=!3m1!4b1!4m6!3m5",
        "!1s0x311d632846750029:0xdb609a0841af2afe!8m2!3d13.8447731",
        "!4d100.64823!16s%2Fg%2F11fmrkgwqs?entry=ttu",
        "&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
      ].join(""),
    },
  ],
});
