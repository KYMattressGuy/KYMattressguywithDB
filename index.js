// KY Mattress Guy Pro — Quiz Question Bank Index
// Import all categories or individual ones as needed

import adjustableBases from './adjustableBases';
import competitiveEdge from './competitiveEdge';
import customerProfiling from './customerProfiling';
import mathFinancing from './mathFinancing';
import mattresses from './mattresses';
import rolePlay from './rolePlay';
import sellingPsychology from './sellingPsychology';
import softGoods from './softGoods';

export const allQuestions = [
  ...adjustableBases,
  ...competitiveEdge,
  ...customerProfiling,
  ...mathFinancing,
  ...mattresses,
  ...rolePlay,
  ...sellingPsychology,
  ...softGoods
];

export default allQuestions;

export {
  adjustableBases,
  competitiveEdge,
  customerProfiling,
  mathFinancing,
  mattresses,
  rolePlay,
  sellingPsychology,
  softGoods
};
