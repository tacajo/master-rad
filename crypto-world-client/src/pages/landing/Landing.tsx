import React from "react";
import { Link } from "react-router-dom";
import { css } from "aphrodite/no-important";
import TranslationComponent from "../../components/ui/translation-component/TranslationComponent";
import { commonStyle } from "../../assets/style/common";
import { typographyStyle } from "../../assets/style/typography";

const Landing = () => {
  return (
    <div className={css(commonStyle.container)}>
      <TranslationComponent name="Nortik" />
      <Link to="/about" className={css(typographyStyle.link)}>
        Go to about page.
      </Link>
    </div>
  );
};

export default Landing;
