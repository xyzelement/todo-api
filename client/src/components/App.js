import React from "react";
//import Header from "./Header";

export default props => {
  // props is whatever component is being passed into here from index
  return (
    <div>
      {/*<Header />*/}
      {props.children}
    </div>
  );
};
