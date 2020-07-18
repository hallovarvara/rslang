import soundError from '../assets/audio/error.mp3';
import soundSuccess from '../assets/audio/success.mp3';
import soundFinish from '../assets/audio/finish.mp3';

import Varya from '../assets/images/team/varvara-deviaterikova.jpg';
import Ksusha from '../assets/images/team/kseniya-yatskevich.jpeg';
import Max from '../assets/images/team/maksym-kaspriv.jpg';
import Artem from '../assets/images/team/artem-rimarchyk.jpeg';
import Dima from '../assets/images/team/dmitry-lebetsky.jpg';
import Lesha from '../assets/images/team/alexei-osipov.jpg';

import SavannahIcon from '../assets/icons/icon-game-savannah.png';
import SprintIcon from '../assets/icons/icon-game-sprint.png';
import AudiocallIcon from '../assets/icons/icon-game-audiocall.png';
import EnglishPuzzleIcon from '../assets/icons/icon-game-english-puzzle.png';
import SpeakitIcon from '../assets/icons/icon-game-speakit.png';
import UnmessIcon from '../assets/icons/icon-game-unmess.png';

const apiLinks = {
  file: 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/',
  base: 'https://kagafon-learn-words.herokuapp.com/',
  // base: 'https://afternoon-falls-25894.herokuapp.com/',
  paintings: 'https://raw.githubusercontent.com/hallovarvara/rslang_data_paintings/master/',
};

const localStorageItems = {
  username: 'rslangName',
  token: 'rslangToken',
  userId: 'rslangUserId',
  refreshTokenDate: 'refreshTokenDate',
};

export const applicationThings = {
  LEARN_WORDS: 'learnWords',
  SAVANNAH: 'savannah',
  SPRINT: 'sprint',
  AUDIOCALL: 'audiocall',
  SPEAK_IT: 'speakIt',
  PUZZLE: 'puzzle',
  UNMESS: 'unmess',
};

export const userSettingsTemplate = {
  IS_SHOWN_COMPLICATED_BUTTON: 'isShownComplicatedButton',
  IS_SHOWN_ANSWER_BUTTON: 'isShownAnswerButton',
  IS_SHOWN_IMAGE_ASSOCIATION: 'isShownImageAssociation',
  IS_SHOWN_TRANSLATION: 'isShownTranslation',
  IS_SHOWN_TRANSCRIPTION: 'isShownTranscription',
  IS_SHOWN_EXAMPLE_SENTENCE: 'isShownExampleSentence',
  IS_SHOWN_MEANING: 'isShownMeaning',
};

const preloaderdefaultSettings = {
  size: 100,
  color: '#843FDD',
};

export const levelsOfDifficulty = {
  HARD: 'hard',
  NORMAL: 'normal',
  EASY: 'easy',
};

export const dateFormatTemplate = 'DD.MM.YYYY';

const linkedinLink = 'https://www.linkedin.com/in/';
const promoVideoLink = 'https://www.w3schools.com/html/mov_bbb.mp4';

const pagesData = {
  aboutUs: {
    title: 'Кто мы',
    path: 'about-us',
    guest: { isVisible: true, index: 3 },
    user: { isVisible: true, index: 2 },
  },
  learnWords: {
    title: 'Изучение слов',
    description: 'Расширяйте английский лексикон с помощью встроенных правил повторения слов',
    rules: 'Впишите правильное слово в предложение',
    rateDescription: 'Оцените, насколько легко было угадать слово:',
    path: 'learn',
    guest: { isVisible: true, index: 1 },
    user: { isVisible: true, index: 0 },
  },
  play: {
    title: 'Играть',
    path: 'play',
    guest: { isVisible: true, index: 2 },
    user: { isVisible: true, index: 1 },
  },
  promo: {
    title: 'О проекте',
    path: '',
    guest: { isVisible: true, index: 0 },
    user: { isVisible: true, index: 3 },
  },
  settings: {
    title: 'Настройки',
    path: 'settings',
    guest: { isVisible: false },
    user: { isVisible: false, index: 5 },
  },
  signIn: {
    title: 'Войти',
    path: 'sign-in',
    guest: { isVisible: false, index: 4 },
    user: { isVisible: false },
  },
  signOut: {
    title: 'Выйти',
    path: 'sign-in',
    guest: { isVisible: false },
    user: { isVisible: false },
  },
  register: {
    title: 'Зарегистрироваться',
    path: 'register',
    guest: { isVisible: false },
    user: { isVisible: false },
  },
  statistics: {
    title: 'Статистика',
    path: 'statistics',
    guest: { isVisible: false },
    user: { isVisible: true, index: 4 },
  },
  vocabulary: {
    title: 'Словарь',
    path: 'vocabulary',
    guest: { isVisible: false },
    user: { isVisible: false },
  },
};

