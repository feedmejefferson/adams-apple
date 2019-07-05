import { Component, h } from "preact";
import { food } from "../../state/types";
import * as style from "./style.css";

interface Props {
    title: string;
    originTitle: string;
    originUrl: string;
    author: string;
    authorProfileUrl: string;
    license: string;
    licenseUrl: string;
}


export const Attribution = ({ title, originTitle, originUrl, author, authorProfileUrl, license, licenseUrl }: Props) => {
    if(!originTitle) {return}
    return (
        <div class={style.attribution}>
            { (title!==originTitle) && <span>{title} -- originally titled </span> }
            <a href={originUrl}>{originTitle}</a>
            { author && <span> by <a href={authorProfileUrl}>{author}</a></span> }
            { license && <span> is licensed under <a href={licenseUrl}>{license}</a></span> }
            .
        </div>
    );
}
