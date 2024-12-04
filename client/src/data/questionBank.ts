import { QuestionBankEntry } from "../types";

export const questionBank: QuestionBankEntry[] = [
  {
    id: "1",
    content: "In measure theory, which of the following statements about outer measure μ* is FALSE?",
    answer: "μ* is always σ-additive for all sets",
    choices: [
      "μ* is monotone (if A ⊆ B then μ*(A) ≤ μ*(B))",
      "μ* is countably subadditive",
      "μ*(∅) = 0",
      "μ* is always σ-additive for all sets"
    ]
  },
  {
    id: "2",
    content: "In algebraic topology, what is the Euler characteristic χ(T²) of a torus?",
    answer: "0",
    choices: ["2", "1", "0", "-2"]
  },
  {
    id: "3",
    content: "Which statement about the Riemann zeta function ζ(s) is correct?",
    answer: "All non-trivial zeros lie on the critical line Re(s) = 1/2",
    choices: [
      "All non-trivial zeros lie on the critical line Re(s) = 1/2",
      "The function has no poles",
      "It converges for all complex numbers s",
      "It has a simple pole at s = 2"
    ]
  },
  {
    id: "4",
    content: "What is the cohomological dimension of a K(G,1) space where G is a finite group?",
    answer: "Equal to the highest n where H^n(G,M) ≠ 0 for some G-module M",
    choices: [
      "Always 0",
      "Always 1",
      "Equal to the order of G",
      "Equal to the highest n where H^n(G,M) ≠ 0 for some G-module M"
    ]
  },
  {
    id: "5",
    content: "In representation theory, what is the character of an irreducible representation of SU(2) of dimension 3?",
    answer: "χ(θ) = 1 + 2cos(θ)",
    choices: [
      "χ(θ) = 3cos(θ)",
      "χ(θ) = 1 + 2cos(θ)",
      "χ(θ) = 1 + 2cos(2θ)",
      "χ(θ) = 1 + 2cos(θ) + cos(2θ)"
    ]
  },
  {
    id: "6",
    content: "Which statement about perfect fields is FALSE?",
    answer: "Every finite field is perfect",
    choices: [
      "Every finite field is perfect",
      "Every field of characteristic 0 is perfect",
      "Every algebraically closed field is perfect",
      "Every finite extension of a perfect field is perfect"
    ]
  },
  {
    id: "7",
    content: "In differential geometry, what is the Gaussian curvature of a hyperbolic paraboloid at its origin?",
    answer: "-1",
    choices: ["1", "0", "-1", "2"]
  },
  {
    id: "8",
    content: "What is the fundamental group of RP² × S¹?",
    answer: "Z × Z₂",
    choices: ["Z × Z₂", "Z", "Z₂", "Z × Z"]
  },
  {
    id: "9",
    content: "In complex analysis, what is the residue of f(z) = z²/(z⁴+1) at z = e^(iπ/4)?",
    answer: "e^(iπ/4)/4",
    choices: ["e^(-iπ/4)/4", "e^(iπ/4)/4", "1/4", "i/4"]
  },
  {
    id: "10",
    content: "Which statement about von Neumann algebras is TRUE?",
    answer: "The double commutant theorem characterizes von Neumann algebras",
    choices: [
      "Every von Neumann algebra is separable",
      "The weak operator topology is metrizable",
      "Every von Neumann algebra is isomorphic to B(H) for some Hilbert space H",
      "The double commutant theorem characterizes von Neumann algebras"
    ]
  },
  {
    id: "11",
    content: "In category theory, what is a zero object?",
    answer: "An object that is both initial and terminal",
    choices: [
      "An object that is both initial and terminal",
      "An object with no morphisms to or from it",
      "An object that is isomorphic to the empty set",
      "An object that represents the zero functor"
    ]
  },
  {
    id: "12",
    content: "What is the homological dimension of the ring Z[x]/(x²-2)?",
    answer: "1",
    choices: ["1", "2", "∞", "0"]
  },
  {
    id: "13",
    content: "In Lie algebra theory, what is the Killing form of sl(2,C)?",
    answer: "k(X,Y) = 8tr(XY)",
    choices: [
      "k(X,Y) = tr(XY)",
      "k(X,Y) = 2tr(XY)",
      "k(X,Y) = 4tr(XY)",
      "k(X,Y) = 8tr(XY)"
    ]
  },
  {
    id: "14",
    content: "What is the Krull dimension of k[x,y,z]/(xy-z²) where k is a field?",
    answer: "2",
    choices: ["1", "2", "3", "0"]
  },
  {
    id: "15",
    content: "In algebraic geometry, what is the genus of a smooth cubic curve in P²?",
    answer: "1",
    choices: ["0", "1", "2", "3"]
  },
  {
    id: "16",
    content: "Which statement about spectral sequences is FALSE?",
    answer: "Every spectral sequence converges",
    choices: [
      "Every spectral sequence converges",
      "The differentials on the r-th page have bidegree (-r,r-1)",
      "There exist collapse theorems",
      "They can be used to compute derived functors"
    ]
  },
  {
    id: "17",
    content: "What is the K-theory group K₁(Z)?",
    answer: "Z/2Z",
    choices: ["Z/2Z", "Z/4Z", "Z/6Z", "Z/8Z"]
  },
  {
    id: "18",
    content: "In operator theory, what characterizes compact operators?",
    answer: "They map bounded sets to relatively compact sets",
    choices: [
      "They have countable spectrum",
      "Their range is closed",
      "They map bounded sets to relatively compact sets",
      "They are bounded"
    ]
  },
  {
    id: "19",
    content: "What is the stable homotopy group π₁ˢ(S⁰)?",
    answer: "Z₂",
    choices: ["Z", "Z₂", "Z₄", "Z₈"]
  },
  {
    id: "20",
    content: "In geometric group theory, what is the growth rate of F₂ × Z?",
    answer: "Exponential",
    choices: ["Linear", "Quadratic", "Exponential", "Polynomial of degree 3"]
  },
  {
    id: "21",
    content: "What is the cohomological dimension of Q over Z?",
    answer: "∞",
    choices: ["0", "1", "2", "∞"]
  },
  {
    id: "22",
    content: "In symplectic geometry, what is the period of the Reeb flow on the unit cotangent bundle of S²?",
    answer: "2π",
    choices: ["π", "2π", "4π", "6π"]
  },
  {
    id: "23",
    content: "Which statement about the Monster group M is FALSE?",
    answer: "It is the automorphism group of the Leech lattice",
    choices: [
      "Its order is approximately 8×10⁵³",
      "It is sporadic",
      "It has exactly 194 conjugacy classes",
      "It is the automorphism group of the Leech lattice"
    ]
  },
  {
    id: "24",
    content: "In model theory, what characterizes strongly minimal theories?",
    answer: "They are categorical in all infinite cardinalities",
    choices: [
      "They are categorical in all infinite cardinalities",
      "They have quantifier elimination",
      "They are stable",
      "They have no infinite definable sets"
    ]
  },
  {
    id: "25",
    content: "What is the signature of the intersection form of CP²#CP²?",
    answer: "1",
    choices: ["0", "1", "2", "-2"]
  },
  {
    id: "26",
    content: "In analytic number theory, what is the asymptotic density of square-free numbers?",
    answer: "6/π²",
    choices: ["1/ζ(2)", "6/π²", "1/2", "1/4"]
  },
  {
    id: "27",
    content: "Which property does NOT characterize Hopf algebras?",
    answer: "They are cocommutative",
    choices: [
      "They have an antipode",
      "They are cocommutative",
      "They have a counit",
      "They are bialgebras"
    ]
  },
  {
    id: "28",
    content: "In Morse theory, what is the Morse index of a non-degenerate critical point?",
    answer: "The number of negative eigenvalues",
    choices: [
      "The dimension of the negative eigenspace",
      "The number of negative eigenvalues",
      "The signature of the Hessian",
      "The trace of the Hessian"
    ]
  },
  {
    id: "29",
    content: "What is the virtual cohomological dimension of SL(2,Z)?",
    answer: "1",
    choices: ["0", "1", "2", "3"]
  },
  {
    id: "30",
    content: "In p-adic analysis, what is the value of ∑n≥0 p^n in Qₚ?",
    answer: "1/(1-p)",
    choices: ["-1", "1/(1-p)", "undefined", "0"]
  },
  {
    id: "31",
    content: "Which statement about étale cohomology is TRUE?",
    answer: "It agrees with singular cohomology for complex varieties",
    choices: [
      "It satisfies the Künneth formula for all schemes",
      "It is always torsion-free",
      "It agrees with singular cohomology for complex varieties",
      "It is defined only for smooth schemes"
    ]
  },
  {
    id: "32",
    content: "In quantum groups, what is the dimension of U_q(sl₂)?",
    answer: "Countably infinite",
    choices: ["Finite", "Countably infinite", "Uncountable", "Depends on q"]
  },
  {
    id: "33",
    content: "What is the Gelfand-Kirillov dimension of U(sl₂)?",
    answer: "3",
    choices: ["1", "2", "3", "4"]
  },
  {
    id: "34",
    content: "In operator algebras, which C*-algebra is nuclear?",
    answer: "C(X) for compact X",
    choices: [
      "B(H) for infinite-dimensional H",
      "The Calkin algebra",
      "C(X) for compact X",
      "Free group C*-algebra"
    ]
  },
  {
    id: "35",
    content: "What is the L²-Betti number β₁⁽²⁾(F₂)?",
    answer: "1",
    choices: ["0", "1/2", "1", "2"]
  },
  {
    id: "36",
    content: "In string topology, what is the degree of the string bracket?",
    answer: "-2",
    choices: ["-1", "-2", "-3", "-4"]
  },
  {
    id: "37",
    content: "Which invariant distinguishes homotopy equivalent non-homeomorphic lens spaces?",
    answer: "Whitehead torsion",
    choices: [
      "Simple homotopy type",
      "Whitehead torsion",
      "K-theory",
      "L-theory"
    ]
  },
  {
    id: "38",
    content: "What is the rank of the Grothendieck group K₀(Z[C₂])?",
    answer: "3",
    choices: ["1", "2", "3", "4"]
  },
  {
    id: "39",
    content: "In Teichmüller theory, what is the complex dimension of the moduli space M_g?",
    answer: "3g-3",
    choices: ["3g-3", "3g", "g", "g-1"]
  },
  {
    id: "40",
    content: "Which property characterizes amenable groups?",
    answer: "They satisfy Følner's condition",
    choices: [
      "They satisfy Følner's condition",
      "They are residually finite",
      "They have property (T)",
      "They are hyperbolic"
    ]
  },
  {
    id: "41",
    content: "What is the stable rank of the ring C[x,y]/(xy)?",
    answer: "2",
    choices: ["1", "2", "3", "4"]
  },
  {
    id: "42",
    content: "In dynamical systems, what is the topological entropy of a full shift on n symbols?",
    answer: "log(n)",
    choices: ["log(n)", "n", "n²", "2^n"]
  },
  {
    id: "43",
    content: "Which statement about perfectoid spaces is FALSE?",
    answer: "They are characteristic p",
    choices: [
      "They are characteristic p",
      "They are adic spaces",
      "They admit tilting",
      "They are defined over perfectoid fields"
    ]
  },
  {
    id: "44",
    content: "What is the derived category D^b(Coh(P¹))?",
    answer: "Equivalent to D^b(kA₁)",
    choices: [
      "Equivalent to D^b(kA₁)",
      "Equivalent to D^b(k[x])",
      "Equivalent to D^b(Rep(SL₂))",
      "None of these"
    ]
  },
  {
    id: "45",
    content: "In geometric topology, what is the h-cobordism group of S³?",
    answer: "Z₂",
    choices: ["0", "Z", "Z₂", "Z₂⊕Z₂"]
  },
  {
    id: "46",
    content: "Which characteristic does NOT define Calabi-Yau manifolds?",
    answer: "Simply connected",
    choices: [
      "Ricci-flat",
      "Kähler",
      "Simply connected",
      "Having trivial canonical bundle"
    ]
  },
  {
    id: "47",
    content: "What is the Thompson group F?",
    answer: "The group of PL homeomorphisms of [0,1]",
    choices: [
      "The group of PL homeomorphisms of [0,1]",
      "A finite simple group",
      "A sporadic group",
      "A matrix group"
    ]
  },
  {
    id: "48",
    content: "In birational geometry, what is the Kodaira dimension of an Enriques surface?",
    answer: "0",
    choices: ["-∞", "0", "1", "2"]
  },
  {
    id: "49",
    content: "Which property defines cluster algebras?",
    answer: "Laurent phenomenon",
    choices: [
      "Laurent phenomenon",
      "Unique factorization",
      "Local finiteness",
      "Categorical duality"
    ]
  },
  {
    id: "50",
    content: "What is the rational homotopy type of S² × S⁴?",
    answer: "(Q[x₂,x₄], d=0)",
    choices: [
      "(Q[x₂,x₄], d=0)",
      "(Q[x₂,x₄], d(x₂)=x₄)",
      "(Q[x₂,x₄], d(x₄)=x₂²)",
      "(Q[x₂,x₄], d(x₂)=x₄²)"
    ]
  },
  {
    id: "51",
    content: "In Floer theory, what is the virtual dimension of the moduli space of J-holomorphic strips?",
    answer: "Maslov index",
    choices: ["Maslov index", "Energy", "Morse index", "Euler characteristic"]
  },
  {
    id: "52",
    content: "Which statement about locally symmetric spaces is TRUE?",
    answer: "Their universal cover is a symmetric space",
    choices: [
      "They are always compact",
      "They have constant sectional curvature",
      "Their universal cover is a symmetric space",
      "They are always orientable"
    ]
  },
  {
    id: "53",
    content: "What is the representation type of the algebra k[x,y]/(x²,xy,y²)?",
    answer: "Wild",
    choices: ["Finite", "Tame", "Wild", "Semisimple"]
  },
  {
    id: "54",
    content: "In geometric invariant theory, what is the Hilbert-Mumford criterion?",
    answer: "A point is stable iff all 1-parameter subgroups give positive weights",
    choices: [
      "A point is stable iff all 1-parameter subgroups give positive weights",
      "A point is stable iff its orbit is closed",
      "A point is stable iff its stabilizer is finite",
      "A point is stable iff it has no nilpotent elements"
    ]
  },
  {
    id: "55",
    content: "Which property characterizes rigid analytic spaces?",
    answer: "They are locally ringed spaces",
    choices: [
      "They are locally ringed spaces",
      "They are schemes",
      "They are complex manifolds",
      "They are formal schemes"
    ]
  },
  {
    id: "56",
    content: "What is the motivic cohomology group H²^M(Spec(Z),Z(2))?",
    answer: "K₃(Z)",
    choices: ["K₂(Z)", "K₃(Z)", "K₄(Z)", "0"]
  },
  {
    id: "57",
    content: "In arithmetic dynamics, what is the canonical height of a preperiodic point?",
    answer: "0",
    choices: ["-1", "0", "1", "Undefined"]
  },
  {
    id: "58",
    content: "What is the virtual dimension of M̄₀,₃(P²,3)?",
    answer: "8",
    choices: ["8", "9", "10", "11"]
  }
]; 