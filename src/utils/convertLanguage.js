export const convertLanguage = (language) => {
  switch (language) {
    case "Arabic":
      return "ar";
    case "Assamese":
      return "as";
    case "Bengali":
      return "bn";
    case "Dutch":
      return "nl";
    case "English":
      return "en";
    case "French":
      return "fr";
    case "German":
      return "de";
    case "Gujarati":
      return "gu";
    case "Hindi":
      return "hi";
    case "Italian":
      return "it";
    case "Japanese":
      return "ja";
    case "Kannada":
      return "kn";
    case "Kashmiri":
      return "ks";
    case "Korean":
      return "ko";
    case "Malayalam":
      return "ml";
    case "Mandarin Chinese":
      return "zh";
    case "Marathi":
      return "mr";
    case "Persian":
      return "fa";
    case "Portuguese":
      return "pt";
    case "Punjabi":
      return "pa";
    case "Russian":
      return "ru";
    case "Sanskrit":
      return "sa";
    case "Spanish":
      return "es";
    case "Swahili":
      return "sw";
    case "Tamil":
      return "ta";
    case "Telugu":
      return "te";
    case "Thai":
      return "th";
    case "Turkish":
      return "tr";
    case "Urdu":
      return "ur";
    case "Vietnamese":
      return "vi";
    default:
      return "Language not found";
  }
};
