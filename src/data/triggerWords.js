const dimSumDishArray = [
  {
    name: "Siu Mai",
    alt_name: "Shu Mai",
    machine_name: "siu_mai",
    description: "Ground pork and shrimp in egg wrap.",
    menu_price: 1.0,
  },
  {
    name: "Ha Gow",
    alt_name: "Shrimp Dumpling",
    machine_name: "ha_gow",
    description: "Shrimp in clear wrap.",
    menu_price: 1.15,
  },
  {
    name: "Ham Sui Gok",
    alt_name: "Fried Ground Pork Gluten Ball",
    machine_name: "ham_sui_gok",
    description: "Ground pork and shrimp in deep fried gluten ball.",
    menu_price: 1.25,
  },
  {
    name: "Lo Bok Go",
    alt_name: "Turnip Cake",
    machine_name: "lo_bok_go",
    description: "Turnip in a rectangular shape.",
    menu_price: 1.35,
  },
  {
    name: "Wu Gok",
    alt_name: "Taro Dumpling",
    machine_name: "wu_gok",
    description: "Deep fried taro dumpling.",
    menu_price: 1.45,
  },
  {
    name: "Chun Gun",
    alt_name: "Shrimp Egg Roll",
    machine_name: "chun_gun",
    description: "Fried shrimp egg roll.",
    menu_price: 1.5,
  },
];

const triggerWordsArray = ["kylan", "gabujeeno", "tree of wisdom", "gorf"];
const foodWordsArray = ["pho", "bbh", "eggroll", "lumpia"];
const commandsArray = ["/list dimsum"];

const dimSumWordsArray = dimSumDishArray.map((item) => item.name);

export {
  dimSumDishArray,
  triggerWordsArray,
  foodWordsArray,
  dimSumWordsArray,
  commandsArray,
};
