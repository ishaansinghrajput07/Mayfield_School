// Single source of truth for the school's public identity. Everything shown on
// the public site, login pages and ID cards reads from here. Text only - no
// backend behaviour depends on these values.
export const SCHOOL = {
  name: "Mayfield Global School",
  short: "Mayfield Global",
  motto: "Knowledge is Power",
  locality: "Neora (Patna)",
  city: "Patna",
  state: "Bihar",
  established: 2015,
  board: "CBSE",
  classes: "Nursery to Class XII",
  coEd: true,
  trust: "Nandan Prashant Educational Trust",
  principal: "Mr. Nishant Singh",
  affiliationNo: "330935",
  udise: "10280701603",
  schoolCode: "66654",
  address: {
    line1: "Neora Ganjpar, Sarai Neoraganj Road",
    city: "Patna",
    state: "Bihar",
    pin: "801113",
  },
  phones: [
    { display: "+91 94725 97721", tel: "+919472597721" },
    { display: "+91 98352 18820", tel: "+919835218820" },
    { display: "+91 84099 75011", tel: "+918409975011" },
  ],
  emails: ["mayfieldglobalschoolpatna@gmail.com", "mgschoolpatna17@gmail.com"],
  website: "www.mayfieldglobalschool.com",
  whatsapp: "919472597721",
  social: {
    facebook: "https://www.facebook.com/search/top?q=Mayfield%20Global%20School%20Patna",
    instagram: "https://www.instagram.com/mgspatna66654/",
    instagramHandles: ["@mgspatna66654", "@mgspatna330935"],
    youtube: "https://www.youtube.com/results?search_query=MAYFIELD+GLOBAL+SCHOOL",
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Mayfield+Global+School+Neora+Ganjpar+Patna&t=&z=14&ie=UTF8&iwloc=&output=embed",
};

export const fullAddress = `${SCHOOL.address.line1}, ${SCHOOL.address.city}, ${SCHOOL.address.state} ${SCHOOL.address.pin}`;
