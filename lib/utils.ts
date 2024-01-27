import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const  formUrlQuery =({params , key , value} :  {params:string, key:string, value:string | null} ) =>{
  const currentUrl = qs.parse(params)
  currentUrl[key] = value;
  return qs.stringifyUrl({
    url : window.location.pathname,
    query : currentUrl
  },{skipNull  : true})
}

export  const  removeKeyFromUrl  =({params , keysToRemove} :  {params:string, keysToRemove:string[]} ) =>{
  const currentUrl = qs.parse(params)
  keysToRemove.forEach(key => delete currentUrl[key])
  return qs.stringifyUrl({
    url : window.location.pathname,
    query : currentUrl
  },{skipNull  : true})
}