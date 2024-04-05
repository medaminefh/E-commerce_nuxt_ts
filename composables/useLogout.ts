// It will be available as useFoo() (camelCase of file name without extension)
import {getActivePinia} from "pinia"
export default async function () {
    getActivePinia()!._s.forEach(store => store.$reset());
    await navigateTo("/")
  }