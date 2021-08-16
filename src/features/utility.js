import { apiMethod } from '../configs/constants';
import axios from '../services/axiosInterceptor';

export const dummyRequest = (response) => {
    // console.log("check response", response);
    setTimeout(() => {
      response.onSuccess("ok");
    }, 0);
  };
  
  export const uniquiFileName = (name) => {
    const replaceAbleKey = `limkowing_${
      Date.now() + String(Math.random().toString().slice(2, 4))
    }`;
    const ext = name.split(".").pop();
    return `${replaceAbleKey}.${ext}`;
  };

  export const getFileName = (url) => {
    if (url) {
      var filename = url.substring(url.lastIndexOf('/')+1);
      return filename;
    }
  }

  const readeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  let uploadUrl = `${apiMethod}/marketing.api.uploadImageToken`

  export const getSingleUpload = async (name, type, file, doctype, code) => {
    const fileObj = await readeFile(file)
    const postJson = {
      doctype: doctype,
      docname: code,
      filename: name, // filename
      is_private: 0,
      docfield: type, // document or image
      cmd: 'uploadfile',
      from_form: 1,
      filedata: fileObj // file object
    };
    try {
      let res = await axios.post(uploadUrl, postJson)
        return res.data.message;
    } catch (e) {
      console.log("Err", e);
      return false;
    }
  };
