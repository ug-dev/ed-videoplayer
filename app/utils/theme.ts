import React from "react";
import { AppTheme } from "./Entities";

export const appTheme: AppTheme = {
    Text: {
        style: {
            fontFamily: "Roboto",
        },
    },
    Button: {
        titleStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
        },
        buttonStyle: {
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 15,
            paddingVertical: 10,
            height: 60,
        },
        containerStyle: {
            width: 300,
            marginHorizontal: 50,
            marginVertical: 10,
        },
    },
    colors: {
        primary: "#2A368A",
        secondary: "rgba(0,0,0,0.4)",
        lightGrey: "#F6F7FB",
        bglight: "#fafafa",
    },
};
