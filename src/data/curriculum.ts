export interface Topic {
  id: string;
  title: string;
  titleUk: string;
  category: 'Grammar' | 'Vocabulary' | 'Skills';
  description: string;
  descriptionUk: string;
}

export const curriculum: Topic[] = [
  // Grammar
  {
    id: 'present-perfect-past-simple',
    title: 'Present Perfect vs Past Simple',
    titleUk: 'Present Perfect проти Past Simple',
    category: 'Grammar',
    description: 'When to use have done vs did.',
    descriptionUk: 'Коли використовувати доконаний час, а коли минулий неозначений.'
  },
  {
    id: 'passive-voice',
    title: 'Passive Voice',
    titleUk: 'Пасивний стан',
    category: 'Grammar',
    description: 'Formation and usage of passive structures.',
    descriptionUk: 'Утворення та вживання пасивних конструкцій.'
  },
  {
    id: 'conditionals-1-2',
    title: 'First and Second Conditionals',
    titleUk: 'Перший та другий типи умовних речень',
    category: 'Grammar',
    description: 'Real vs imaginary situations.',
    descriptionUk: 'Реальні та уявні ситуації в теперішньому та майбутньому.'
  },
  {
    id: 'modals-probability',
    title: 'Modals of Probability',
    titleUk: 'Модальні дієслова ймовірності',
    category: 'Grammar',
    description: 'Must, might, could, can\'t for deduction.',
    descriptionUk: 'Вживання must, might, could, can\'t для висловлення припущень.'
  },
  {
    id: 'used-to-get-used-to',
    title: 'Used to / Get used to',
    titleUk: 'Used to / Get used to',
    category: 'Grammar',
    description: 'Past habits vs becoming familiar with something.',
    descriptionUk: 'Минулі звички проти процесу звикання до чогось.'
  },

  // Vocabulary
  {
    id: 'work-and-career',
    title: 'Work and Career',
    titleUk: 'Робота та кар\'єра',
    category: 'Vocabulary',
    description: 'Jobs, duties, and workplace communication.',
    descriptionUk: 'Професії, обов\'язки та спілкування на робочому місці.'
  },
  {
    id: 'travel-and-transport',
    title: 'Travel and Transport',
    titleUk: 'Подорожі та транспорт',
    category: 'Vocabulary',
    description: 'Booking trips, airports, and sightseeing.',
    descriptionUk: 'Бронювання поїздок, аеропорти та визначні пам\'ятки.'
  },
  {
    id: 'environment-and-nature',
    title: 'Environment and Nature',
    titleUk: 'Довкілля та природа',
    category: 'Vocabulary',
    description: 'Climate change, pollution, and wildlife.',
    descriptionUk: 'Зміна клімату, забруднення та дика природа.'
  },
  {
    id: 'phrasal-verbs-common',
    title: 'Common Phrasal Verbs',
    titleUk: 'Поширені фразові дієслова',
    category: 'Vocabulary',
    description: 'Essential multi-word verbs for B1.',
    descriptionUk: 'Основні багатослівні дієслова для рівня B1.'
  },

  // Skills
  {
    id: 'writing-emails',
    title: 'Writing Emails',
    titleUk: 'Написання електронних листів',
    category: 'Skills',
    description: 'Formal and informal email structures.',
    descriptionUk: 'Структура формальних та неформальних листів.'
  },
  {
    id: 'opinions-and-arguments',
    title: 'Expressing Opinions',
    titleUk: 'Висловлення думок',
    category: 'Skills',
    description: 'Agreeing, disagreeing, and justifying views.',
    descriptionUk: 'Згода, незгода та аргументація своєї позиції.'
  },
  {
    id: 'describing-experiences',
    title: 'Describing Experiences',
    titleUk: 'Опис досвіду',
    category: 'Skills',
    description: 'Telling stories and relating events in the past.',
    descriptionUk: 'Розповідь історій та опис подій у минулому.'
  }
];
