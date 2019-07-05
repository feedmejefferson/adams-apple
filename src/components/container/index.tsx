import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { Phase } from "../../state/types";
import { Dilemma } from "../dilemma";
import { Procurement} from "../procurement";
import { Recommendation } from "../recommendation";

export const Container = connect('phase', actions)(({phase}: any) => 
    (phase===Phase.DILEMMA) ? <Dilemma/> :
    (phase===Phase.RECOMMENDATION) ? <Recommendation /> : <Procurement />
)
