const BASICS: {[index: string]: string} = {
  hello: 'مرحباً',
  please: 'من فضلك',
  thanks: 'شكرا',
  no: 'لا',
  yes: 'نعم',
}

const TIME: {[index: string]: string} = {
  today: 'اليوم',
  hour: 'ساعة',
  minute: 'دقيقة',
  second: 'ثانية',
  tomorrow: 'غداً',
  yesterday: 'أمس',
  week: 'أسبوع',
  year: 'سنة',
  calendar: 'تقويم',
  clock: 'ساعة',
  "o'clock": 'الساعة',
  Monday: 'الإثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس',
  Friday: 'الجمعة',
  Saturday: 'السبت',
  Sunday: 'الأحد',
}

const DESCRIBE: {[index: string]: string} = {
  near: 'بجوار',
  far: 'بعيد',
  small: 'صغير',
  good: 'جيد',
  bad: 'سييء',
  beautiful: 'جميل',
  ugly: 'قبيح',
  easy: 'سهل',
  delicious: 'لذيذة',
  difficult: 'صعب'
}

const GREET: {[index: string]: string} = {
  "nice to meet you": 'تشرفنا',
  'good morning': 'صباح الخير',
  'good afternoon': 'مساء الخير',
  'good evening': 'مساء الخير',
  'good night': 'تصبح على خير',
  'how are you': 'كيف حالك',
  goodbye: 'مع السلامة'
}

const NUMBERS: {[index: string]: string} = {
  zero: 'صفر',
  one: 'واحد',
  two: 'إتنين',
  three: 'ثلاثة',
  four: 'أربعة',
  five: 'خمسة',
  six: 'ستة',
  seven: 'سبعة',
  eight: 'ثمانية',
  nine: 'تسعة',
  ten: 'عشرة',
}

const FOOD: {[index: string]: string} = {
  coffee: 'قهوة',
  beer: 'بيرة',
  tea: 'شايْ',
  wine: 'نبيذ',
  water: 'ماء',
}

const HOLIDAYS: {[index: string]: string} = {
  "happy ramadan": "رمضان كَريم"
}

const dictionary: {[index: string]: string} = {
  ...BASICS,
  ...TIME,
  ...DESCRIBE,
  ...GREET,
  ...NUMBERS,
  ...FOOD,
  ...HOLIDAYS,
  love: 'حب',
  work: 'عمل'
};

// https://www.arabicpod101.com/arabic-word-lists/?page=4

export default dictionary
