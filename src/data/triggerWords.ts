import { fetchDimSumData } from "../services/supabaseService";

const dimSumDishArray = async () => {
  const data = await fetchDimSumData();

  const dimSumEnglishWordsArray = data?.map((item) => item.alt_name);

  const dimSumWordsArray = data?.map((item) => item.name).concat(dimSumEnglishWordsArray);
  // console.log('data', data);
  // console.log('words', dimSumWordsArray);



  return {
    data,
    dimSumWordsArray
  }
}

const dimSumWordsArray = async () => {
  const { dimSumWordsArray } = await dimSumDishArray();
  return dimSumWordsArray
};

const triggerWordsArray = ["kylan", "gabujeeno", "tree of wisdom", "gorf"];
const foodWordsArray = ["pho", "bbh", "eggroll", "lumpia"];
const commandsArray = ["/list dimsum"];


export {
  dimSumDishArray,
  dimSumWordsArray,
  triggerWordsArray,
  foodWordsArray,
  commandsArray,
};
