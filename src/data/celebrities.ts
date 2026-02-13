import { people } from './people';
import { richDataMap } from './richData';
import type { Person } from './types';

const curatedIds = new Set([
  // Science
  'albert-einstein', 'marie-curie', 'nikola-tesla', 'stephen-hawking', 'tu-youyou',
  // Art
  'pablo-picasso', 'frida-kahlo', 'vincent-van-gogh', 'yayoi-kusama', 'leonardo-da-vinci',
  // Politics
  'nelson-mandela', 'mahatma-gandhi', 'angela-merkel', 'cleopatra', 'winston-churchill',
  // Sports
  'muhammad-ali', 'serena-williams', 'pele', 'usain-bolt',
  // Music
  'ludwig-van-beethoven', 'bob-marley', 'freddie-mercury', 'beyonce', 'umm-kulthum',
  // Literature
  'william-shakespeare', 'toni-morrison', 'gabriel-garcia-marquez', 'franz-kafka',
  // Philosophy
  'aristotle', 'simone-de-beauvoir',
  // Business
  'steve-jobs', 'coco-chanel', 'oprah-winfrey',
  // Film
  'charlie-chaplin', 'hayao-miyazaki', 'alfred-hitchcock',
  // Math
  'alan-turing', 'ada-lovelace',
  // Activism
  'martin-luther-king-jr', 'rosa-parks', 'malala-yousafzai',
  // Exploration / Medicine / Engineering
  'neil-armstrong', 'jonas-salk',
]);

export const celebrities: Person[] = people
  .filter(p => curatedIds.has(p.id))
  .map(p => ({ ...p, ...richDataMap[p.id] }));
