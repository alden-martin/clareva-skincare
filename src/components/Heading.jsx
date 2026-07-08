import React from "react";

function Heading({ subHeading, mainHeading , container="" , headingClass }) {
  return (
    <div className={container}>
      <h6 className="text-primary/80 tracking-widest line-clamp-4  uppercase text-sm font-light">
        {" "}
        - {subHeading}
      </h6>
      <h1
        className={`${headingClass ? headingClass : "text-7xl italic font-bold"}`}
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      />
    </div>
  );
}

export default Heading;
