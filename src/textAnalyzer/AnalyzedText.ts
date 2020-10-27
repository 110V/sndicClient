import { ReactNode } from "react";
import *as React from "react";

export default class AnalyzedText {
    public sentences:string[];
    public indexes:number[];

    constructor(sentences: string[], indexes: number[]) {
        this.sentences = sentences;
        this.indexes = indexes;
    }
}