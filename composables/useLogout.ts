// It will be available as useFoo() (camelCase of file name without extension)
import {getActivePinia} from "pinia"
export default async function () {
  const toast = useToast();
    getActivePinia()!._s.forEach(store => store.$reset());
    await navigateTo("/")
    toast.add({
      title: "Success",
      description: "Signed out successfully",
      timeout: 1000,
  });
  }