const gamesData = {
  audiocall: {
    title: 'Аудиовызов',
    description: 'Прокачивайте восприятие языка на&nbsp;слух, а&nbsp;также увеличивайте свой словарный запас',
    path: 'audiocall',
    icon: AudiocallIcon,
  },
  savannah: {
    title: 'Саванна',
    description: 'Угадывайте, как переводятся слова, и&nbsp;вместе с&nbsp;этим пополняйте лексикон',
    path: 'savannah',
    icon: SavannahIcon,
  },
  sprint: {
    title: 'Спринт',
    description: 'Играйте на&nbsp;время, чтобы точно знать, как много слов вы&nbsp;можете перевести за&nbsp;минуту',
    path: 'sprint',
    icon: SprintIcon,
  },
  englishPuzzle: {
    title: 'English Puzzle',
    description: 'Учитесь строить предложения и&nbsp;знакомьтесь с&nbsp;величайшими произведениями искусства',
    path: 'english-puzzle',
    icon: EnglishPuzzleIcon,
  },
  speakit: {
    title: 'SpeakIt',
    description: 'Вырабатывайте правильное произношение слов вместе с&nbsp;нашей космической игрой',
    path: 'speakit',
    startPath: 'speakit/home',
    icon: SpeakitIcon,
  },
  unmess: {
    title: 'Unmess',
    description: 'Соединяйте слова и&nbsp;их&nbsp;значения, расширяя запас слов и&nbsp;улучшая понимание смысла фраз',
    path: 'unmess',
    startPath: 'unmess/home',
    icon: UnmessIcon,
  },
};

const teamMembers = [
  {
    name: 'Варвара',
    surname: 'Девятерикова',
    role: 'Тимлид. Проектировала и оформляла, верстала, тестировала, стыковала команду и код. Настроила git, сделала доску задач и заполняла ее. Создала инструкции по Git и совместной работе, планировала, устраивала встречи и вела заметки по ним, помогала команде и презентовала проект',
    image: Varya,
    linkedinUsername: 'hallovarvara',
  },
  {
    name: 'Максим',
    surname: 'Касприв',
    role: 'Придумал, внедрил и презентовал алгоритм интервального повторения слов, реализовал изучение слов, настраиваемые сервисы для получения слов, модели данных для статистики, настроек и общую для проекта. Снял 2 обучающих видео, разобрался в устройстве бэкэнда и помогал команде',
    image: Max,
    linkedinUsername: 'maksym-kaspriv',
  },
  {
    name: 'Дмитрий',
    surname: 'Лебецкий',
    role: `Сделал игры ${gamesData.speakit.title} и ${gamesData.unmess.title} с уникальным дизайном, базовые компоненты и страницы, словарь. Верстал, стилизовал, структурировал код, помогал тимлиду и команде`,
    image: Dima,
    linkedinUsername: 'dmitry-lebetsky',
  },
  {
    name: 'Артем',
    surname: 'Римарчук',
    role: `Сделал игры ${gamesData.sprint.title} и ${gamesData.savannah.title}, статистику, авторизацию, регистрацию. Разработал сервисы для получения слов в модулях приложения, фильтрации данных пользователя для бэкэнда и отправки данных на бэкэнд, активно исправлял ошибки приложения`,
    image: Artem,
    linkedinUsername: 'artemrimarchyk',
  },
  {
    name: 'Ксения',
    surname: 'Яцкевич',
    role: `Сделала игры ${gamesData.audiocall.title} и ${gamesData.englishPuzzle.title}, настраивала окружение проекта, устанавливала необходимый для работы инструментарий`,
    image: Ksusha,
    linkedinUsername: 'ksenia-yatskevich',
  },
  {
    name: 'Алексей',
    surname: 'Осипов',
    role: 'Разработал базовую структуру страницы словаря',
    image: Lesha,
    linkedinUsername: '',
  },
];

