import React, { useEffect } from "react";
import OriginalTOC from "@theme-original/TOC";

import styles from "./styles.module.css";

function TOC({ ...rest }) {
  return (
    <div className={styles.sidebarContainer}>
      <OriginalTOC {...rest} />
    </div>
  );
}

export default TOC;
