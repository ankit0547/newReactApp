// import styles from "./Textfield.module.css";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

const clickAction = action("click!");

export default {
  title: "./Button",
};

export function Default() {
  return <Button handleClick={clickAction}>Primary</Button>;
}

Default.story = {
  name: "default",
};

// export const Primary = {
//   args: {
//     children: "Primary Button",
//     primary: true,
//     handleClick: () => clickAction,
//     type: "text",
//   },
// };
