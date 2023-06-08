import { compareArray } from "./array";

class Transition {
  constructor(value, to = null) {
    this.value = value;
    this.to = to;
  }
}

export const FiniteAutomata = class {
  constructor(finalStates, alphabets = []) {
    this.finalStates = finalStates || [];
    this.type = "nfa";
    this.alphabets = alphabets;
    this.states = [];
  }

  addStates(count) {
    for (let index = 0; index < count; index++) {
      this.states.push([]);
    }
  }

  #addStingTransition(value, from, to) {
    if (!this.alphabets.includes(value)) {
      this.alphabets.push(value);
    }
    if (to > this.states.length - 1 || from > this.states.length - 1) {
      const addCount =
        from > to ? from - this.states.length + 1 : to - this.states.length + 1;
      this.addStates(addCount);
    }
    this.states[from].push(new Transition(value, to));
  }

  #addAutomataTransitionToFrom({ value, from, to, augment }) {
    for (const transition of value.states[0]) {
      if (value.finalStates.includes(transition.to)) {
        this.addTransition(transition.value, from, to);
      } else if (transition.to === 0) {
        this.addTransition(transition.value, from, from);
      } else {
        this.addTransition(transition.value, from, transition.to + augment);
      }
    }
  }

  #addAutomataTransitionToTo({ value, from, to, augment, index }) {
    for (const transition of value.states[index]) {
      if (transition.to === index) {
        this.addTransition(transition.value, to, to);
      } else if (transition.to === 0) {
        this.addTransition(transition.value, to, from);
      } else {
        this.addTransition(transition.value, to, transition.to + augment);
      }
    }
  }

  #addAutomataTransitionToBetween({ value, from, to, augment, index }) {
    for (const transition of value.states[index]) {
      if (value.finalStates.includes(transition.to)) {
        this.addTransition(transition.value, index + augment, to);
      } else if (transition.to === 0) {
        this.addTransition(transition.value, index + augment, from);
      } else {
        this.addTransition(
          transition.value,
          index + augment,
          transition.to + augment
        );
      }
    }
  }

  #addAutomataTransition(value, from, to) {
    const augment = this.states.length - 1;

    if (value.states.length >= 2) {
      for (let index = 0; index < value.states.length; index++) {
        if (index === 0) {
          this.#addAutomataTransitionToFrom({ value, from, to, augment });
        } else if (value.finalStates.includes(index)) {
          this.#addAutomataTransitionToTo({ value, from, to, augment, index });
        } else {
          this.#addAutomataTransitionToBetween({
            value,
            from,
            to,
            augment,
            index,
          });
        }
      }
    } else {
      const length = this.states.length;
      this.addTransition("λ", from, length);
      this.addTransition("λ", length, to);
      for (const transition of value.states[0]) {
        this.addTransition(transition.value, length, length);
      }
    }
  }

  addTransition(value, from, to) {
    if (typeof value === "string") {
      this.#addStingTransition(value, from, to);
    } else {
      this.#addAutomataTransition(value, from, to);
    }
    this.checkType();
  }

  isDFA() {
    if (this.alphabets.includes("λ")) {
      return false;
    }
    let isDFA = true;
    this.states.forEach((transitions) => {
      let count = 0;
      this.alphabets.forEach((alphabet) => {
        transitions.forEach((transition) => {
          if (transition.value === alphabet) {
            count++;
          }
        });
      });
      if (count !== this.alphabets.length) {
        isDFA = false;
      }
    });
    return isDFA;
  }

  checkType() {
    if (this.isDFA()) {
      this.type = "dfa";
    } else {
      this.type = "nfa";
    }
  }

  #parseParan(stack) {
    while (stack.includes("(") || stack.includes(")")) {
      let firstIndex = -1,
        lastIndex = stack.length;
      for (let i = 0; i < stack.length; i++) {
        if (stack[i] === "(") {
          firstIndex = i;
          for (let j = i + 1; j < stack.length; j++) {
            if (stack[j] === ")") {
              lastIndex = j;
            }
          }
        }
      }
      const subExpression = stack.slice(firstIndex + 1, lastIndex);
      const subNFA = this.parseRegularExpression(subExpression);
      stack.splice(firstIndex, lastIndex - firstIndex + 1, subNFA);
    }
  }

  #parseStar(stack) {
    while (stack.includes("*")) {
      for (let index = 0; index < stack.length; index++) {
        if (stack[index] === "*") {
          stack.splice(index - 1, 2, this.parseAStar(stack[index - 1]));
        }
      }
    }
  }

  #parseDot(stack) {
    let index = 0;
    while (index < stack.length - 1) {
      if (stack[index] !== "+" && stack[index + 1] !== "+") {
        stack.splice(index, 2, this.parseADotB(stack[index], stack[index + 1]));
        index = 0;
      } else {
        index++;
      }
    }
  }

  #parsePlus(stack) {
    while (stack.includes("+")) {
      for (let index = 0; index < stack.length - 1; index++) {
        if (stack[index] === "+") {
          stack.splice(
            index - 1,
            3,
            this.parseAPlusB(stack[index - 1], stack[index + 1])
          );
          break;
        }
      }
    }
  }

  parseRegularExpression(regularExpression) {
    const stack = [];
    for (let index = 0; index < regularExpression.length; index++) {
      stack.push(regularExpression[index]);
    }

    this.#parseParan(stack);
    this.#parseStar(stack);
    this.#parseDot(stack);
    this.#parsePlus(stack);

    if (typeof stack[0] === "string") {
      stack[0] = this.parseA(stack[0]);
    } else {
      stack[0].removeExtraStates();
    }
    return stack[0];
  }

  parseA(A) {
    const nfa = new this.constructor();
    nfa.addTransition(A, 0, 1);
    nfa.finalStates = [1];
    return nfa;
  }
  parseAPlusB(A, B) {
    const nfa = new this.constructor();
    nfa.addTransition("λ", 0, 1);
    nfa.addTransition("λ", 2, 5);
    nfa.addTransition("λ", 0, 3);
    nfa.addTransition("λ", 4, 5);
    nfa.addTransition(A, 1, 2);
    nfa.addTransition(B, 3, 4);
    nfa.finalStates = [5];
    return nfa;
  }

  parseAStar(A) {
    const nfa = new this.constructor();
    nfa.addTransition("λ", 0, 1);
    nfa.addTransition("λ", 2, 1);
    nfa.addTransition("λ", 2, 3);
    nfa.addTransition("λ", 0, 3);
    nfa.addTransition(A, 1, 2);
    nfa.finalStates = [3];
    return nfa;
  }

  parseADotB(A, B) {
    const nfa = new this.constructor();
    nfa.addStates(3);
    nfa.addTransition(A, 0, 1);
    nfa.addTransition(B, 1, 2);
    nfa.finalStates = [2];
    return nfa;
  }

  removeExtraState(stateNumber) {
    this.states.splice(stateNumber, 1);

    this.states.forEach((state) => {
      state.forEach((transition) => {
        if (transition.to > stateNumber) {
          transition.to--;
        }
      });
    });
  }

  removeExtraStates() {
    let statesArray = [];
    this.states.forEach((state) => {
      state.forEach((transition) => {
        if (!statesArray.includes(transition.to)) {
          statesArray.push(transition.to);
        }
      });
    });
    statesArray.sort((a, b) => a - b);

    let index = 1;
    while (index < this.states.length) {
      if (!statesArray.includes(index)) {
        this.removeExtraState(index);
        statesArray = statesArray.map((state) => {
          if (state >= index) return state - 1;
          return state;
        });
        index = 1;
        continue;
      }
      index++;
    }
  }

  #validateParan(regularExpression) {
    const stack = [];
    let openParanNumber = 0,
      closeParanNumber = 0;
    for (let index = 0; index < regularExpression.length - 1; index++) {
      const word = regularExpression[index];
      const nextWord = regularExpression[index + 1];
      if (word === "(") {
        stack.push(word);
        openParanNumber++;
        if (nextWord === ")") {
          return false;
        }
      } else if (word === ")") {
        stack.pop();
        closeParanNumber++;
      }
    }
    if (regularExpression[regularExpression.length - 1] === ")") {
      stack.pop();
      closeParanNumber++;
    } else if (regularExpression[regularExpression.length - 1] === "(") {
      stack.push(regularExpression[regularExpression.length - 1]);
      openParanNumber++;
    }

    return !stack.length && openParanNumber === closeParanNumber;
  }

  #validateSymbols(regularExpression) {
    if (
      regularExpression.includes("**") ||
      regularExpression.includes("+*") ||
      regularExpression.includes("++")
    ) {
      return false;
    }
    for (let index = 0; index < regularExpression.length - 1; index++) {
      if (
        regularExpression[index] === "+" &&
        !/^[a-zA-Z(0-9λ]+$/.test(regularExpression[index + 1])
      ) {
        return false;
      }
    }

    if (regularExpression[regularExpression.length - 1] === "+") {
      return false;
    }
    return true;
  }

  validateRegularExpression(regularExpression) {
    if (!regularExpression) {
      return false;
    }

    let isValid = true;
    isValid &= this.#validateParan(regularExpression);
    isValid &= this.#validateSymbols(regularExpression);

    return isValid;
  }

  compare(regularExpression, compareRegularExpression) {
    return regularExpression === compareRegularExpression;
  }

  toDFA() {
    if (this.type === "dfa") {
      return this;
    }
    const dfa = new this.constructor();
    const dfaStates = [];

    dfaStates.push({ groupe: this.#getChainLambda(0), transitions: [] });

    let index = 0;
    let hasTrap = false;

    while (index !== dfaStates.length) {
      for (const alphabet of this.alphabets) {
        if (alphabet === "λ") continue;

        let added = false;

        const to = this.#getChainTransition(dfaStates[index].groupe, alphabet);

        if (to.length !== 0) {
          for (let i = 0; i < dfaStates.length; i++) {
            if (compareArray(dfaStates[i].groupe, to)) {
              dfaStates[index].transitions.push({ value: alphabet, to: i });
              added = true;
              break;
            }
          }
          if (added) {
            continue;
          } else {
            dfaStates[index].transitions.push({
              value: alphabet,
              to: dfaStates.length,
            });
            dfaStates.push({ groupe: to, transitions: [] });
          }
        } else {
          dfaStates[index].transitions.push({ value: alphabet, to: "trap" });
          hasTrap = true;
        }
      }
      index++;
    }

    dfa.addStates(dfaStates.length + hasTrap ? 1 : 0);

    for (let index = 0; index < dfaStates.length; index++) {
      for (const finalState of this.finalStates) {
        if (dfaStates[index].groupe.includes(finalState)) {
          dfa.finalStates.push(index);
        }
      }

      for (const transition of dfaStates[index].transitions) {
        if (transition.to === "trap") {
          dfa.addTransition(transition.value, index, dfaStates.length);
        } else {
          dfa.addTransition(transition.value, index, transition.to);
        }
      }
    }
    if (hasTrap) {
      for (const alphabet of this.alphabets) {
        if (alphabet === "λ") continue;
        dfa.addTransition(alphabet, dfaStates.length, dfaStates.length);
      }
    }

    dfa.checkType();
    return dfa;
  }

  #getChainLambda(index, checked = []) {
    const chaindedStates = [];
    checked.push(index);

    for (const transition of this.states[index]) {
      if (transition.value === "λ" && !chaindedStates.includes(transition.to)) {
        chaindedStates.push(transition.to);
      }
    }
    for (const stateOfChanedState of chaindedStates) {
      if (!checked.includes(stateOfChanedState)) {
        const states = this.#getChainLambda(stateOfChanedState, checked);
        for (const state of states) {
          if (!chaindedStates.includes(state)) {
            chaindedStates.push(state);
          }
        }
      }
    }
    chaindedStates.push(index);
    return chaindedStates.sort((a, b) => a - b);
  }

  #getChainTransition(states, value) {
    const chaindedStates = [];
    for (const state of states) {
      for (const transition of this.states[state]) {
        if (transition.value === value) {
          const chaindedStatesOfValue = this.#getChainLambda(transition.to);
          for (const chainedState of chaindedStatesOfValue) {
            if (!chaindedStates.includes(chainedState)) {
              chaindedStates.push(chainedState);
            }
          }
        }
      }
    }

    return chaindedStates;
  }

  toMiniDFA() {
    const dfa = this.toDFA();

    let groups = [];
    groups.push([...dfa.finalStates]);
    const noneFinialStates = [];
    for (let index = 0; index < dfa.states.length; index++) {
      if (!dfa.finalStates.includes(index)) {
        noneFinialStates.push(index);
      }
    }
    if (noneFinialStates.length) groups.push(noneFinialStates);

    let added;

    do {
      added = 0;
      for (const alphabet of dfa.alphabets) {
        const newGroups = [];
        for (const group of groups) {
          const newGroup = [...group];
          for (const [index, state] of group.entries()) {
            newGroup[index] = {
              state,
              to: this.#getGroupTo(
                groups,
                dfa.states[state].find(
                  (transition) => transition.value === alphabet
                )
              ),
            };
          }
          const seperatedGroup = this.#getSeperatedGroup(
            newGroup,
            groups.length
          );
          newGroups.splice(0, 0, ...seperatedGroup);
        }

        if (groups.length !== newGroups.length) {
          added++;
        }
        groups = newGroups;
      }
    } while (added);

    const finalStates = dfa.finalStates;
    dfa.finalStates = [];

    for (const group of groups) {
      for (const state of group) {
        if (finalStates.includes(state)) {
          const min = group.sort((a, b) => a - b)[0];
          dfa.finalStates.push(min);
          break;
        }
      }
    }

    for (const group of groups) {
      const min = group.sort((a, b) => a - b)[0];
      for (let index = 0; index < dfa.states.length; index++) {
        dfa.states[index].forEach((transition) => {
          if (group.includes(transition.to)) {
            transition.to = min;
          }
        });
      }
    }

    dfa.removeExtraStates();

    return dfa;
  }

  #getGroupTo(groups, transition) {
    for (const [index, group] of groups.entries()) {
      if (group.includes(transition.to)) {
        return index;
      }
    }
  }

  #getSeperatedGroup(group, numberOfGroups) {
    const groups = [];
    for (let index = 0; index < numberOfGroups; index++) {
      groups.push([]);
    }
    for (const state of group) {
      groups[state.to].push(state.state);
    }

    return groups.filter((group) => group.length);
  }
};
