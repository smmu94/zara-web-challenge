import { ProductDetailsBody } from "@services/details/types";

export const getSpecContent = (product: ProductDetailsBody) => [
  {title: "BRAND", description: product.brand},  
  {title: "NAME", description: product.name},    
  {title: "DESCRIPTION", description: product.description},    
  {title: "SCREEN", description: product.specs.screen},    
  {title: "RESOLUTION", description: product.specs.resolution},    
  {title: "PROCESSOR", description: product.specs.processor},    
  {title: "MAIN CAMERA", description: product.specs.mainCamera},    
  {title: "SELFIE CAMERA", description: product.specs.selfieCamera},    
  {title: "BATTERY", description: product.specs.battery},    
  {title: "OS", description: product.specs.os},    
  {title: "SCREEN REFRESH RATE", description: product.specs.screenRefreshRate},  
];