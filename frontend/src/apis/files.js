import { toast } from "sonner";


export const uploadFiles = async ({files,sheetName})=>{
    console.log(files);

    const formData  = new FormData();
    formData.append('files', files[0]);
    formData.append('files', files[1]);
    formData.append('sheetName', sheetName);
  try {
    const response = await fetch('http://localhost:3000/api/files/upload', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);
    return data
    
  } catch (error) {
    console.log(error);
    toast.error(error.message|| "Something went wrong")
  }
}