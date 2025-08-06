export const getSupportedImageTypes = (type = "all") => {
  if (type === "all") {
    return {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/tiff': ['.tif', '.tiff'],
      'application/dicom': ['.dcm'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/zip': ['.zip'],
    };
  }

  if (type === "images") {
    return {
      "image/*": [],
    };
  }

  if (type === "docs") {
    return {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "text/plain": [],
    };
  }

  if (type === "pdf") {
    return {
      "application/pdf": [],
    };
  }

  return {};
};

export const getMediaType = (file) => {
  // types: images: all images, docs: pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, other: all other files
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg+xml",
    "image/webp",
    "jpeg",
    "png",
    "jpg",
    "svg+xml",
    "webp",
  ];
  const docTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];
  const videoTypes = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/webm",
    "video/mkv",
    "video/3gp",
    "video/ogg",
    "mp4",
    "avi",
    "mov",
    "wmv",
    "flv",
    "webm",
    "mkv",
    "3gp",
    "ogg",
  ];

  if (imageTypes.includes(file.type || file)) {
    return "images";
  }
  if (docTypes.includes(file.type || file)) {
    return "docs";
  }
  if (videoTypes.includes(file.type || file)) {
    return "photo"; // Using photo category for videos as per existing logic
  }
  return "photo";
};

export const uploadImages = async (images, token, Post) => {
  if (!images.length) return null;
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('media', image);
  });

  try {
    const res = await Post({
      route: `media/upload`,
      data: formData,
      isFormData: true,
    });
    if (res) {
      console.log("🚀 ~ uploadImages ~ res:", res)
      return res.response?.data?.media;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }

  return null;
};

export const uploadImagesHelper = async ({
  images,
  setIsLoading,
  loadingType,
  setMedia,
  token,
  Post
}) => {
  if (images.length === 0) return [];

  setIsLoading(loadingType);
  uploadImages(images, token, Post)
    .then((res) => {
      if (res) {
        setMedia(res);
      } else {
        setMedia([]);
      }
      setIsLoading("");
    })
    .catch((error) => {
      console.error("Upload error:", error);
      setMedia([]);
      setIsLoading("");
    });
};