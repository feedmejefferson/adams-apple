import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { Dilemma } from "../dilemma";
import { Recommendation } from "../recommendation";

export const Container = connect('recommendation', actions)(({recommendation}: any) => 
(
    recommendation ? <Recommendation /> : <Dilemma />
))
