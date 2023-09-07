export function getRandomArrayItem(array) {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function record(canvas, time = 4000) {
  const recordedChunks = [];

  return new Promise(function (res, rej) {
    // function makeScreenshot() {
    //   function base64ToBlob(base64String, contentType) {
    //     const base64WithoutPrefix = base64String.replace(
    //       /^data:[^;]+;base64,/,
    //       ""
    //     );

    //     const binaryData = atob(base64WithoutPrefix);

    //     const array = new Uint8Array(binaryData.length);

    //     for (let i = 0; i < binaryData.length; i++) {
    //       array[i] = binaryData.charCodeAt(i);
    //     }

    //     return new Blob([array], { type: contentType });
    //   }

    //   const base64String = canvas.current.toDataURL("image/png");

    //   const blob = base64ToBlob(base64String, "image/png");

    //   return URL.createObjectURL(blob);
    // }

    // // res(makeScreenshot());

    // const screenShots = [];

    // const animFrame = setInterval(() => {
    //   screenShots.push(canvas.current.toDataURL("image/png"));
    // }, 1000 / 40);

    // setTimeout(() => {
    //   clearInterval(animFrame);
    //   alert(screenShots.length);
    // }, 1000);

    const mimeTypes = getAvailableVideoTypesAndCodecs();

    if (!mimeTypes.length) {
      rej("Browser has unsupported video format");
    }
    const stream = canvas.current.captureStream(25 /*fps*/);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mimeTypes[0].mediaType,
    });

    mediaRecorder.start(time);

    mediaRecorder.ondataavailable = function (event) {
      recordedChunks.push(event.data);

      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    };

    mediaRecorder.onstop = function () {
      try {
        const blob = new Blob(recordedChunks, { type: mimeTypes[0].type });

        const url = URL.createObjectURL(blob);
        res(url);
      } catch (err) {
        rej(err.message);
      }
    };
  });
}

export function getAvailableVideoTypesAndCodecs() {
  const mediaTypes = [
    ["video/webm", "codecs=vp8", "webm"],
    ["video/mp4", "codecs=avc1.42E01E", "mp4"],
    ["video/webm", "codecs=vp9", "webm"],
  ];
  const supportedTypesAndCodecs = mediaTypes.filter((mediaType) =>
    MediaRecorder.isTypeSupported(`${mediaType[0]}; ${mediaType[1]}`)
  );

  return supportedTypesAndCodecs.map((mediaType) => ({
    mediaType: `${mediaType[0]}; ${mediaType[1]}`,
    codec: mediaType[1],
    type: mediaType[0],
    extension: mediaType[2],
  }));
}

export function isIphone() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
