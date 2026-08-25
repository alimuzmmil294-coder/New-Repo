import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import pic from "./assets/hero.png";
import { firstImage } from "./features/imageSlice";

const App = () => {
  const image = useSelector((state) => state.gallary.image);
  console.log(image);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firstImage(pic));
  }, [dispatch]);

  return (
    <div>
      <img src={image} alt="Image...." />
    </div>
  );
};

export default App;
