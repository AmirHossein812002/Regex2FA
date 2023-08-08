# Regex2FA - Regular Expression to Finite Automata Converter
![wired-outline-742-multimedia-code-1 (2)](https://github.com/AmirHossein812002/Regex2FA/assets/98973037/5699329c-d6e6-4670-b542-1a9ae5762dea)

Welcome to Regex2FA, your one-stop tool for converting regular expressions into various forms of finite automata! Whether you're a computer science enthusiast, a student studying formal languages, or just someone curious about the magic behind regular expressions and automata, Regex2FA has got you covered.

[![Website](https://img.shields.io/badge/Check%20It%20Out-Regex2FA-blueviolet)](https://regex2fa.netlify.app/)
[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How to Use](#how-to-use)
- [Examples](#examples)
- [Language Equivalence](#language-equivalence)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Regex2FA is a web-based tool designed to demystify the transition from regular expressions to finite automata. It's not just another regex tester – it's your guide to understanding the conversion process while having fun along the way.

Are you tired of drawing countless automata diagrams by hand? Fret not! Regex2FA provides you with three key automata representations for every regular expression you input: 

1. **NFA (Nondeterministic Finite Automaton):** Explore the states, transitions, and the magical non-determinism that lies within regular expressions.

2. **DFA (Deterministic Finite Automaton):** Watch as the non-determinism is tamed into a deterministic machine, ready to accept or reject strings in a clear-cut manner.

3. **Minimized DFA:** Experience the elegance of the smallest possible DFA that still captures the essence of your regular expression's language.

## Features

- **Convert on the Fly:** Enter your regular expression in one of the input boxes, and Regex2FA generates the corresponding NFA, DFA, and minimized DFA for your exploration.

- **Visualize Automata:** Gain insights into the inner workings of automata through clean and interactive visualizations.

- **Language Equivalence Checker:** Wondering if two regular expressions describe the same language? Regex2FA can verify that for you!

- **User-Friendly Interface:** No more wrestling with complex software. Regex2FA's intuitive interface makes understanding automata a breeze.

## How to Use

1. **Access the Website:** Go to [https://regex2fa.netlify.app/](https://regex2fa.netlify.app/).

2. **Input Regular Expressions:** Enter your regular expressions in the input boxes provided on the webpage.

3. **View Automata:** Once you've entered your regular expressions, marvel at the NFA, DFA, and minimized DFA representations that Regex2FA generates.

4. **Compare Languages:** Curious if two regular expressions are equivalent in terms of the languages they describe? Use the language equivalence checker to find out.

## Examples

Let's dive into a couple of examples to showcase the magic of Regex2FA:

### Example 1: Simple Language

**Input:**
```
(a+b)*abb
```

**Output:**
- NFA Visualization
- DFA Visualization
- Minimized DFA Visualization

### Example 2: Complex Language

**Input:**
```
(0+1)*0101(0+1)*
```

**Output:**
- NFA Visualization
- DFA Visualization
- Minimized DFA Visualization

## Language Equivalence

Curious if two regular expressions are equivalent in terms of the languages they describe? Regex2FA can assist you in verifying this! Simply enter the two regular expressions and let the tool determine if they are describing the same language.

## Contributing

Regex2FA is an open-source project, and we welcome contributions from the community. Whether you're a developer, designer, or simply passionate about automata theory, your contributions are valuable! Check out our [Contribution Guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. For details, see the [LICENSE](LICENSE) file.

---

**Explore the world of regular expressions and automata with Regex2FA! Visit [https://regex2fa.netlify.app/](https://regex2fa.netlify.app/) today.**
