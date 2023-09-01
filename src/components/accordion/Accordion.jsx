import React from "react";
import "./accordion.css";

function Accordion({ aboutProduct }) {
  const [opened, setOpened] = React.useState(null);

  const handleClick = (id) => {
    setOpened((opened) => (opened === id ? null : id));
  };

  return (
    <div className="candleConstructorAccordion">
      {aboutProduct.map((item, i, arr) => (
        <div
          key={item.title}
          className={`candleConstructorAccordionItem ${
            arr.length - i === 1 && "candleConstructorAccordionItemLast"
          } `}
        >
          <div className="candleConstructorAccordion">
            <div
              key={item.id}
              className="candleConstructorAccordionHead"
              onClick={() => handleClick(item.id)}
            >
              <div key={item.title} className="candleConstructorAccordionTitle">
                {item.title}
              </div>
              <div
                key={item.title}
                className={
                  opened === item.id
                    ? "candleConstructorAccordionArrowOpen"
                    : "candleConstructorAccordionArrow"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g opacity="0.4">
                    <path d="M14 7L8.30872 12L2.61745 7" stroke="black" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div
            className={
              opened === item.id
                ? "candleConstructorAccordionContentOpen"
                : "candleConstructorAccordionContent"
            }
          >
            {item.textList.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
