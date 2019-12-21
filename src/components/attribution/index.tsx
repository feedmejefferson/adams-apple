import { Component, h } from "preact";
import { food } from "../../state/constants";
import * as style from "./style.css";

interface Props {
    title: string;
    originTitle: string;
    originUrl: string;
    author?: string;
    authorProfileUrl?: string;
    license: string;
    licenseUrl: string;
}


export const Attribution = ({ title, originTitle, originUrl, author, authorProfileUrl, license, licenseUrl }: Props) => {
    if(!originTitle) {return}
    return (
        <div class={style.attribution}>
            { (title!==originTitle) && <span>{title} -- originally titled </span> }
            <a href={originUrl} target="_blank" rel="noopener">{originTitle}</a>
            { author && <span> by <a href={authorProfileUrl}>{author}</a></span> }
            { license && <span> is licensed under <a href={licenseUrl} target="_blank" rel="noopener">{license}</a></span> }
            .
        </div>
    );
}
