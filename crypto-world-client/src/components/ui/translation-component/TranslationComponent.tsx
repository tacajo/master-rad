import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ITranslationComponent } from "../../../interfaces";
import { typographyStyle } from "../../../assets/style/typography";
import { css } from "aphrodite/no-important";

const TranslationComponent: FC<ITranslationComponent> = ({ name }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <h1 className={css(typographyStyle.title)}>
        <Trans
          i18nKey={name}
          components={{
            NAME: name,
          }}
        >
          {t("title")}
        </Trans>
      </h1>

      <p className={css(typographyStyle.text)}>
        {t("text", {
          TIME: new Date().getHours(),
        })}
      </p>
    </React.Fragment>
  );
};

export default TranslationComponent;