const vocabularySelectorOptions = [
  'изучаемые', 'сложные', 'удаленные',
];

/* Games */

const audio = {
  error: 'error.mp3',
  success: 'success.mp3',
  win: 'finish.mp3',
};

const text = {
  ru: {
    /* About us */
    aboutUs: {
      description: 'Привет! Мы рады представить продукт нашей совместной работы — приложение по изучению английского языка',
    },

    /* Sign In, Register */
    nickname: 'Логин',
    email: 'Емейл',
    password: 'Пароль',
    repeatPassword: 'Повторите пароль',
    alreadyRegistered: 'Уже зарегистрированы?',
    firstTimeOrForgotPassword: 'Впервые тут или забыли пароль?',
    incorrectLoginData: 'Вы ввели неправильный логин или пароль. Попробуйте снова',
    userUndefined: 'Емейл не зарегистрирован. Проверьте правильность его написания или зарегистрируйтесь',
    welcome: 'Привет, {username} :)',

    /* Play page */
    chooseGame: 'Выберите игру',
    everyGameImprove: 'Каждая игра улучшит отдельный набор знаний и&nbsp;умений',

    /* Vocabulary page */
    restoreForLearning: 'Вернуть к изучаемым',

    /* Promo */
    promo: {
      title: 'Сделаем английский вашей любимой привычкой',
      subtitle: 'Расширим ваш словарный запас, чтобы открыть для вас мир без границ',
      features: [
        {
          title: 'Уютно и&nbsp;безопасно',
          description: 'Учитесь и&nbsp;играйте онлайн из&nbsp;любой точки мира со&nbsp;смартфона, планшета или компьютера',
        },
        {
          title: 'Бесплатно',
          description: 'Уникальный алгоритм изучения слов и&nbsp;6&nbsp;игр, расширяющих словарный запас и&nbsp;умение быстро им&nbsp;воспользоваться',
        },
        {
          title: 'Весело и&nbsp;продуктивно',
          description: '7&nbsp;способов изучения слов в&nbsp;игровой форме и&nbsp;уникальный алгоритм интервального повторения',
        },
      ],
      chooseAnotherGame: 'или выберите другую игру',
    },

    spacingRepeatition: {
      youStudyEffectively: 'Ваше обучение будет продуктивным благодаря нашей инновационной разработке',
      title: 'Методика интервального повторения',
      subtitle: 'У&nbsp;каждого из&nbsp;3600 английских слов в&nbsp;нашем словаре собственный график изучения, на&nbsp;который влияет:',
      factors: [
        {
          title: 'Как вы&nbsp;сами оцениваете слово во&nbsp;время изучения&nbsp;&mdash; сложное, нормальное или легкое оно для вас',
          algorithm: [
            {
              action: 'Пометка слова легким во&nbsp;время изучения слова',
              target: 'Прогресс изучения',
              result: 'Растет на&nbsp;треть',
            },
            {
              action: 'Пометка слова трудным во&nbsp;время изучения слова',
              target: 'Прогресс изучения',
              result: 'Уменьшается на&nbsp;пятую часть',
            },
          ],
        },
        {
          title: 'Ошибались&nbsp;ли вы&nbsp;во&nbsp;время изучения слов',
          algorithm: [{
            action: 'Ошибка во&nbsp;время написания слова в&nbsp;процессе изучения',
            target: 'Слово',
            result: 'Повторится в&nbsp;текущей тренировке',
          }],
        },
        {
          title: 'Угадали&nbsp;ли вы&nbsp;слово во&nbsp;время игры',
          algorithm: [{
            action: 'Если не&nbsp;угадали слово в&nbsp;игре',
            target: 'Слово',
            result: 'Появится в&nbsp;предстоящей тренировке',
          }],
        },
      ],
    },

    /* Games */
    game: 'Игра',
    levelsTitles: ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый', 'Шестой'],
    answersCorrect: 'Угадано',
    answersMistaken: 'Не угадано',
    howManyAnswers: 'Сколько показывать вариантов ответа',
    howManyWords: 'Сколько слов хотите угадать',
    chooseLevel: 'Выберите уровень сложности',
    choosePage: 'Выберите набор слов',
    selectOptionsForUsedWord: ['изученные слова', 'новые слова'],
    studiedByYou: 'изученные слова',
    newByComplexity: 'новые слова',
    newGame: 'Новая игра',
    restart: 'Сначала',
    speakPlease: 'Нажмите и произносите слова',
    results: 'Результаты',
    return: 'Назад',
    currentResults: 'Текущие результаты',
    notEnoughWords: '* Если в словаре недостаточно слов для игр, слова будут появляться из выбранного уровня',

    /* Unmess */
    unmess: {
      instruction: 'Схватите слово и отпустите над его значением',
    },

    /* audioCall */
    audioCall: {
      instruction: 'Прослушайте слово и выберите его правильный перевод',
    },

    /* Speakit */
    speakit: {
      instruction: ['Нажмите на слово, чтобы услышать его произношение.', 'Нажмите на кнопку и произнесите слово в микрофон.'],
      mistakes: 'Ошибок',
      know: 'Знаю',
      noResults: 'У вас еще нет результатов :(',
    },

    /* Buttons */
    button: {
      next: 'Далее',
      dontKnow: 'Не знаю',
      startGame: 'Играть',
      newGame: 'Начать новую игру',
      check: 'Проверить',
      learnWords: 'Изучать слова',
      learnEnglishWithUs: 'Учите английский с нами',
      startLearningWithUs: 'Начать учиться с нами',
      playRightNow: 'Сыграть прямо сейчас',
      lastResults: 'Последние результаты',
      currentResults: 'Текущие результаты',
    },

    noVideoSupport: 'Извините, ваш браузер не поддерживает встроенное видео',
  },
};

