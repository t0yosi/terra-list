import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: null,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setFormData((prevState) => ({
        ...prevState,
        userRef: currentUser._id,
      }));
    }
  }, [currentUser]);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          toast.dismiss();
          toast.success("Image submitted successfully", {
            autoClose: 3000,
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          toast.dismiss();
          toast.error("Image upload failed (2 mb max per image)", {
            autoClose: 3000,
          });
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          toast.error("Error uploading image", {
            autoClose: 3000,
          });
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
          toast.dismiss();
          toast.success("Image uploaded successfully!", {
            autoClose: 3000,
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
    toast.dismiss();
    toast.success("Image successfully removed", {
      autoClose: 3000,
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        toast.dismiss();
        toast.error(data.message, {
          autoClose: 3000,
        });
        console.log(data);
        return;
      }
      toast.dismiss();
      toast.success("Listing Created successfully!", {
        autoClose: 3000,
      });
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      toast.dismiss();
      toast.error(error.message, {
        autoClose: 3000,
      });
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {/* Header Row */}
      <div className="flex justify-center p-3 pb-0 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Register Your Property With Us And Be Confident That It Will Be Filled
          Out!
        </h3>
      </div>

      {/* Card Row */}
      <div className="flex justify-center p-4">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          {/* Card Title */}
          <div className="mb-6 text-center">
            <h4 className="text-2xl uppercase font-bold text-purple-600">
              Add A New Property
            </h4>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-8"
          >
            {/* Left Column */}
            <div className="flex flex-col gap-6 flex-1">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="name"
                maxLength="62"
                minLength="10"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                placeholder="Description"
                className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
              <div className="flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={handleChange}
                    checked={formData.type === "sale"}
                  />
                  <label htmlFor="sale" className="text-gray-700">
                    Sell
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={handleChange}
                    checked={formData.type === "rent"}
                  />
                  <label htmlFor="rent" className="text-gray-700">
                    Rent
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <label htmlFor="parking" className="text-gray-700">
                    Parking spot
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <label htmlFor="furnished" className="text-gray-700">
                    Furnished
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <label htmlFor="offer" className="text-gray-700">
                    Offer
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <p className="text-gray-700">Beds</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <p className="text-gray-700">Baths</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-gray-700">Regular price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs text-orange-500">
                        ($ / month)
                      </span>
                    )}
                  </div>
                </div>
                {formData.offer && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="discountedPrice"
                      min="0"
                      max="10000000"
                      required
                      className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-gray-700">Discounted price</p>
                      {formData.type === "rent" && (
                        <span className="text-xs text-gray-500">
                          ($ / month)
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col flex-1 gap-6">
              <p className="font-semibold text-gray-800">
                Images:
                <span className="font-normal text-orange-600 ml-2">
                  The first image will be the cover
                </span>
                <span className="font-normal text-gray-800 ml-2">
                  (max 6)
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-3 text-green-800 bg-white/70 rounded-lg uppercase hover:bg-green-700 disabled:opacity-80 border border-green-800 hover:text-white hover:border-white/50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {imageUploadError && (
                <p className="text-red-500 text-sm">{imageUploadError}</p>
              )}
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-2 text-red-600 bg-red-100 rounded-lg uppercase hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              <button
                disabled={loading || uploading}
                className="p-3 bg-purple-600 text-white rounded-lg uppercase hover:bg-white hover:text-purple-600 hover:border hover:border-purple-700 disabled:opacity-80"
              >
                {loading ? "Creating..." : "Create listing"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
