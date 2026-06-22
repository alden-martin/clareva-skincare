import React from "react";

function Heading({ subHeading, mainHeading , container="" }) {
  return (
    <div className={container}>
      <h6 className="text-primary uppercase text-sm font-light">
        {" "}
        - {subHeading}
      </h6>
      <h1
        className="text-7xl italic font-bold"
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      />
    </div>
  );
}

export default Heading;
