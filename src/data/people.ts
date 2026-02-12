import type { Person, FieldOfFame, Gender, InfluenceTier, ContributionType } from './types';

// Compact person factory: [id, name, shortName, birthYear, deathYear, gender, nationality, secondaryNat[], birthPlace, field, secondaryFields[], views, langs, awards, tier, contribType, awardNames[]]
type PD = [string, string, string, number, number | null, Gender, string, string[], string, FieldOfFame, FieldOfFame[], number, number, number, InfluenceTier, ContributionType, string[]];

function p(d: PD): Person {
  return {
    id: d[0], name: d[1], shortName: d[2], birthYear: d[3], deathYear: d[4],
    isAlive: d[4] === null, gender: d[5], nationality: d[6], secondaryNationalities: d[7],
    birthPlace: d[8], fieldOfFame: d[9], secondaryFields: d[10],
    impact: {
      wikiPageViewsMonthly: d[11], wikiLanguageEditions: d[12], notableAwardsCount: d[13],
      culturalInfluenceTier: d[14], primaryContributionType: d[15], notableAwards: d[16],
    },
  };
}

const data: PD[] = [
  // ===== SCIENCE (17) =====
  ['albert-einstein', 'Albert Einstein', 'Einstein', 1879, 1955, 'male', 'DE', ['US'], 'Ulm, Germany', 'science', [], 2000000, 190, 15, 'S', 'theoretical', ['Nobel Prize in Physics']],
  ['isaac-newton', 'Isaac Newton', 'Newton', 1643, 1727, 'male', 'GB', [], 'Woolsthorpe, England', 'science', ['mathematics'], 1500000, 175, 12, 'S', 'theoretical', ['Fellow of the Royal Society']],
  ['marie-curie', 'Marie Curie', 'Curie', 1867, 1934, 'female', 'PL', ['FR'], 'Warsaw, Poland', 'science', [], 1200000, 170, 10, 'A', 'theoretical', ['Nobel Prize in Physics', 'Nobel Prize in Chemistry']],
  ['charles-darwin', 'Charles Darwin', 'Darwin', 1809, 1882, 'male', 'GB', [], 'Shrewsbury, England', 'science', [], 1100000, 175, 8, 'S', 'theoretical', ['Royal Medal', 'Copley Medal']],
  ['nikola-tesla', 'Nikola Tesla', 'Tesla', 1856, 1943, 'male', 'RS', ['US'], 'Smiljan, Croatia', 'science', ['engineering'], 1400000, 145, 6, 'A', 'practical', ['Edison Medal', 'Elliott Cresson Medal']],
  ['galileo-galilei', 'Galileo Galilei', 'Galileo', 1564, 1642, 'male', 'IT', [], 'Pisa, Italy', 'science', [], 900000, 165, 5, 'A', 'theoretical', []],
  ['rosalind-franklin', 'Rosalind Franklin', 'Franklin', 1920, 1958, 'female', 'GB', [], 'London, England', 'science', [], 300000, 65, 3, 'B', 'theoretical', []],
  ['stephen-hawking', 'Stephen Hawking', 'Hawking', 1942, 2018, 'male', 'GB', [], 'Oxford, England', 'science', [], 1300000, 140, 12, 'A', 'theoretical', ['Presidential Medal of Freedom', 'Copley Medal']],
  ['tu-youyou', 'Tu Youyou', 'Tu', 1930, null, 'female', 'CN', [], 'Ningbo, China', 'science', ['medicine'], 200000, 55, 4, 'B', 'practical', ['Nobel Prize in Physiology or Medicine']],
  ['niels-bohr', 'Niels Bohr', 'Bohr', 1885, 1962, 'male', 'DK', [], 'Copenhagen, Denmark', 'science', [], 500000, 130, 8, 'A', 'theoretical', ['Nobel Prize in Physics']],
  ['mae-jemison', 'Mae Jemison', 'Jemison', 1956, null, 'female', 'US', [], 'Decatur, Alabama', 'science', ['engineering'], 250000, 45, 3, 'B', 'practical', ['National Women\'s Hall of Fame']],
  ['jagadish-chandra-bose', 'Jagadish Chandra Bose', 'Bose', 1858, 1937, 'male', 'IN', [], 'Bikrampur, Bengal', 'science', [], 180000, 50, 3, 'B', 'theoretical', ['Companion of the Order of the Star of India']],
  ['vera-rubin', 'Vera Rubin', 'Rubin', 1928, 2016, 'female', 'US', [], 'Philadelphia, Pennsylvania', 'science', [], 200000, 45, 5, 'B', 'theoretical', ['National Medal of Science']],
  ['ibn-al-haytham', 'Ibn al-Haytham', 'Alhazen', 965, 1040, 'male', 'IQ', [], 'Basra, Iraq', 'science', ['mathematics'], 250000, 80, 2, 'A', 'theoretical', []],
  ['srinivasa-ramanujan', 'Srinivasa Ramanujan', 'Ramanujan', 1887, 1920, 'male', 'IN', [], 'Erode, India', 'science', ['mathematics'], 500000, 70, 4, 'A', 'theoretical', ['Fellow of the Royal Society']],
  ['dmitri-mendeleev', 'Dmitri Mendeleev', 'Mendeleev', 1834, 1907, 'male', 'RU', [], 'Tobolsk, Russia', 'science', [], 400000, 110, 5, 'A', 'theoretical', ['Copley Medal']],
  ['lise-meitner', 'Lise Meitner', 'Meitner', 1878, 1968, 'female', 'AT', ['SE'], 'Vienna, Austria', 'science', [], 250000, 65, 4, 'B', 'theoretical', ['Enrico Fermi Award']],

  // ===== ART (12) =====
  ['leonardo-da-vinci', 'Leonardo da Vinci', 'Da Vinci', 1452, 1519, 'male', 'IT', [], 'Vinci, Italy', 'art', ['science', 'engineering'], 2500000, 190, 5, 'S', 'artistic', []],
  ['pablo-picasso', 'Pablo Picasso', 'Picasso', 1881, 1973, 'male', 'ES', [], 'Málaga, Spain', 'art', [], 1500000, 175, 6, 'S', 'artistic', ['Stalin Peace Prize']],
  ['frida-kahlo', 'Frida Kahlo', 'Kahlo', 1907, 1954, 'female', 'MX', [], 'Coyoacán, Mexico', 'art', [], 1200000, 95, 3, 'A', 'artistic', ['National Prize of Arts and Sciences']],
  ['michelangelo', 'Michelangelo', 'Michelangelo', 1475, 1564, 'male', 'IT', [], 'Caprese, Italy', 'art', ['engineering'], 1300000, 170, 4, 'S', 'artistic', []],
  ['katsushika-hokusai', 'Katsushika Hokusai', 'Hokusai', 1760, 1849, 'male', 'JP', [], 'Edo, Japan', 'art', [], 500000, 75, 2, 'A', 'artistic', []],
  ['yayoi-kusama', 'Yayoi Kusama', 'Kusama', 1929, null, 'female', 'JP', [], 'Matsumoto, Japan', 'art', [], 400000, 50, 5, 'B', 'artistic', ['Order of Culture']],
  ['vincent-van-gogh', 'Vincent van Gogh', 'Van Gogh', 1853, 1890, 'male', 'NL', [], 'Zundert, Netherlands', 'art', [], 1800000, 160, 3, 'A', 'artistic', []],
  ['augusta-savage', 'Augusta Savage', 'Savage', 1892, 1962, 'female', 'US', [], 'Green Cove Springs, Florida', 'art', [], 100000, 20, 2, 'B', 'artistic', []],
  ['ai-weiwei', 'Ai Weiwei', 'Ai', 1957, null, 'male', 'CN', [], 'Beijing, China', 'art', ['activism'], 350000, 55, 4, 'B', 'artistic', ['Václav Havel Prize']],
  ['rembrandt', 'Rembrandt van Rijn', 'Rembrandt', 1606, 1669, 'male', 'NL', [], 'Leiden, Netherlands', 'art', [], 800000, 145, 3, 'A', 'artistic', []],
  ['georgia-okeeffe', 'Georgia O\'Keeffe', 'O\'Keeffe', 1887, 1986, 'female', 'US', [], 'Sun Prairie, Wisconsin', 'art', [], 400000, 55, 4, 'A', 'artistic', ['Presidential Medal of Freedom']],
  ['el-anatsui', 'El Anatsui', 'Anatsui', 1944, null, 'male', 'GH', [], 'Anyako, Ghana', 'art', [], 80000, 18, 3, 'B', 'artistic', ['Venice Biennale Golden Lion']],

  // ===== POLITICS (17) =====
  ['nelson-mandela', 'Nelson Mandela', 'Mandela', 1918, 2013, 'male', 'ZA', [], 'Mvezo, South Africa', 'politics', ['activism'], 1500000, 175, 15, 'S', 'political', ['Nobel Peace Prize', 'Presidential Medal of Freedom']],
  ['abraham-lincoln', 'Abraham Lincoln', 'Lincoln', 1809, 1865, 'male', 'US', [], 'Hodgenville, Kentucky', 'politics', [], 1800000, 155, 5, 'S', 'political', []],
  ['cleopatra', 'Cleopatra VII', 'Cleopatra', -69, -30, 'female', 'EG', [], 'Alexandria, Egypt', 'politics', [], 1200000, 130, 2, 'A', 'political', []],
  ['winston-churchill', 'Winston Churchill', 'Churchill', 1874, 1965, 'male', 'GB', [], 'Blenheim Palace, England', 'politics', ['literature'], 1400000, 160, 8, 'A', 'political', ['Nobel Prize in Literature']],
  ['mahatma-gandhi', 'Mahatma Gandhi', 'Gandhi', 1869, 1948, 'male', 'IN', [], 'Porbandar, India', 'politics', ['activism'], 1600000, 170, 6, 'S', 'social', []],
  ['angela-merkel', 'Angela Merkel', 'Merkel', 1954, null, 'female', 'DE', [], 'Hamburg, Germany', 'politics', [], 600000, 110, 8, 'A', 'political', ['Presidential Medal of Freedom']],
  ['genghis-khan', 'Genghis Khan', 'Genghis Khan', 1162, 1227, 'male', 'MN', [], 'Khentii, Mongolia', 'politics', ['military'], 1000000, 145, 2, 'A', 'political', []],
  ['julius-caesar', 'Julius Caesar', 'Caesar', -100, -44, 'male', 'IT', [], 'Rome, Italy', 'politics', ['military'], 1100000, 155, 2, 'A', 'political', []],
  ['queen-elizabeth-ii', 'Queen Elizabeth II', 'Elizabeth II', 1926, 2022, 'female', 'GB', [], 'Mayfair, London', 'politics', [], 1300000, 130, 10, 'A', 'political', []],
  ['simon-bolivar', 'Simón Bolívar', 'Bolívar', 1783, 1830, 'male', 'VE', [], 'Caracas, Venezuela', 'politics', ['military'], 400000, 95, 3, 'A', 'political', []],
  ['mao-zedong', 'Mao Zedong', 'Mao', 1893, 1976, 'male', 'CN', [], 'Shaoshan, China', 'politics', [], 900000, 145, 3, 'A', 'political', []],
  ['franklin-d-roosevelt', 'Franklin D. Roosevelt', 'FDR', 1882, 1945, 'male', 'US', [], 'Hyde Park, New York', 'politics', [], 800000, 120, 6, 'A', 'political', []],
  ['benazir-bhutto', 'Benazir Bhutto', 'Bhutto', 1953, 2007, 'female', 'PK', [], 'Karachi, Pakistan', 'politics', [], 250000, 65, 4, 'B', 'political', ['UN Prize in Human Rights']],
  ['kwame-nkrumah', 'Kwame Nkrumah', 'Nkrumah', 1909, 1972, 'male', 'GH', [], 'Nkroful, Gold Coast', 'politics', [], 200000, 60, 3, 'B', 'political', ['Lenin Peace Prize']],
  ['catherine-the-great', 'Catherine the Great', 'Catherine', 1729, 1796, 'female', 'RU', ['DE'], 'Stettin, Prussia', 'politics', [], 500000, 100, 3, 'A', 'political', []],
  ['nefertiti', 'Nefertiti', 'Nefertiti', -1370, -1330, 'female', 'EG', [], 'Thebes, Egypt', 'politics', [], 600000, 80, 1, 'B', 'political', []],
  ['pachacuti', 'Pachacuti', 'Pachacuti', 1418, 1472, 'male', 'PE', [], 'Cusco, Inca Empire', 'politics', ['military'], 100000, 35, 1, 'B', 'political', []],

  // ===== SPORTS (10) =====
  ['muhammad-ali', 'Muhammad Ali', 'Ali', 1942, 2016, 'male', 'US', [], 'Louisville, Kentucky', 'sports', ['activism'], 1200000, 120, 8, 'A', 'athletic', ['Presidential Medal of Freedom']],
  ['serena-williams', 'Serena Williams', 'S. Williams', 1981, null, 'female', 'US', [], 'Saginaw, Michigan', 'sports', [], 800000, 75, 12, 'A', 'athletic', ['Laureus World Sports Award']],
  ['pele', 'Pelé', 'Pelé', 1940, 2022, 'male', 'BR', [], 'Três Corações, Brazil', 'sports', [], 900000, 120, 10, 'A', 'athletic', ['FIFA Player of the Century']],
  ['usain-bolt', 'Usain Bolt', 'Bolt', 1986, null, 'male', 'JM', [], 'Sherwood Content, Jamaica', 'sports', [], 700000, 95, 8, 'A', 'athletic', ['IAAF World Athlete of the Year']],
  ['michael-jordan', 'Michael Jordan', 'Jordan', 1963, null, 'male', 'US', [], 'Brooklyn, New York', 'sports', ['business'], 1000000, 95, 10, 'A', 'athletic', ['Presidential Medal of Freedom']],
  ['nadia-comaneci', 'Nadia Comăneci', 'Comăneci', 1961, null, 'female', 'RO', ['US'], 'Onești, Romania', 'sports', [], 300000, 70, 5, 'B', 'athletic', ['Olympic Order']],
  ['sachin-tendulkar', 'Sachin Tendulkar', 'Tendulkar', 1973, null, 'male', 'IN', [], 'Mumbai, India', 'sports', [], 600000, 55, 8, 'B', 'athletic', ['Bharat Ratna']],
  ['simone-biles', 'Simone Biles', 'Biles', 1997, null, 'female', 'US', [], 'Columbus, Ohio', 'sports', [], 500000, 45, 10, 'B', 'athletic', ['Presidential Medal of Freedom']],
  ['lionel-messi', 'Lionel Messi', 'Messi', 1987, null, 'male', 'AR', [], 'Rosario, Argentina', 'sports', [], 1500000, 110, 12, 'A', 'athletic', ['Ballon d\'Or']],
  ['jackie-robinson', 'Jackie Robinson', 'Robinson', 1919, 1972, 'male', 'US', [], 'Cairo, Georgia', 'sports', ['activism'], 500000, 55, 6, 'A', 'athletic', ['Presidential Medal of Freedom']],

  // ===== MUSIC (14) =====
  ['ludwig-van-beethoven', 'Ludwig van Beethoven', 'Beethoven', 1770, 1827, 'male', 'DE', [], 'Bonn, Germany', 'music', [], 1300000, 170, 5, 'S', 'artistic', []],
  ['wolfgang-amadeus-mozart', 'Wolfgang Amadeus Mozart', 'Mozart', 1756, 1791, 'male', 'AT', [], 'Salzburg, Austria', 'music', [], 1400000, 175, 5, 'S', 'artistic', []],
  ['johann-sebastian-bach', 'Johann Sebastian Bach', 'Bach', 1685, 1750, 'male', 'DE', [], 'Eisenach, Germany', 'music', [], 900000, 155, 4, 'A', 'artistic', []],
  ['miriam-makeba', 'Miriam Makeba', 'Makeba', 1932, 2008, 'female', 'ZA', [], 'Johannesburg, South Africa', 'music', ['activism'], 200000, 45, 4, 'B', 'artistic', ['Grammy Award']],
  ['bob-marley', 'Bob Marley', 'Marley', 1945, 1981, 'male', 'JM', [], 'Nine Mile, Jamaica', 'music', [], 1100000, 100, 5, 'A', 'artistic', ['Grammy Lifetime Achievement']],
  ['billie-holiday', 'Billie Holiday', 'Holiday', 1915, 1959, 'female', 'US', [], 'Philadelphia, Pennsylvania', 'music', [], 400000, 65, 4, 'A', 'artistic', ['Grammy Hall of Fame']],
  ['freddie-mercury', 'Freddie Mercury', 'Mercury', 1946, 1991, 'male', 'TZ', ['GB'], 'Stone Town, Zanzibar', 'music', [], 1200000, 90, 5, 'A', 'artistic', ['Brit Award']],
  ['ravi-shankar', 'Ravi Shankar', 'Shankar', 1920, 2012, 'male', 'IN', [], 'Varanasi, India', 'music', [], 250000, 50, 5, 'B', 'artistic', ['Grammy Award', 'Bharat Ratna']],
  ['fela-kuti', 'Fela Kuti', 'Fela', 1938, 1997, 'male', 'NG', [], 'Abeokuta, Nigeria', 'music', ['activism'], 300000, 40, 3, 'B', 'artistic', []],
  ['maria-callas', 'Maria Callas', 'Callas', 1923, 1977, 'female', 'US', ['GR'], 'New York, United States', 'music', [], 400000, 80, 5, 'A', 'artistic', []],
  ['beyonce', 'Beyoncé', 'Beyoncé', 1981, null, 'female', 'US', [], 'Houston, Texas', 'music', [], 1500000, 80, 15, 'A', 'artistic', ['Grammy Award']],
  ['umm-kulthum', 'Umm Kulthum', 'Umm Kulthum', 1904, 1975, 'female', 'EG', [], 'Tamay ez-Zahayra, Egypt', 'music', [], 500000, 45, 4, 'A', 'artistic', ['Order of the Republic']],
  ['bob-dylan', 'Bob Dylan', 'Dylan', 1941, null, 'male', 'US', [], 'Duluth, Minnesota', 'music', ['literature'], 800000, 110, 10, 'A', 'artistic', ['Nobel Prize in Literature', 'Grammy Award']],
  ['frederic-chopin', 'Frédéric Chopin', 'Chopin', 1810, 1849, 'male', 'PL', ['FR'], 'Żelazowa Wola, Poland', 'music', [], 700000, 130, 4, 'A', 'artistic', []],

  // ===== LITERATURE (15) =====
  ['william-shakespeare', 'William Shakespeare', 'Shakespeare', 1564, 1616, 'male', 'GB', [], 'Stratford-upon-Avon, England', 'literature', [], 2200000, 185, 5, 'S', 'artistic', []],
  ['toni-morrison', 'Toni Morrison', 'Morrison', 1931, 2019, 'female', 'US', [], 'Lorain, Ohio', 'literature', [], 400000, 55, 8, 'A', 'artistic', ['Nobel Prize in Literature', 'Pulitzer Prize']],
  ['leo-tolstoy', 'Leo Tolstoy', 'Tolstoy', 1828, 1910, 'male', 'RU', [], 'Yasnaya Polyana, Russia', 'literature', [], 700000, 140, 4, 'A', 'artistic', []],
  ['gabriel-garcia-marquez', 'Gabriel García Márquez', 'García Márquez', 1927, 2014, 'male', 'CO', [], 'Aracataca, Colombia', 'literature', [], 500000, 90, 6, 'A', 'artistic', ['Nobel Prize in Literature']],
  ['murasaki-shikibu', 'Murasaki Shikibu', 'Murasaki', 978, 1014, 'female', 'JP', [], 'Kyoto, Japan', 'literature', [], 200000, 55, 2, 'A', 'artistic', []],
  ['chinua-achebe', 'Chinua Achebe', 'Achebe', 1930, 2013, 'male', 'NG', [], 'Ogidi, Nigeria', 'literature', [], 250000, 50, 5, 'B', 'artistic', ['Man Booker International Prize']],
  ['virginia-woolf', 'Virginia Woolf', 'Woolf', 1882, 1941, 'female', 'GB', [], 'London, England', 'literature', [], 600000, 95, 4, 'A', 'artistic', []],
  ['homer', 'Homer', 'Homer', -750, -700, 'male', 'GR', [], 'Ionia, Greece', 'literature', [], 800000, 145, 2, 'S', 'artistic', []],
  ['rabindranath-tagore', 'Rabindranath Tagore', 'Tagore', 1861, 1941, 'male', 'IN', [], 'Calcutta, India', 'literature', ['music'], 500000, 90, 5, 'A', 'artistic', ['Nobel Prize in Literature']],
  ['franz-kafka', 'Franz Kafka', 'Kafka', 1883, 1924, 'male', 'CZ', [], 'Prague, Czech Republic', 'literature', [], 700000, 110, 3, 'A', 'artistic', []],
  ['maya-angelou', 'Maya Angelou', 'Angelou', 1928, 2014, 'female', 'US', [], 'St. Louis, Missouri', 'literature', ['activism'], 500000, 55, 8, 'A', 'artistic', ['Presidential Medal of Freedom']],
  ['jorge-luis-borges', 'Jorge Luis Borges', 'Borges', 1899, 1986, 'male', 'AR', [], 'Buenos Aires, Argentina', 'literature', [], 400000, 75, 4, 'A', 'artistic', ['Jerusalem Prize']],
  ['wole-soyinka', 'Wole Soyinka', 'Soyinka', 1934, null, 'male', 'NG', [], 'Abeokuta, Nigeria', 'literature', [], 150000, 50, 4, 'B', 'artistic', ['Nobel Prize in Literature']],
  ['mary-shelley', 'Mary Shelley', 'Shelley', 1797, 1851, 'female', 'GB', [], 'London, England', 'literature', [], 600000, 80, 3, 'B', 'artistic', []],
  ['james-baldwin', 'James Baldwin', 'Baldwin', 1924, 1987, 'male', 'US', [], 'Harlem, New York', 'literature', ['activism'], 400000, 45, 4, 'B', 'artistic', []],

  // ===== PHILOSOPHY (8) =====
  ['aristotle', 'Aristotle', 'Aristotle', -384, -322, 'male', 'GR', [], 'Stagira, Greece', 'philosophy', ['science'], 1200000, 175, 3, 'S', 'theoretical', []],
  ['plato', 'Plato', 'Plato', -428, -348, 'male', 'GR', [], 'Athens, Greece', 'philosophy', [], 1000000, 165, 3, 'S', 'theoretical', []],
  ['confucius', 'Confucius', 'Confucius', -551, -479, 'male', 'CN', [], 'Qufu, China', 'philosophy', [], 800000, 140, 3, 'S', 'theoretical', []],
  ['simone-de-beauvoir', 'Simone de Beauvoir', 'de Beauvoir', 1908, 1986, 'female', 'FR', [], 'Paris, France', 'philosophy', ['literature'], 400000, 90, 4, 'A', 'theoretical', ['Jerusalem Prize']],
  ['immanuel-kant', 'Immanuel Kant', 'Kant', 1724, 1804, 'male', 'DE', [], 'Königsberg, Prussia', 'philosophy', [], 600000, 145, 3, 'A', 'theoretical', []],
  ['ibn-khaldun', 'Ibn Khaldun', 'Ibn Khaldun', 1332, 1406, 'male', 'TN', [], 'Tunis, Tunisia', 'philosophy', [], 300000, 70, 2, 'A', 'theoretical', []],
  ['friedrich-nietzsche', 'Friedrich Nietzsche', 'Nietzsche', 1844, 1900, 'male', 'DE', [], 'Röcken, Germany', 'philosophy', [], 800000, 130, 3, 'A', 'theoretical', []],
  ['hannah-arendt', 'Hannah Arendt', 'Arendt', 1906, 1975, 'female', 'DE', ['US'], 'Linden, Germany', 'philosophy', ['politics'], 350000, 75, 4, 'A', 'theoretical', ['Sonning Prize']],

  // ===== BUSINESS (8) =====
  ['steve-jobs', 'Steve Jobs', 'Jobs', 1955, 2011, 'male', 'US', [], 'San Francisco, California', 'business', ['engineering'], 1200000, 110, 6, 'A', 'practical', ['National Medal of Technology']],
  ['madam-cj-walker', 'Madam C.J. Walker', 'Walker', 1867, 1919, 'female', 'US', [], 'Delta, Louisiana', 'business', [], 200000, 25, 3, 'B', 'practical', []],
  ['henry-ford', 'Henry Ford', 'Ford', 1863, 1947, 'male', 'US', [], 'Dearborn, Michigan', 'business', ['engineering'], 700000, 115, 5, 'A', 'practical', ['Presidential Medal of Freedom']],
  ['coco-chanel', 'Coco Chanel', 'Chanel', 1883, 1971, 'female', 'FR', [], 'Saumur, France', 'business', ['art'], 600000, 85, 4, 'A', 'artistic', ['Neiman Marcus Fashion Award']],
  ['elon-musk', 'Elon Musk', 'Musk', 1971, null, 'male', 'ZA', ['US'], 'Pretoria, South Africa', 'business', ['engineering'], 1500000, 85, 5, 'A', 'practical', ['Royal Aeronautical Society Gold Medal']],
  ['andrew-carnegie', 'Andrew Carnegie', 'Carnegie', 1835, 1919, 'male', 'GB', ['US'], 'Dunfermline, Scotland', 'business', [], 400000, 75, 4, 'B', 'practical', []],
  ['oprah-winfrey', 'Oprah Winfrey', 'Oprah', 1954, null, 'female', 'US', [], 'Kosciusko, Mississippi', 'business', [], 800000, 70, 8, 'A', 'social', ['Presidential Medal of Freedom']],
  ['jack-ma', 'Jack Ma', 'Ma', 1964, null, 'male', 'CN', [], 'Hangzhou, China', 'business', [], 500000, 55, 3, 'B', 'practical', []],

  // ===== FILM (8) =====
  ['charlie-chaplin', 'Charlie Chaplin', 'Chaplin', 1889, 1977, 'male', 'GB', ['US'], 'London, England', 'film', [], 900000, 145, 6, 'A', 'artistic', ['Academy Honorary Award']],
  ['akira-kurosawa', 'Akira Kurosawa', 'Kurosawa', 1910, 1998, 'male', 'JP', [], 'Tokyo, Japan', 'film', [], 500000, 80, 8, 'A', 'artistic', ['Academy Award', 'Order of Culture']],
  ['meryl-streep', 'Meryl Streep', 'Streep', 1949, null, 'female', 'US', [], 'Summit, New Jersey', 'film', [], 600000, 65, 12, 'A', 'artistic', ['Academy Award']],
  ['satyajit-ray', 'Satyajit Ray', 'Ray', 1921, 1992, 'male', 'IN', [], 'Calcutta, India', 'film', [], 300000, 55, 6, 'A', 'artistic', ['Academy Honorary Award', 'Bharat Ratna']],
  ['hayao-miyazaki', 'Hayao Miyazaki', 'Miyazaki', 1941, null, 'male', 'JP', [], 'Tokyo, Japan', 'film', ['art'], 600000, 70, 6, 'A', 'artistic', ['Academy Award']],
  ['hedy-lamarr', 'Hedy Lamarr', 'Lamarr', 1914, 2000, 'female', 'AT', ['US'], 'Vienna, Austria', 'film', ['engineering'], 350000, 60, 3, 'B', 'artistic', ['BULBIE Gnass Spirit of Achievement Award']],
  ['ousmane-sembene', 'Ousmane Sembène', 'Sembène', 1923, 2007, 'male', 'SN', [], 'Ziguinchor, Senegal', 'film', ['literature'], 80000, 25, 4, 'B', 'artistic', []],
  ['alfred-hitchcock', 'Alfred Hitchcock', 'Hitchcock', 1899, 1980, 'male', 'GB', ['US'], 'London, England', 'film', [], 800000, 115, 8, 'A', 'artistic', ['AFI Life Achievement Award']],

  // ===== MATHEMATICS (7) =====
  ['euclid', 'Euclid', 'Euclid', -300, -270, 'male', 'GR', [], 'Alexandria, Egypt', 'mathematics', [], 500000, 130, 2, 'A', 'theoretical', []],
  ['ada-lovelace', 'Ada Lovelace', 'Lovelace', 1815, 1852, 'female', 'GB', [], 'London, England', 'mathematics', ['engineering'], 500000, 75, 3, 'A', 'theoretical', []],
  ['alan-turing', 'Alan Turing', 'Turing', 1912, 1954, 'male', 'GB', [], 'London, England', 'mathematics', ['engineering'], 1000000, 110, 5, 'A', 'theoretical', ['Order of the British Empire']],
  ['emmy-noether', 'Emmy Noether', 'Noether', 1882, 1935, 'female', 'DE', [], 'Erlangen, Germany', 'mathematics', [], 200000, 65, 3, 'B', 'theoretical', []],
  ['maryam-mirzakhani', 'Maryam Mirzakhani', 'Mirzakhani', 1977, 2017, 'female', 'IR', [], 'Tehran, Iran', 'mathematics', [], 250000, 45, 4, 'B', 'theoretical', ['Fields Medal']],
  ['carl-friedrich-gauss', 'Carl Friedrich Gauss', 'Gauss', 1777, 1855, 'male', 'DE', [], 'Brunswick, Germany', 'mathematics', ['science'], 500000, 130, 5, 'A', 'theoretical', ['Copley Medal']],
  ['hypatia', 'Hypatia', 'Hypatia', 360, 415, 'female', 'EG', [], 'Alexandria, Egypt', 'mathematics', ['philosophy'], 300000, 65, 2, 'B', 'theoretical', []],

  // ===== ENGINEERING (6) =====
  ['james-watt', 'James Watt', 'Watt', 1736, 1819, 'male', 'GB', [], 'Greenock, Scotland', 'engineering', [], 400000, 110, 3, 'A', 'practical', ['Fellow of the Royal Society']],
  ['isambard-kingdom-brunel', 'Isambard Kingdom Brunel', 'Brunel', 1806, 1859, 'male', 'GB', [], 'Portsmouth, England', 'engineering', [], 250000, 50, 3, 'B', 'practical', []],
  ['grace-hopper', 'Grace Hopper', 'Hopper', 1906, 1992, 'female', 'US', [], 'New York City, New York', 'engineering', ['mathematics'], 350000, 45, 5, 'A', 'practical', ['Presidential Medal of Freedom']],
  ['wernher-von-braun', 'Wernher von Braun', 'von Braun', 1912, 1977, 'male', 'DE', ['US'], 'Wirsitz, Germany', 'engineering', [], 350000, 75, 4, 'B', 'practical', ['National Medal of Science']],
  ['tim-berners-lee', 'Tim Berners-Lee', 'Berners-Lee', 1955, null, 'male', 'GB', [], 'London, England', 'engineering', [], 600000, 85, 8, 'A', 'practical', ['Turing Award', 'Order of Merit']],
  ['cai-lun', 'Cai Lun', 'Cai Lun', 50, 121, 'male', 'CN', [], 'Guiyang, China', 'engineering', [], 200000, 60, 1, 'A', 'practical', []],

  // ===== MEDICINE (5) =====
  ['hippocrates', 'Hippocrates', 'Hippocrates', -460, -370, 'male', 'GR', [], 'Kos, Greece', 'medicine', [], 500000, 120, 2, 'A', 'theoretical', []],
  ['florence-nightingale', 'Florence Nightingale', 'Nightingale', 1820, 1910, 'female', 'GB', [], 'Florence, Italy', 'medicine', [], 600000, 100, 5, 'A', 'practical', ['Royal Red Cross']],
  ['jonas-salk', 'Jonas Salk', 'Salk', 1914, 1995, 'male', 'US', [], 'New York City, New York', 'medicine', [], 400000, 65, 6, 'A', 'practical', ['Presidential Medal of Freedom']],
  ['avicenna', 'Avicenna', 'Avicenna', 980, 1037, 'male', 'IR', [], 'Afshona, Bukhara', 'medicine', ['philosophy'], 400000, 95, 3, 'A', 'theoretical', []],
  ['elizabeth-blackwell', 'Elizabeth Blackwell', 'Blackwell', 1821, 1910, 'female', 'GB', ['US'], 'Bristol, England', 'medicine', [], 200000, 45, 3, 'B', 'practical', []],

  // ===== EXPLORATION (5) =====
  ['marco-polo', 'Marco Polo', 'Polo', 1254, 1324, 'male', 'IT', [], 'Venice, Italy', 'exploration', [], 600000, 120, 2, 'A', 'practical', []],
  ['amelia-earhart', 'Amelia Earhart', 'Earhart', 1897, 1937, 'female', 'US', [], 'Atchison, Kansas', 'exploration', [], 700000, 75, 4, 'A', 'practical', ['Distinguished Flying Cross']],
  ['neil-armstrong', 'Neil Armstrong', 'Armstrong', 1930, 2012, 'male', 'US', [], 'Wapakoneta, Ohio', 'exploration', ['engineering'], 1000000, 120, 6, 'A', 'practical', ['Presidential Medal of Freedom', 'Congressional Gold Medal']],
  ['zheng-he', 'Zheng He', 'Zheng He', 1371, 1433, 'male', 'CN', [], 'Kunyang, China', 'exploration', ['military'], 300000, 60, 2, 'B', 'practical', []],
  ['ibn-battuta', 'Ibn Battuta', 'Ibn Battuta', 1304, 1369, 'male', 'MA', [], 'Tangier, Morocco', 'exploration', [], 350000, 70, 2, 'B', 'practical', []],

  // ===== RELIGION (5) =====
  ['jesus-christ', 'Jesus Christ', 'Jesus', -4, 30, 'male', 'IL', [], 'Bethlehem, Judea', 'religion', [], 3000000, 190, 3, 'S', 'spiritual', []],
  ['prophet-muhammad', 'Prophet Muhammad', 'Muhammad', 570, 632, 'male', 'SA', [], 'Mecca, Arabia', 'religion', ['politics'], 2500000, 170, 3, 'S', 'spiritual', []],
  ['siddhartha-gautama', 'Siddhartha Gautama', 'Buddha', -563, -483, 'male', 'NP', [], 'Lumbini, Nepal', 'religion', ['philosophy'], 800000, 120, 2, 'S', 'spiritual', []],
  ['martin-luther', 'Martin Luther', 'Luther', 1483, 1546, 'male', 'DE', [], 'Eisleben, Germany', 'religion', [], 600000, 130, 3, 'A', 'spiritual', []],
  ['rumi', 'Rumi', 'Rumi', 1207, 1273, 'male', 'AF', [], 'Balkh, Afghanistan', 'religion', ['literature'], 700000, 80, 3, 'A', 'spiritual', []],

  // ===== ACTIVISM (10) =====
  ['martin-luther-king-jr', 'Martin Luther King Jr.', 'MLK', 1929, 1968, 'male', 'US', [], 'Atlanta, Georgia', 'activism', [], 1500000, 130, 8, 'S', 'social', ['Nobel Peace Prize']],
  ['rosa-parks', 'Rosa Parks', 'Parks', 1913, 2005, 'female', 'US', [], 'Tuskegee, Alabama', 'activism', [], 700000, 80, 6, 'A', 'social', ['Presidential Medal of Freedom', 'Congressional Gold Medal']],
  ['malala-yousafzai', 'Malala Yousafzai', 'Malala', 1997, null, 'female', 'PK', [], 'Mingora, Pakistan', 'activism', [], 600000, 75, 6, 'B', 'social', ['Nobel Peace Prize']],
  ['harriet-tubman', 'Harriet Tubman', 'Tubman', 1822, 1913, 'female', 'US', [], 'Dorchester County, Maryland', 'activism', [], 600000, 55, 4, 'A', 'social', []],
  ['emmeline-pankhurst', 'Emmeline Pankhurst', 'Pankhurst', 1858, 1928, 'female', 'GB', [], 'Manchester, England', 'activism', [], 300000, 55, 3, 'A', 'social', []],
  ['wangari-maathai', 'Wangari Maathai', 'Maathai', 1940, 2011, 'female', 'KE', [], 'Ihithe, Kenya', 'activism', [], 200000, 50, 5, 'B', 'social', ['Nobel Peace Prize']],
  ['frederick-douglass', 'Frederick Douglass', 'Douglass', 1818, 1895, 'male', 'US', [], 'Cordova, Maryland', 'activism', ['literature'], 500000, 55, 4, 'A', 'social', []],
  ['desmond-tutu', 'Desmond Tutu', 'Tutu', 1931, 2021, 'male', 'ZA', [], 'Klerksdorp, South Africa', 'activism', ['religion'], 400000, 75, 8, 'A', 'social', ['Nobel Peace Prize']],
  ['sojourner-truth', 'Sojourner Truth', 'Truth', 1797, 1883, 'female', 'US', [], 'Swartekill, New York', 'activism', [], 300000, 40, 3, 'B', 'social', []],
  ['sor-juana-ines-de-la-cruz', 'Sor Juana Inés de la Cruz', 'Sor Juana', 1648, 1695, 'female', 'MX', [], 'San Miguel Nepantla, Mexico', 'activism', ['literature'], 200000, 40, 2, 'B', 'artistic', []],

  // ===== MILITARY (5) =====
  ['alexander-the-great', 'Alexander the Great', 'Alexander', -356, -323, 'male', 'GR', [], 'Pella, Macedon', 'military', ['politics'], 1500000, 170, 3, 'S', 'political', []],
  ['napoleon-bonaparte', 'Napoleon Bonaparte', 'Napoleon', 1769, 1821, 'male', 'FR', [], 'Ajaccio, Corsica', 'military', ['politics'], 1400000, 175, 4, 'A', 'political', []],
  ['sun-tzu', 'Sun Tzu', 'Sun Tzu', -544, -496, 'male', 'CN', [], 'Qi, China', 'military', ['philosophy'], 800000, 100, 2, 'A', 'theoretical', []],
  ['joan-of-arc', 'Joan of Arc', 'Joan of Arc', 1412, 1431, 'female', 'FR', [], 'Domrémy, France', 'military', ['religion'], 900000, 130, 3, 'A', 'spiritual', []],
  ['shaka-zulu', 'Shaka Zulu', 'Shaka', 1787, 1828, 'male', 'ZA', [], 'KwaZulu-Natal, South Africa', 'military', [], 300000, 50, 2, 'B', 'political', []],

  // ===== ADDITIONAL (3) =====
  ['bruce-lee', 'Bruce Lee', 'Lee', 1940, 1973, 'male', 'US', ['HK'], 'San Francisco, California', 'film', ['philosophy'], 900000, 90, 4, 'B', 'artistic', ['Golden Horse Award']],
  ['marie-antoinette', 'Marie Antoinette', 'Antoinette', 1755, 1793, 'female', 'AT', ['FR'], 'Vienna, Austria', 'politics', [], 700000, 100, 2, 'B', 'political', []],
  ['sitting-bull', 'Sitting Bull', 'Sitting Bull', 1831, 1890, 'male', 'US', [], 'Grand River, South Dakota', 'activism', ['military'], 300000, 50, 2, 'B', 'political', []],
];

export const people: Person[] = data.map(p);

export const peopleById = new Map<string, Person>(
  people.map(person => [person.id, person])
);
