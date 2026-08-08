import type { TechOrbit } from '@/types/portfolio';

/**
 * The terms set in bold inside the stack paragraph.
 *
 * They live here, not in the dictionaries, because product names do not
 * translate — one list serves both languages, and it can never drift from the
 * orbit below it.
 */
export const TECH_TERMS: readonly string[] = [
  'C++',
  'Python',
  'PyTorch',
  'TensorFlow',
  'NumPy',
  'Pandas',
  'scikit-learn',
  'Git',
  'GitHub',
  'Linux',
  'VS Code',
  'Docker',
  'MySQL',
  'RAG',
] as const;

/**
 * Three rings, grouped the way the paragraph reads: languages at the centre,
 * the machine-learning stack around them, the working toolchain outermost.
 * Angles are spread evenly so no ring ever bunches up.
 *
 * The diameters drop sharply below `md`. A ring wider than its frame parks
 * most of its icons off-screen — at the desktop sizes a phone showed three of
 * the fourteen — so the rings shrink to stay inside the viewport rather than
 * merely scaling down.
 *
 * RAG carries no `src` — it is a technique, not a product, and has no mark.
 * The orbit renders its label instead.
 */
export const TECH_ORBITS: readonly TechOrbit[] = [
  {
    id: 'languages',
    size: 'w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] md:w-[720px] md:h-[720px]',
    duration: 26,
    icons: [
      { id: 'cplusplus', label: 'C++', src: '/tech/cplusplus.svg', angle: 0 },
      { id: 'python', label: 'Python', src: '/tech/python.svg', angle: 120 },
      { id: 'rag', label: 'RAG', angle: 240 },
    ],
  },
  {
    id: 'machine-learning',
    size: 'w-[390px] h-[390px] sm:w-[600px] sm:h-[600px] md:w-[880px] md:h-[880px]',
    duration: 34,
    icons: [
      { id: 'pytorch', label: 'PyTorch', src: '/tech/pytorch.svg', angle: 0 },
      { id: 'tensorflow', label: 'TensorFlow', src: '/tech/tensorflow.svg', angle: 72 },
      { id: 'numpy', label: 'NumPy', src: '/tech/numpy.svg', angle: 144 },
      { id: 'pandas', label: 'Pandas', src: '/tech/pandas.svg', angle: 216 },
      { id: 'scikitlearn', label: 'scikit-learn', src: '/tech/scikitlearn.svg', angle: 288 },
    ],
  },
  {
    id: 'toolchain',
    size: 'w-[500px] h-[500px] sm:w-[720px] sm:h-[720px] md:w-[1060px] md:h-[1060px]',
    duration: 44,
    icons: [
      { id: 'git', label: 'Git', src: '/tech/git.svg', angle: 0 },
      { id: 'github', label: 'GitHub', src: '/tech/github.svg', angle: 60 },
      { id: 'linux', label: 'Linux', src: '/tech/linux.svg', angle: 120 },
      { id: 'vscode', label: 'VS Code', src: '/tech/vscode.svg', angle: 180 },
      { id: 'docker', label: 'Docker', src: '/tech/docker.svg', angle: 240 },
      { id: 'mysql', label: 'MySQL', src: '/tech/mysql.svg', angle: 300 },
    ],
  },
] as const;