const formLabel = {
  level: 'Уровень',
  chooseLevel: 'Выберите уровень',
  questions: 'Сколько слов хотите отгадать?',
  answers: 'Сколько показывать вариантов ответов?',
};

const questionStatus = {
  success: 'success',
  error: 'error',
};

const ratesScale = [
  { level: 30, rate: 31 },
  { level: 21, rate: 30 },
  { level: 15, rate: 21 },
  { level: 10, rate: 15 },
  { level: 7, rate: 10 },
  { level: 4, rate: 7 },
  { level: 2, rate: 4 },
  { level: 0, rate: 2 },
];

const count = {
  /* API settings */
  groups: 6,
  pages: 29,
  words: 19,
  maxCountQuestions: 12,
  minCountQuestions: 5,
  maxCountAnswers: 5,
  minCountAnswers: 2,

  /* Time */
  minInHour: 60,
  secInMin: 60,
  msInSec: 1000,
  tokenLifetimeInHours: 4,

  /* Defaults */
  elementsPerPage: 10,

  /* Game Savannah */
  savannah: {
    defaultLevel: 0,
    minAnswers: 2,
    maxAnswers: 5,
    minQuestions: 5,
    maxQuestions: 50,
  },

  /* Game Sprint */
  sprint: {
    counterMultiplier: 2,
    pointsMultiplier: 10,
    correctAnswerOnce: 4,
  },
};

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

export {
  pagesData,
  vocabularySelectorOptions,
  apiLinks,
  promoVideoLink,
  linkedinLink,
  gamesData,
  teamMembers,
  audio,
  formLabel,
  count,
  localStorageItems,
  text,
  soundError,
  soundSuccess,
  soundFinish,
  questionStatus,
  preloaderdefaultSettings,
  ratesScale,
  dateOptions,
};
