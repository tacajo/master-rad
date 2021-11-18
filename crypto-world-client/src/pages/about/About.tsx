import React from "react";
import { Link } from "react-router-dom";
import { css } from "aphrodite/no-important";
import { commonStyle } from "../../assets/style/common";
import { typographyStyle } from "../../assets/style/typography";
import NortikLogoImg from "../../assets/images/nortik-logo.png";
import { AboutStyle as style } from "./AboutStyle";

const About = () => {
  return (
    <div className={css(commonStyle.container)}>
      <p className={css(typographyStyle.text)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ex numquam. Rem veniam tempore aliquam vero
        doloribus, omnis eum quis et similique ipsum ea voluptate aut ut eligendi dicta temporibus.
      </p>
      <img src={NortikLogoImg} alt="nortik brand" className={css(style.logo)} />
      <Link to="/" className={css(typographyStyle.link)}>
        Go to landing page.
      </Link>
    </div>
  );
};

export default About;
