import React from "react";
import moment from "moment";
import { TaskStateEnum } from "src/models/GlobalModules";

export function sortASCForStrings(a: any, b: any) {
  if (a.stringValue.toLowerCase() < b.stringValue.toLowerCase()) {
    return -1;
  }
  if (a.stringValue.toLowerCase() > b.stringValue.toLowerCase()) {
    return 1;
  }
  return 0;
}

export const convertObjectToFormData = (object: any) => {
  let formData = new FormData();
  for (let key in object) {
    formData.append(key, object[key]);
  }

  return formData;
};

function getExtension(filename: string) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

export const isImage = (filename: string) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "gif":
    case "bmp":
    case "png":
      //etc
      return true;
  }
  return false;
};

export const compareObjects = (
  oldItem: any,
  newItem: any
): { hasChanged: boolean; changedProps: { [x: string]: any } } => {
  let hasChanged = false;
  let changedProps = {};
  Object.keys(newItem).forEach((key) => {
    const propHasChanged = oldItem[key] !== newItem[key];
    hasChanged = hasChanged || propHasChanged;
    if (propHasChanged) {
      changedProps = {
        ...changedProps,
        [key]: newItem[key],
      };
    }
  });
  return {
    hasChanged,
    changedProps,
  };
};
export const imageToUri = (url: any) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let base_image = new Image();
  base_image.src = url;
  base_image.onload = function () {
    canvas.width = base_image.width;
    canvas.height = base_image.height;

    ctx!.drawImage(base_image, 0, 0);

    return canvas.toDataURL("image/png");
  };
};
export const convertDataURLToFile = (
  url: any,
  fileName: string
): Promise<File[]> => {
  const isDataUrl = url.slice(0, 4) === "data";
  const urlTrail = isDataUrl ? "" : "?_=" + new Date().getTime();
  return fetch(url + urlTrail)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      return [new File([blob], fileName, { type: blob.type || "image" })];
    });
};

export const askPermission = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== "granted") {
      throw new Error("We weren't granted permission.");
    }
  });
};

export const sendNotification = (title: string, body: string): void => {
  navigator.serviceWorker.getRegistration().then((registration: any) => {
    const options: NotificationOptions = {
      body,
    };
    registration.showNotification(title, options);
  });
};

export const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

export const getImageURL = (imageURL: string, entityName: string) => {
  return `${process.env.REACT_APP_IMAGE_BASE_URL}${entityName}/${imageURL}`;
};

export const toFixedTwoDec = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const ticksToDateString = (ticks: number, format?: string) => {
  ticks = ticks - 621355968000000000;
  ticks = ticks / 10000;
  return moment(ticks).format(format ?? "DD-MM-YYYY");
};

export const dateStringToTicks = (
  dateString: string,
  playWithStartDate?: boolean
) => {
  const date = new Date(dateString);
  if (playWithStartDate) {
    date.setTime(new Date().getTime());
    date.setMinutes(date.getMinutes() + 2);
  }
  return date.getTime() * 10000 + 621355968000000000;
};
export const dateStringtoTicksMonthly = (dateString: string, type?: string) => {
  let date = new Date(dateString);
  let today = new Date();
  let lastDay: any = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  if (type !== "end") {
    date.setDate(2);
    date.setUTCHours(0, 0, 0);
  } else {
    date.setUTCHours(23, 59, 59);
    if (date.getMonth() < today.getMonth()) {
      date.setDate(lastDay.getDate() + 1);
    } else {
      date.setDate(today.getDate() + 1);
    }
  }

  return date.getTime() * 10000 + 621355968000000000;
};

export const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const arraysEqual = (a: any[], b: any[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

//returns PrevState!
export function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export const firstChartoUpper = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const stateBadgeColor = (state: TaskStateEnum): string => {
  switch (state) {
    case TaskStateEnum.started:
      return "gray";
    case TaskStateEnum.inProgress:
      return "yellow";
    case TaskStateEnum.done:
      return "green";
    case TaskStateEnum.overDue:
      return "red";
    default:
      return "gray";
  }
};
